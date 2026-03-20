/**
 * Runtime beta warning utility.
 *
 * Emits a one-time console.warn per method name when a beta endpoint is called,
 * so SDK consumers know the method is not yet GA.
 */

const warned = new Set<string>();

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
