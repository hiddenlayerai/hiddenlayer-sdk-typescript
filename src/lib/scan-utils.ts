/**
 * Shared utilities for scan functionality across different scanner types.
 *
 * This module provides common retry logic for handling scan retrieval operations
 * that may initially return 404 errors due to timing issues.
 */

import type { HiddenLayer } from '../client';
import type { ScanReport } from '../resources/scans/results';
import { APIError } from '../core/error';
import { sleep } from '../internal/utils/sleep';

/**
 * Scan status constants
 */
export const ScanStatus = {
  DONE: 'done',
  FAILED: 'failed',
  PENDING: 'pending',
  RUNNING: 'running',
  CANCELED: 'canceled',
} as const;

export type ScanStatusType = (typeof ScanStatus)[keyof typeof ScanStatus];

/**
 * Get scan results with retry logic for 404 errors.
 *
 * Used when waitForResults=false to handle initial scan availability.
 */
export async function getScanResults(client: HiddenLayer, scanId: string): Promise<ScanReport> {
  let retries = 0;
  const maxRetries = 5; // Fewer retries since we're not waiting for completion
  const baseDelay = 500; // milliseconds

  while (retries < maxRetries) {
    try {
      return await client.scans.jobs.retrieve(scanId);
    } catch (error) {
      if (error instanceof APIError && error.status === 404) {
        retries++;
        if (retries >= maxRetries) {
          console.error(`Scan ${scanId} not found after ${maxRetries} attempts`);
          throw error;
        }

        const delay = baseDelay * retries + Math.random() * 500;
        console.info(
          `Scan not yet available, retrying in ${(delay / 1000).toFixed(1)}s (attempt ${
            retries + 1
          }/${maxRetries})`,
        );
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }

  // Should never reach here due to throw above, but satisfy TypeScript
  throw new Error(`Scan ${scanId} not found after ${maxRetries} attempts`);
}

/**
 * Wait for scan results using exponential backoff polling.
 *
 * Handles initial 404 errors when scan is not immediately available.
 */
export async function waitForScanResults(client: HiddenLayer, scanId: string): Promise<ScanReport> {
  const baseDelay = 100; // milliseconds
  let retries = 0;
  let scanResults: ScanReport | null = null;

  while (true) {
    try {
      scanResults = await client.scans.jobs.retrieve(scanId);
      // If we got here, scan exists - check if it's done
      if (
        scanResults.status === ScanStatus.DONE ||
        scanResults.status === ScanStatus.FAILED ||
        scanResults.status === ScanStatus.CANCELED
      ) {
        break;
      }
      console.info(`scan status: ${scanResults.status}`);
    } catch (error) {
      if (error instanceof APIError && error.status === 404) {
        // Scan not found yet, treat it like any other retry condition
        console.info('scan not found yet, retrying...');
      } else {
        throw error;
      }
    }

    retries++;
    let delay = baseDelay * Math.pow(2, retries) + Math.random() * 1000; // exponential back off retry
    delay = Math.min(delay, 30000); // cap at 30 seconds
    await sleep(delay);
  }

  return scanResults!;
}
