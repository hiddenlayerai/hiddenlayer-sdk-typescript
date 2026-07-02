/**
 * Runtime beta warning utility.
 *
 * Emits a one-time console.warn per method name when a beta endpoint is called,
 * so SDK consumers know the method is not yet GA.
 */

import { BETA_ENDPOINTS } from './beta-endpoints';

const warned = new Set<string>();

/** @internal Reset warned state between tests. Not for production use. */
export function _resetWarnedForTesting(): void {
  warned.clear();
}

/**
 * Emit a one-time warning that a beta endpoint was called.
 *
 * @param qualifiedName - Fully qualified method name, e.g. "Jobs.request"
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

/**
 * Look up a request path in the beta endpoint registry and emit a warning if found.
 *
 * Matching is segment-based so that endpoints with path parameters (e.g.
 * `/evaluations/v1/red-team/{workflowID}/status`) are recognized even though the
 * runtime path has the parameter value substituted in. A registry segment of
 * `null` is a wildcard that matches any single path segment.
 *
 * @param path - The URL path from FinalRequestOptions, e.g. "/detection/v2/request-evaluations"
 */
export function checkBetaEndpoint(path: string | undefined): void {
  if (!path) {
    return;
  }
  const segments = path
    .split('?')[0]!
    .replace(/^\/+/, '')
    .split('/')
    .filter((s) => s.length > 0);

  for (const entry of BETA_ENDPOINTS) {
    if (entry.segments.length !== segments.length) {
      continue;
    }
    const matches = entry.segments.every((pattern, i) => pattern === null || pattern === segments[i]);
    if (matches) {
      warnBeta(entry.method);
      return;
    }
  }
}
