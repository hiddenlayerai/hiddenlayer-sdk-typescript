import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from "vitest";
import { HiddenLayerError } from "../../src/errors/index.js";
import { _resetWarnedForTesting } from "../../src/lib/beta.js";
import { CommunityScanner } from "../../src/lib/community-scan.js";
import { ModelScanner } from "../../src/lib/model-scan.js";
import { SDK_VERSION } from "../../src/version.js";
import { HiddenLayer } from "../../src/wrapper/HiddenLayer.js";

vi.mock("@aws-sdk/client-s3");
vi.mock("@azure/storage-blob");
vi.mock("@huggingface/hub");
// A fixed registry naming a method the 3.x surface pins, so neither the beta list nor a beta method
// changing with the API can fail a Fern PR.
vi.mock("../../src/beta-endpoints.js", () => ({
    BETA_ENDPOINTS: [{ method: "GET", path_pattern: "/scan/v3/results/{scan_id}/sarif" }],
}));

const HIDDENLAYER_ENV = [
    "HIDDENLAYER_TOKEN",
    "HIDDENLAYER_CLIENT_ID",
    "HIDDENLAYER_CLIENT_SECRET",
    "HIDDENLAYER_BASE_URL",
] as const;

interface RecordedRequest {
    url: URL;
    method: string;
    headers: Headers;
    body: string | undefined;
}

/**
 * A fetch that records every request and answers 200 with JSON: an access token for `/oauth2/token`
 * (`access-token-1`, `access-token-2`, ...) and `{}` for anything else.
 */
function recordingFetch(tokenExpiresIn = 3600): { fetch: typeof fetch; requests: RecordedRequest[] } {
    const requests: RecordedRequest[] = [];
    let tokensIssued = 0;
    const fetchFn = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
        const url = new URL(input instanceof Request ? input.url : input.toString());
        requests.push({
            url,
            method: init?.method ?? "GET",
            headers: new Headers(init?.headers),
            body: init?.body == null ? undefined : String(init.body),
        });
        if (url.pathname.endsWith("/oauth2/token")) {
            tokensIssued++;
            return Response.json({
                access_token: `access-token-${tokensIssued}`,
                token_type: "Bearer",
                expires_in: tokenExpiresIn,
            });
        }
        return Response.json({});
    });
    return { fetch: fetchFn, requests };
}

function retrieveSummary(client: HiddenLayer): Promise<unknown> {
    return client.scans.results.retrieveSummary({ scan_id: "s" });
}

function basic(id: string, secret: string): string {
    return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}

beforeEach(() => {
    for (const name of HIDDENLAYER_ENV) {
        vi.stubEnv(name, undefined);
    }
});

afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    vi.useRealTimers();
});

describe("HiddenLayer", () => {
    describe("scanners", () => {
        it("exposes a cached ModelScanner", () => {
            const client = new HiddenLayer({ token: "test-token" });
            expect(client.modelScanner).toBeInstanceOf(ModelScanner);
            expect(client.modelScanner).toBe(client.modelScanner);
        });

        it("exposes a cached CommunityScanner", () => {
            const client = new HiddenLayer({ token: "test-token" });
            expect(client.communityScanner).toBeInstanceOf(CommunityScanner);
            expect(client.communityScanner).toBe(client.communityScanner);
        });
    });

    describe("bearer token", () => {
        it("sends the token option as a bearer token", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ token: "test-token", fetch });

            await retrieveSummary(client);

            expect(requests).toHaveLength(1);
            expect(requests[0].headers.get("Authorization")).toBe("Bearer test-token");
        });

        it("falls back to HIDDENLAYER_TOKEN", async () => {
            vi.stubEnv("HIDDENLAYER_TOKEN", "env-token");
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ fetch });

            await retrieveSummary(client);

            expect(requests[0].headers.get("Authorization")).toBe("Bearer env-token");
        });

        it("prefers the token option over HIDDENLAYER_TOKEN", async () => {
            vi.stubEnv("HIDDENLAYER_TOKEN", "env-token");
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ token: "option-token", fetch });

            await retrieveSummary(client);

            expect(requests[0].headers.get("Authorization")).toBe("Bearer option-token");
        });
    });

    describe("client credentials", () => {
        it("exchanges the clientId and clientSecret options for an access token", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ clientId: "id", clientSecret: "secret", fetch });

            await retrieveSummary(client);

            expect(requests).toHaveLength(2);
            const [tokenRequest, apiRequest] = requests;
            expect(tokenRequest.method).toBe("POST");
            expect(tokenRequest.url.href).toBe("https://api.us.hiddenlayer.ai/oauth2/token");
            expect(tokenRequest.headers.get("Authorization")).toBe(basic("id", "secret"));
            expect(tokenRequest.headers.get("Content-Type")).toContain("application/x-www-form-urlencoded");
            expect(Object.fromEntries(new URLSearchParams(tokenRequest.body))).toEqual({
                grant_type: "client_credentials",
            });
            expect(apiRequest.url.pathname).toBe("/scan/v3/results/s/summary");
            expect(apiRequest.headers.get("Authorization")).toBe("Bearer access-token-1");
        });

        it("reads HIDDENLAYER_CLIENT_ID and HIDDENLAYER_CLIENT_SECRET", async () => {
            vi.stubEnv("HIDDENLAYER_CLIENT_ID", "env-id");
            vi.stubEnv("HIDDENLAYER_CLIENT_SECRET", "env-secret");
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ fetch });

            await retrieveSummary(client);

            expect(requests[0].url.pathname).toBe("/oauth2/token");
            expect(requests[0].headers.get("Authorization")).toBe(basic("env-id", "env-secret"));
            expect(requests[1].headers.get("Authorization")).toBe("Bearer access-token-1");
        });

        it("reuses the access token until it nears expiry", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ clientId: "id", clientSecret: "secret", fetch });

            await retrieveSummary(client);
            await retrieveSummary(client);

            expect(requests.map((r) => r.url.pathname)).toEqual([
                "/oauth2/token",
                "/scan/v3/results/s/summary",
                "/scan/v3/results/s/summary",
            ]);
            expect(requests[2].headers.get("Authorization")).toBe("Bearer access-token-1");
        });

        it("shares one token exchange between concurrent first requests", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ clientId: "id", clientSecret: "secret", fetch });

            await Promise.all([retrieveSummary(client), retrieveSummary(client), retrieveSummary(client)]);

            expect(requests.filter((r) => r.url.pathname === "/oauth2/token")).toHaveLength(1);
            expect(new Set(requests.slice(1).map((r) => r.headers.get("Authorization")))).toEqual(
                new Set(["Bearer access-token-1"]),
            );
        });

        it("fetches a new access token 30 seconds before the current one expires", async () => {
            vi.useFakeTimers({ toFake: ["Date"] });
            const start = new Date("2026-01-01T00:00:00Z").getTime();
            vi.setSystemTime(start);
            const { fetch, requests } = recordingFetch(60);
            const client = new HiddenLayer({ clientId: "id", clientSecret: "secret", fetch });
            const tokenRequests = () => requests.filter((r) => r.url.pathname === "/oauth2/token").length;

            await retrieveSummary(client);
            vi.setSystemTime(start + 29_000);
            await retrieveSummary(client);
            expect(tokenRequests()).toBe(1);

            vi.setSystemTime(start + 31_000);
            await retrieveSummary(client);

            expect(tokenRequests()).toBe(2);
            expect(requests[requests.length - 1].headers.get("Authorization")).toBe("Bearer access-token-2");
        });

        it("prefers a token over client credentials", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ token: "test-token", clientId: "id", clientSecret: "secret", fetch });

            await retrieveSummary(client);

            expect(requests).toHaveLength(1);
            expect(requests[0].headers.get("Authorization")).toBe("Bearer test-token");
        });

        it("prefers client credentials passed as options over HIDDENLAYER_TOKEN", async () => {
            vi.stubEnv("HIDDENLAYER_TOKEN", "env-token");
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ clientId: "id", clientSecret: "secret", fetch });

            await retrieveSummary(client);

            expect(requests.map((r) => r.url.pathname)).toEqual(["/oauth2/token", "/scan/v3/results/s/summary"]);
            expect(requests[1].headers.get("Authorization")).toBe("Bearer access-token-1");
        });

        it("prefers HIDDENLAYER_TOKEN over client credentials from the environment", async () => {
            vi.stubEnv("HIDDENLAYER_TOKEN", "env-token");
            vi.stubEnv("HIDDENLAYER_CLIENT_ID", "env-id");
            vi.stubEnv("HIDDENLAYER_CLIENT_SECRET", "env-secret");
            const { fetch, requests } = recordingFetch();

            await retrieveSummary(new HiddenLayer({ fetch }));

            expect(requests).toHaveLength(1);
            expect(requests[0].headers.get("Authorization")).toBe("Bearer env-token");
        });

        it("refreshes a token whose lifetime is under a minute halfway through it", async () => {
            vi.useFakeTimers({ toFake: ["Date"] });
            const start = new Date("2026-01-01T00:00:00Z").getTime();
            vi.setSystemTime(start);
            const { fetch, requests } = recordingFetch(20);
            const client = new HiddenLayer({ clientId: "id", clientSecret: "secret", fetch });
            const tokenRequests = () => requests.filter((r) => r.url.pathname === "/oauth2/token").length;

            await retrieveSummary(client);
            vi.setSystemTime(start + 9_000);
            await retrieveSummary(client);
            expect(tokenRequests()).toBe(1);

            vi.setSystemTime(start + 11_000);
            await retrieveSummary(client);
            expect(tokenRequests()).toBe(2);
        });
    });

    describe("headers", () => {
        it("names the package and its version", async () => {
            const { fetch, requests } = recordingFetch();

            await retrieveSummary(new HiddenLayer({ token: "test-token", fetch }));

            expect(requests[0].headers.get("X-Fern-SDK-Name")).toBe("@hiddenlayerai/hiddenlayer-sdk");
            expect(requests[0].headers.get("User-Agent")).toBe(`@hiddenlayerai/hiddenlayer-sdk/${SDK_VERSION}`);
        });

        it("lets the headers option replace the user agent", async () => {
            const { fetch, requests } = recordingFetch();

            await retrieveSummary(
                new HiddenLayer({ token: "test-token", fetch, headers: { "user-agent": "my-app/1.0" } }),
            );

            expect(requests[0].headers.get("User-Agent")).toBe("my-app/1.0");
        });
    });

    describe("without credentials", () => {
        it("constructs, then rejects requests with an error naming HIDDENLAYER_TOKEN", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ fetch });

            const result = retrieveSummary(client);

            await expect(result).rejects.toBeInstanceOf(HiddenLayerError);
            await expect(result).rejects.toThrow(/HIDDENLAYER_TOKEN/);
            expect(requests).toHaveLength(0);
        });

        it("sends no Authorization header with auth: false", async () => {
            const { fetch, requests } = recordingFetch();

            await retrieveSummary(new HiddenLayer({ auth: false, fetch }));

            expect(requests[0].headers.get("Authorization")).toBeNull();
        });

        it("treats a client ID without a secret as no credentials", async () => {
            vi.stubEnv("HIDDENLAYER_CLIENT_ID", "env-id");
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ fetch });

            await expect(retrieveSummary(client)).rejects.toThrow(/HIDDENLAYER_TOKEN/);
            expect(requests).toHaveLength(0);
        });
    });

    describe("environment", () => {
        async function originOf(options: HiddenLayer.Options): Promise<string> {
            const { fetch, requests } = recordingFetch();
            await retrieveSummary(new HiddenLayer({ token: "test-token", fetch, ...options }));
            return requests[0].url.origin;
        }

        it("defaults to prod-us", async () => {
            expect(await originOf({})).toBe("https://api.us.hiddenlayer.ai");
        });

        it("selects a region by name", async () => {
            expect(await originOf({ environment: "prod-eu" })).toBe("https://api.eu.hiddenlayer.ai");
            expect(await originOf({ environment: "prod-us" })).toBe("https://api.us.hiddenlayer.ai");
        });

        it("uses HIDDENLAYER_BASE_URL when no environment is given", async () => {
            vi.stubEnv("HIDDENLAYER_BASE_URL", "https://env.example");
            expect(await originOf({})).toBe("https://env.example");
        });

        it("prefers an explicit environment over HIDDENLAYER_BASE_URL", async () => {
            vi.stubEnv("HIDDENLAYER_BASE_URL", "https://env.example");
            expect(await originOf({ environment: "prod-eu" })).toBe("https://api.eu.hiddenlayer.ai");
        });

        it("prefers an explicit baseUrl over the environment and HIDDENLAYER_BASE_URL", async () => {
            vi.stubEnv("HIDDENLAYER_BASE_URL", "https://env.example");
            expect(await originOf({ baseUrl: "https://option.example", environment: "prod-eu" })).toBe(
                "https://option.example",
            );
        });

        it("sends client.fetch requests to the default environment with credentials", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ token: "test-token", fetch });

            await client.fetch("/scan/v3/results/s/summary");

            expect(requests[0].url.href).toBe("https://api.us.hiddenlayer.ai/scan/v3/results/s/summary");
            expect(requests[0].headers.get("Authorization")).toBe("Bearer test-token");
        });

        it("treats an inherited property name as a URL, not a region", async () => {
            const urls: string[] = [];
            const fetch = vi.fn(async (input: string | URL | Request) => {
                urls.push(input instanceof Request ? input.url : input.toString());
                return Response.json({});
            });

            await retrieveSummary(new HiddenLayer({ token: "test-token", environment: "constructor", fetch }));

            expect(urls).toEqual(["constructor/scan/v3/results/s/summary"]);
        });

        it("sends the client-credentials token request to the same base URL", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ clientId: "id", clientSecret: "secret", environment: "prod-eu", fetch });

            await retrieveSummary(client);

            expect(requests.map((r) => r.url.href)).toEqual([
                "https://api.eu.hiddenlayer.ai/oauth2/token",
                "https://api.eu.hiddenlayer.ai/scan/v3/results/s/summary",
            ]);
        });
    });

    describe("beta warnings", () => {
        let warnSpy: MockInstance<typeof console.warn>;

        beforeEach(() => {
            warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            _resetWarnedForTesting();
        });

        it("warns once when a beta endpoint is called", async () => {
            const { fetch } = recordingFetch();
            const client = new HiddenLayer({ token: "test-token", fetch });

            await client.scans.results.sarif({ scan_id: "s1" });
            await client.scans.results.sarif({ scan_id: "s2" });

            expect(warnSpy).toHaveBeenCalledTimes(1);
            expect(warnSpy.mock.calls[0][0]).toMatch(/^\[BETA\] GET \/scan\/v3\/results\/\{scan_id\}\/sarif: /);
        });

        it("does not warn for a GA endpoint", async () => {
            const { fetch } = recordingFetch();
            const client = new HiddenLayer({ token: "test-token", fetch });

            await retrieveSummary(client);

            expect(warnSpy).not.toHaveBeenCalled();
        });

        it("recognises a beta endpoint behind a base URL with a path prefix", async () => {
            const { fetch, requests } = recordingFetch();
            const client = new HiddenLayer({ token: "test-token", baseUrl: "https://proxy.example/hl", fetch });

            await client.scans.results.sarif({ scan_id: "s1" });

            expect(requests[0].url.href).toBe("https://proxy.example/hl/scan/v3/results/s1/sarif");
            expect(warnSpy).toHaveBeenCalledTimes(1);
            expect(warnSpy.mock.calls[0][0]).toMatch(/^\[BETA\] GET \/scan\/v3\/results\/\{scan_id\}\/sarif: /);
        });
    });
});
