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
 * @param path - The URL path from FinalRequestOptions, e.g. "/detection/v2/request-evaluations"
 */
export function checkBetaEndpoint(path: string | undefined): void {
  if (!path) {
    return;
  }
  const qualifiedName = BETA_ENDPOINTS[path];
  if (qualifiedName) {
    warnBeta(qualifiedName);
  }
}
