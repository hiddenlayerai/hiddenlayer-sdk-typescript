// @ts-check
const fs = require('fs');
const path = require('path');

const resourcesDir = path.resolve(__dirname, '..', '..', 'src', 'resources');

/**
 * Recursively walk a directory yielding file paths.
 * Matches the pattern from postprocess-files.cjs.
 */
async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

/**
 * Compute the relative import path from a resource file to src/lib/beta.
 * e.g. src/resources/scans/jobs.ts → '../../lib/beta'
 */
function computeImportPath(filePath) {
  const rel = path.relative(path.dirname(filePath), path.resolve(resourcesDir, '..', 'lib', 'beta'));
  const normalized = rel.split(path.sep).join('/');
  return normalized.startsWith('.') ? normalized : './' + normalized;
}

/**
 * Extract the class name from a resource file.
 * Looks for: export class Foo extends APIResource
 */
function extractClassName(content) {
  const match = content.match(/export class (\w+) extends APIResource/);
  return match ? match[1] : null;
}

/**
 * Find the opening brace of a method body, starting search from the given index.
 * Handles multi-line signatures like:
 *   methodName(
 *     param: Type,
 *   ): ReturnType {
 */
function findMethodBodyOpen(content, startIndex) {
  let depth = 1; // We've already matched the opening paren
  let i = startIndex;
  while (i < content.length && depth > 0) {
    if (content[i] === '(') depth++;
    else if (content[i] === ')') depth--;
    i++;
  }
  while (i < content.length) {
    if (content[i] === '{') return i;
    i++;
  }
  return -1;
}

/**
 * Find the end position (character index) of the last import statement.
 */
function findLastImportEnd(content) {
  let lastIndex = -1;
  const importPattern = /^import\s.+;$/gm;
  let m;
  while ((m = importPattern.exec(content)) !== null) {
    lastIndex = m.index + m[0].length;
  }
  return lastIndex;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Collect all JSDoc+method pairs from the content, along with their
 * beta status and the character index where a warnBeta call should be inserted.
 */
function collectMethods(content, className) {
  const methodPattern = /(\/\*\*[\s\S]*?\*\/)\s+(\w+)\s*\(/g;
  const methods = [];
  let match;

  while ((match = methodPattern.exec(content)) !== null) {
    const jsdoc = match[1];
    const methodName = match[2];
    const qualifiedName = `${className}.${methodName}`;
    const isBeta = jsdoc.includes('[BETA]');
    const warnCall = `warnBeta('${qualifiedName}');`;

    // Find where the method body opens
    const searchStart = match.index + match[0].length;
    const bodyOpenIndex = findMethodBodyOpen(content, searchStart);

    methods.push({ methodName, qualifiedName, isBeta, warnCall, bodyOpenIndex });
  }

  return methods;
}

/**
 * Patch a single resource file: insert or remove warnBeta calls
 * based on whether methods have [BETA] in their JSDoc.
 *
 * Returns the (possibly modified) content, or null if no changes needed.
 */
function patchFile(content, className, filePath) {
  const methods = collectMethods(content, className);
  if (methods.length === 0) return null;

  // Collect edits as {index, insert, remove} and apply bottom-up so indices stay valid.
  // Each edit is either an insertion or a removal of a warnBeta line.
  const edits = []; // { type: 'insert'|'remove', index, text }

  for (const method of methods) {
    const { qualifiedName, isBeta, warnCall, bodyOpenIndex } = method;
    const existingCallPattern = new RegExp(`\\n(\\s*)${escapeRegExp(warnCall)}`);
    const existingMatch = content.match(existingCallPattern);

    if (isBeta && !existingMatch && bodyOpenIndex !== -1) {
      // Need to insert warnBeta call after the opening brace
      const lineStart = content.lastIndexOf('\n', bodyOpenIndex) + 1;
      const lineContent = content.slice(lineStart, bodyOpenIndex + 1);
      const baseIndent = lineContent.match(/^(\s*)/)[1];
      const bodyIndent = baseIndent + '  ';
      edits.push({
        type: 'insert',
        index: bodyOpenIndex + 1,
        text: '\n' + bodyIndent + warnCall,
      });
    } else if (!isBeta && existingMatch) {
      // Need to remove the existing warnBeta call
      const callStart = content.indexOf(existingMatch[0]);
      edits.push({
        type: 'remove',
        index: callStart,
        length: existingMatch[0].length,
      });
    }
  }

  if (edits.length === 0) {
    // Check if import needs to be added/removed even without method edits
    return manageImport(content, filePath);
  }

  // Sort edits by index descending so we can apply them without shifting earlier indices
  edits.sort((a, b) => b.index - a.index);

  let modified = content;
  for (const edit of edits) {
    if (edit.type === 'insert') {
      modified = modified.slice(0, edit.index) + edit.text + modified.slice(edit.index);
    } else if (edit.type === 'remove') {
      modified = modified.slice(0, edit.index) + modified.slice(edit.index + edit.length);
    }
  }

  // Manage import
  const result = manageImport(modified, filePath);
  return result !== null ? result : (modified !== content ? modified : null);
}

/**
 * Add or remove the warnBeta import as needed.
 * Returns modified content if changed, null if unchanged.
 */
function manageImport(content, filePath) {
  const hasAnyCalls = /warnBeta\('/.test(content);
  const hasImport = /import\s*\{[^}]*warnBeta[^}]*\}/.test(content);
  const importPath = computeImportPath(filePath);
  const importStatement = `import { warnBeta } from '${importPath}';`;

  let modified = content;

  if (hasAnyCalls && !hasImport) {
    const lastImportIndex = findLastImportEnd(modified);
    if (lastImportIndex !== -1) {
      modified = modified.slice(0, lastImportIndex) + '\n' + importStatement + modified.slice(lastImportIndex);
    }
  } else if (!hasAnyCalls && hasImport) {
    modified = modified.replace(new RegExp(`\\nimport\\s*\\{[^}]*warnBeta[^}]*\\}[^;]*;`), '');
  }

  return modified !== content ? modified : null;
}

async function main() {
  let patchedCount = 0;

  for await (const filePath of walk(resourcesDir)) {
    if (!filePath.endsWith('.ts')) continue;
    if (path.basename(filePath) === 'index.ts') continue;

    const content = await fs.promises.readFile(filePath, 'utf8');

    const className = extractClassName(content);
    if (!className) continue;

    const patched = patchFile(content, className, filePath);
    if (patched !== null) {
      await fs.promises.writeFile(filePath, patched, 'utf8');
      const rel = path.relative(process.cwd(), filePath);
      console.log(`patched ${rel}`);
      patchedCount++;
    }
  }

  console.log(`\n${patchedCount} file(s) patched.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
