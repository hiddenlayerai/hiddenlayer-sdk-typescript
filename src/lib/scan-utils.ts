/**
 * Shared utilities for scan functionality across different scanner types.
 *
 * This module provides common retry logic for handling scan retrieval operations
 * that may initially return 404 errors due to timing issues.
 *
 * Scan reports are assembled from the summary endpoint plus the cursor-paginated
 * file-results endpoint; the unpaginated results endpoint is not used.
 */

import type { HiddenLayer } from '../client';
import type { ScanFileResult, ScanReport, ScanReportSummary } from '../resources/scans/results';
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

// Page size and inter-page delay for collecting file results. The delay
// throttles reconstruction of massive scans (10k+ files) so the SDK never
// hammers the API with back-to-back page reads.
export const FILE_RESULTS_PAGE_SIZE = 100;
export const FILE_RESULTS_PAGE_DELAY_MS = 250;

// Deprecated top-level report fields that mirror `.summary.*` per the API contract.
const DEPRECATED_SUMMARY_MIRROR_FIELDS = [
  'detection_count',
  'file_count',
  'files_with_detections_count',
  'detection_categories',
  'severity',
] as const;

/**
 * Assemble a full ScanReport from a scan summary plus its paginated file results.
 */
export function buildScanReport(summary: ScanReportSummary, fileResults: ScanFileResult[]): ScanReport {
  const report: Record<string, unknown> = { ...summary, file_results: fileResults };
  const nestedSummary = (summary as unknown as { summary?: Record<string, unknown> }).summary ?? {};
  for (const field of DEPRECATED_SUMMARY_MIRROR_FIELDS) {
    if (report[field] === undefined && nestedSummary[field] !== undefined) {
      report[field] = nestedSummary[field];
    }
  }
  return report as unknown as ScanReport;
}

/**
 * Fetch every file result for a scan, throttling between page reads.
 */
export async function collectFileResults(client: HiddenLayer, scanId: string): Promise<ScanFileResult[]> {
  let page = await client.scans.results.listFiles(scanId, { page_size: FILE_RESULTS_PAGE_SIZE });
  const fileResults: ScanFileResult[] = [...(page.items ?? [])];
  while (page.hasNextPage()) {
    await sleep(FILE_RESULTS_PAGE_DELAY_MS);
    page = await page.getNextPage();
    fileResults.push(...(page.items ?? []));
  }
  return fileResults;
}

/**
 * Get the scan report with retry logic for 404 errors.
 *
 * Used when waitForResults=false to handle initial scan availability.
 *
 * The report is assembled from the summary endpoint plus the paginated
 * file-results endpoint. If the scan is still running, the assembled report is
 * a point-in-time snapshot: paginating over an active scan may miss or
 * duplicate file entries.
 */
export async function getScanResults(client: HiddenLayer, scanId: string): Promise<ScanReport> {
  let retries = 0;
  const maxRetries = 5; // Fewer retries since we're not waiting for completion
  const baseDelay = 500; // milliseconds

  while (retries < maxRetries) {
    try {
      const summary = await client.scans.results.retrieveSummary(scanId);
      const fileResults = await collectFileResults(client, scanId);
      return buildScanReport(summary, fileResults);
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
 * Wait for the scan to finish, then assemble the full report.
 *
 * Polls the lightweight summary endpoint for status; once the scan reaches a
 * terminal state, the report is assembled from that summary plus the paginated
 * file-results endpoint (throttled between pages).
 *
 * Handles initial 404 errors when scan is not immediately available.
 */
export async function waitForScanResults(client: HiddenLayer, scanId: string): Promise<ScanReport> {
  const baseDelay = 100; // milliseconds
  let retries = 0;
  let summary: ScanReportSummary | null = null;

  while (true) {
    try {
      summary = await client.scans.results.retrieveSummary(scanId);
      // If we got here, scan exists - check if it's done
      if (
        summary.status === ScanStatus.DONE ||
        summary.status === ScanStatus.FAILED ||
        summary.status === ScanStatus.CANCELED
      ) {
        break;
      }
      console.info(`scan status: ${summary.status}`);
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

  const fileResults = await collectFileResults(client, scanId);
  return buildScanReport(summary!, fileResults);
}
