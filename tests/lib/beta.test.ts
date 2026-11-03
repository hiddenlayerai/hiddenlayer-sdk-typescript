import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from "vitest";
import { _resetWarnedForTesting, checkBetaEndpoint, warnBeta, withBetaWarnings } from "../../src/lib/beta.js";

// A fixed registry: the real one is regenerated with the API, and an endpoint going GA mustn't fail a Fern PR.
vi.mock("../../src/beta-endpoints.js", () => ({
    BETA_ENDPOINTS: [
        { method: "POST", path_pattern: "/evaluations/v1/red-team" },
        { method: "GET", path_pattern: "/evaluations/v1/red-team" },
        { method: "GET", path_pattern: "/evaluations/v1/red-team/{workflow_id}" },
        { method: "GET", path_pattern: "/evaluations/v1/red-team/{workflow_id}/status" },
        { method: "GET", path_pattern: "/supply-chain/v3/scans/{scan_id}/guidance" },
    ],
}));

const betaMessage = (name: string) =>
    `[BETA] ${name}: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.`;

let warnSpy: MockInstance<typeof console.warn>;

beforeEach(() => {
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    _resetWarnedForTesting();
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe("warnBeta", () => {
    it("emits a warning on first call", () => {
        warnBeta("POST /foo/first-call");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(
            "[BETA] POST /foo/first-call: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.",
        );
    });

    it("does not emit duplicate warnings for the same endpoint", () => {
        warnBeta("GET /bar/dedup");
        warnBeta("GET /bar/dedup");
        warnBeta("GET /bar/dedup");
        expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it("emits separate warnings for different endpoints", () => {
        warnBeta("GET /baz/alpha");
        warnBeta("GET /baz/bravo");
        expect(warnSpy).toHaveBeenCalledTimes(2);
        expect(warnSpy).toHaveBeenNthCalledWith(1, betaMessage("GET /baz/alpha"));
        expect(warnSpy).toHaveBeenNthCalledWith(2, betaMessage("GET /baz/bravo"));
    });
});

describe("checkBetaEndpoint", () => {
    it("emits a warning for a static beta path", () => {
        checkBetaEndpoint("/evaluations/v1/red-team", "POST");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(betaMessage("POST /evaluations/v1/red-team"));
    });

    it("emits a warning for a dynamic beta path with a substituted parameter", () => {
        checkBetaEndpoint("/evaluations/v1/red-team/abc123/status", "GET");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(betaMessage("GET /evaluations/v1/red-team/{workflow_id}/status"));
    });

    it("emits a warning for a dynamic beta path on a single-parameter endpoint", () => {
        checkBetaEndpoint("/evaluations/v1/red-team/abc123", "GET");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(betaMessage("GET /evaluations/v1/red-team/{workflow_id}"));
    });

    it("ignores a trailing query string when matching", () => {
        checkBetaEndpoint("/evaluations/v1/red-team?foo=bar", "POST");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(betaMessage("POST /evaluations/v1/red-team"));
    });

    it("matches the method case-insensitively", () => {
        checkBetaEndpoint("/supply-chain/v3/scans/abc123/guidance", "get");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(betaMessage("GET /supply-chain/v3/scans/{scan_id}/guidance"));
    });

    it("matches any method when none is given", () => {
        checkBetaEndpoint("/supply-chain/v3/scans/abc123/guidance");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(betaMessage("GET /supply-chain/v3/scans/{scan_id}/guidance"));
    });

    it("does not emit a warning when only another method on the path is beta", () => {
        checkBetaEndpoint("/supply-chain/v3/scans/abc123/guidance", "POST");
        expect(warnSpy).toHaveBeenCalledTimes(0);
    });

    it("does not emit a warning for a non-beta path", () => {
        checkBetaEndpoint("/scan/v3/results/abc123/summary", "GET");
        expect(warnSpy).toHaveBeenCalledTimes(0);
    });

    it("does not emit a warning when a literal segment differs", () => {
        checkBetaEndpoint("/evaluations/v1/red-team/abc123/not-a-real-action", "GET");
        expect(warnSpy).toHaveBeenCalledTimes(0);
    });

    it("does not emit a warning when segment counts differ", () => {
        checkBetaEndpoint("/evaluations/v1/red-team/abc123/status/extra", "GET");
        expect(warnSpy).toHaveBeenCalledTimes(0);
    });

    it("does not emit a warning for undefined path", () => {
        checkBetaEndpoint(undefined);
        expect(warnSpy).toHaveBeenCalledTimes(0);
    });

    it("deduplicates warnings through warnBeta mechanism", () => {
        checkBetaEndpoint("/evaluations/v1/red-team/abc123/status", "GET");
        checkBetaEndpoint("/evaluations/v1/red-team/def456/status", "GET");
        checkBetaEndpoint("/evaluations/v1/red-team/ghi789/status", "GET");
        expect(warnSpy).toHaveBeenCalledTimes(1);
    });
});

describe("withBetaWarnings", () => {
    const ok = () => Promise.resolve(new Response("{}", { status: 200 }));

    it("passes the request through to the wrapped fetch", async () => {
        const fetchFn = vi.fn(ok);
        const response = new Response("{}", { status: 200 });
        fetchFn.mockResolvedValueOnce(response);
        const wrapped = withBetaWarnings(fetchFn, async () => "https://api.example");
        const init = { method: "GET" };

        await expect(wrapped("https://api.example/scan/v3/results/abc/summary", init)).resolves.toBe(response);

        expect(fetchFn).toHaveBeenCalledWith("https://api.example/scan/v3/results/abc/summary", init);
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it("warns for a beta endpoint, taking the method from init", async () => {
        const wrapped = withBetaWarnings(vi.fn(ok), async () => "https://api.example");

        await wrapped("https://api.example/evaluations/v1/red-team", { method: "POST" });

        expect(warnSpy).toHaveBeenCalledWith(betaMessage("POST /evaluations/v1/red-team"));
    });

    it("takes the method from a Request when init has none", async () => {
        const wrapped = withBetaWarnings(vi.fn(ok), async () => "https://api.example");

        await wrapped(new Request("https://api.example/evaluations/v1/red-team", { method: "POST" }));

        expect(warnSpy).toHaveBeenCalledWith(betaMessage("POST /evaluations/v1/red-team"));
    });

    it("defaults the method to GET", async () => {
        const wrapped = withBetaWarnings(vi.fn(ok), async () => "https://api.example");

        await wrapped("https://api.example/evaluations/v1/red-team");

        expect(warnSpy).toHaveBeenCalledWith(betaMessage("GET /evaluations/v1/red-team"));
    });

    it("matches the path below a base URL that has a path prefix", async () => {
        const wrapped = withBetaWarnings(vi.fn(ok), async () => "https://proxy.example/hl/");

        await wrapped("https://proxy.example/hl/evaluations/v1/red-team/wf-1/status", { method: "GET" });

        expect(warnSpy).toHaveBeenCalledWith(betaMessage("GET /evaluations/v1/red-team/{workflow_id}/status"));
    });
});
