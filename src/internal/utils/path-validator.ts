import * as path from 'path';
import * as os from 'os';

/**
 * Utilities for safe path handling to mitigate path traversal and temp file issues.
 */
export class PathValidator {
  /**
   * Validate and resolve a file path to prevent traversal attacks.
   * If baseDir is provided, ensures the resolved path is inside baseDir.
   */
  static validateFilePath(inputPath: string, baseDir?: string): string {
    const normalizedPath = path.normalize(inputPath);

    // Disallow absolute paths to avoid unexpected write locations
    if (path.isAbsolute(normalizedPath)) {
      throw new Error('Invalid file path: absolute paths are not allowed');
    }

    // Basic traversal indicator after normalization
    if (normalizedPath.split(path.sep).includes('..')) {
      throw new Error('Invalid file path: path traversal not allowed');
    }

    if (baseDir) {
      const resolvedBase = path.resolve(baseDir);
      const resolvedPath = path.resolve(resolvedBase, normalizedPath);

      // Ensure resolvedPath is within resolvedBase
      const relative = path.relative(resolvedBase, resolvedPath);
      if (relative.startsWith('..') || path.isAbsolute(relative)) {
        throw new Error(`File path outside allowed directory: ${inputPath}`);
      }
      return resolvedPath;
    }

    return normalizedPath;
  }

  /**
   * Create a safe temporary file path in the OS temp directory.
   * The returned path includes a timestamp and random suffix to avoid collisions.
   */
  static createSafeTempPath(originalFileName: string): string {
    const safeName = path.basename(originalFileName);
    // Replace any disallowed chars and collapse any repeated dots to a single underscore
    const sanitizedName = safeName
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.+/g, '.')
      .replace(/\.\.+/g, '_');
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).slice(2);
    return path.join(os.tmpdir(), `hiddenlayer-${timestamp}-${randomSuffix}-${sanitizedName}`);
  }

  /**
   * Create a safe directory path under OS temp dir derived from a name.
   * Useful for creating per-operation temp directories.
   */
  static createSafeTempDir(baseName: string): string {
    const safeName = path.basename(baseName);
    const sanitizedName = safeName
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.+/g, '.')
      .replace(/\.\.+/g, '_');
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).slice(2);
    return path.join(os.tmpdir(), `hiddenlayer-${timestamp}-${randomSuffix}-${sanitizedName}`);
  }
}
