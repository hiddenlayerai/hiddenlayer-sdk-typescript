/**
 * Runtime beta warning utility.
 *
 * Emits a one-time console.warn per endpoint when a beta endpoint is called,
 * so SDK consumers know the method is not yet GA.
 */

import { BETA_ENDPOINTS, type BetaEndpoint } from "../beta-endpoints.js";

const warned = new Set<string>();

/** @internal Reset warned state between tests. Not for production use. */
export function _resetWarnedForTesting(): void {
    warned.clear();
}

/**
 * Emit a one-time warning that a beta endpoint was called.
 *
 * @param qualifiedName - The endpoint, e.g. "POST /evaluations/v1/red-team"
 */
export function warnBeta(qualifiedName: string): void {
    if (warned.has(qualifiedName)) {
        return;
    }
    warned.add(qualifiedName);
    console.warn(
        `[BETA] ${qualifiedName}: This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.`,
    );
}

function segmentsOf(path: string): string[] {
    return path
        .split("?")[0]!
        .split("/")
        .filter((segment) => segment.length > 0);
}

/** A `{param}` segment of a path pattern matches any single segment. */
function matches(entry: BetaEndpoint, method: string | undefined, segments: string[]): boolean {
    if (method !== undefined && entry.method !== method.toUpperCase()) {
        return false;
    }
    const pattern = segmentsOf(entry.path_pattern);
    return (
        pattern.length === segments.length &&
        pattern.every((part, i) => (part.startsWith("{") && part.endsWith("}")) || part === segments[i])
    );
}

/**
 * Look up a request in the beta endpoint registry and emit a warning if found.
 *
 * @param path - The request path relative to the API's base URL, e.g. "/detection/v2/request-evaluations"
 * @param method - The HTTP method; when omitted, any method matches
 */
export function checkBetaEndpoint(path: string | undefined, method?: string): void {
    if (!path) {
        return;
    }
    const segments = segmentsOf(path);
    const entry = BETA_ENDPOINTS.find((candidate) => matches(candidate, method, segments));
    if (entry) {
        warnBeta(`${entry.method} ${entry.path_pattern}`);
    }
}

// Resolves a relative base URL or request URL, as a browser client may use, without an origin of its own.
const PLACEHOLDER_ORIGIN = "http://localhost";

/** The path of `url` below `baseUrl`, or its whole path when it isn't under it. */
function relativePath(url: string, baseUrl: string | undefined): string {
    const { pathname } = new URL(url, PLACEHOLDER_ORIGIN);
    const basePath = baseUrl === undefined ? "" : new URL(baseUrl, PLACEHOLDER_ORIGIN).pathname.replace(/\/+$/, "");
    return basePath && pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname;
}

/**
 * Wrap a fetch implementation so every request through it is checked against the beta registry first.
 *
 * @internal Used by the HiddenLayer client to give generated endpoints their beta warnings.
 */
export function withBetaWarnings(fetchFn: typeof fetch, baseUrl: () => Promise<string | undefined>): typeof fetch {
    return async (input, init) => {
        try {
            const request = typeof Request !== "undefined" && input instanceof Request ? input : undefined;
            const url = request?.url ?? input.toString();
            checkBetaEndpoint(relativePath(url, await baseUrl()), init?.method ?? request?.method ?? "GET");
        } catch {
            // A warning is advisory: nothing in it may fail the request it describes.
        }
        return fetchFn(input, init);
    };
}
