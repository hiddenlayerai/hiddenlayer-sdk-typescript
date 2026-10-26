#!/usr/bin/env node
/**
 * Pre-publish package verification (Guard 3), copied from visiblelayer
 * (PLT-1360) by hl-sdk-gen's SDK repo template (PLT-1425).
 *
 * Asserts that the tarball `npm publish` would ship from the repo root
 * contains every file referenced by package.json `exports` (all
 * types/import/require condition targets and string-form entries), plus
 * `main`, `module`, and `types`. Expectations are derived from package.json
 * at run time — there is no hand-maintained file list — so an export Fern
 * adds is checked as soon as it is generated. This fails the release
 * workflow before anything is published or committed when a build leaves
 * an exported file out.
 *
 * Wildcard subpaths cannot be enumerated from the map alone, so each distinct
 * wildcard target is instead required to match at least one packed file. That
 * catches a whole family going missing — a broken dts or component build —
 * without asserting on individual components.
 *
 * Usage: node scripts/verify-package.mjs   (from the repo root, after a build)
 * From hl-sdk-gen's template/; edit it there and copy it into every TypeScript SDK repo.
 * Env:   EXPECTED_VERSION — optional; also assert the packed version equals it.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const pkgDir = process.cwd();
const pkg = JSON.parse(readFileSync(path.join(pkgDir, "package.json"), "utf8"));

/** Exact file paths the package promises, relative to the tarball root. */
const expected = new Set();
/** Wildcard target patterns that must match at least one packed file. */
const patterns = new Set();

const addTarget = (target) => {
  if (typeof target === "string") {
    if (!target.startsWith("./")) return;
    const file = target.slice(2);
    if (file.includes("*")) {
      patterns.add(file);
    } else {
      expected.add(file);
    }
  } else if (target && typeof target === "object") {
    for (const value of Object.values(target)) addTarget(value);
  }
};

for (const field of ["main", "module", "types"]) addTarget(pkg[field]);
for (const target of Object.values(pkg.exports ?? {})) addTarget(target);

if (expected.size === 0) {
  console.error(
    "verify-package: derived zero expected files from package.json — refusing to pass vacuously.",
  );
  process.exit(1);
}

// --ignore-scripts matches how the release workflow publishes, so the tarball
// verified here is the tarball that ships. Keep the two in step.
const packOutput = execFileSync(
  "npm",
  ["pack", "--dry-run", "--json", "--ignore-scripts"],
  {
    cwd: pkgDir,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  },
);
const [packed] = JSON.parse(packOutput);
const shipped = new Set(packed.files.map((file) => file.path));

const missing = [...expected].filter((file) => !shipped.has(file)).sort();

// "*" stands in for exactly one path segment, matching npm's subpath patterns.
const unmatchedPatterns = [...patterns]
  .filter((pattern) => {
    const regex = new RegExp(
      `^${pattern
        .split("*")
        .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("[^/]+")}$`,
    );
    return !packed.files.some((file) => regex.test(file.path));
  })
  .sort();

const problems = [];
if (missing.length > 0) {
  problems.push(
    `${missing.length} file(s) referenced by package.json are missing from the tarball:\n  - ${missing.join("\n  - ")}`,
  );
}
if (unmatchedPatterns.length > 0) {
  problems.push(
    `${unmatchedPatterns.length} wildcard export target(s) match no packed file:\n  - ${unmatchedPatterns.join("\n  - ")}`,
  );
}
if (packed.version !== pkg.version) {
  problems.push(
    `packed version ${packed.version} != package.json version ${pkg.version}`,
  );
}
if (
  process.env.EXPECTED_VERSION &&
  packed.version !== process.env.EXPECTED_VERSION
) {
  problems.push(
    `packed version ${packed.version} != expected version ${process.env.EXPECTED_VERSION}`,
  );
}

if (problems.length > 0) {
  console.error(
    `verify-package: FAILED for ${packed.name}@${packed.version}\n`,
  );
  for (const problem of problems) console.error(problem + "\n");
  process.exit(1);
}

console.log(
  `verify-package: OK — ${expected.size} export targets and ${patterns.size} wildcard pattern(s) present in ${packed.filename} (${shipped.size} files total)`,
);
