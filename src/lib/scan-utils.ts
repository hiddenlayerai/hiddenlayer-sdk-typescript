/**
 * Shared utilities for scan functionality across different scanner types.
 *
 * This module provides common retry logic for handling scan retrieval operations
 * that may initially return 404 errors due to timing issues.
 *
 * Scan reports are assembled from the summary endpoint plus the cursor-paginated
 * file-results endpoint; the unpaginated results endpoint is not used.
 */

import type * as HiddenLayerApi from "../api/index.js";
import type { HiddenLayerClient } from "../Client.js";
import { HiddenLayerError } from "../errors/index.js";

/**
 * Scan status constants
 */
export const ScanStatus = {
    DONE: "done",
    FAILED: "failed",
    PENDING: "pending",
    RUNNING: "running",
    CANCELED: "canceled",
} as const;

export type ScanStatusType = (typeof ScanStatus)[keyof typeof ScanStatus];

/** A full scan report: the summary plus every file result. */
export type ScanReport = HiddenLayerApi.ScanReportOfRecordV3;

// Page size and inter-page delay for collecting file results. The delay
// throttles reconstruction of massive scans (10k+ files) so the SDK never
// hammers the API with back-to-back page reads.
/** @internal */
export const FILE_RESULTS_PAGE_SIZE = 100;
/** @internal */
export const FILE_RESULTS_PAGE_DELAY_MS = 250;

// Deprecated top-level report fields that mirror `.summary.*` per the API contract.
const DEPRECATED_SUMMARY_MIRROR_FIELDS = [
    "detection_count",
    "file_count",
    "files_with_detections_count",
    "detection_categories",
    "severity",
] as const;

/** @internal */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNotFound(error: unknown): boolean {
    return error instanceof HiddenLayerError && error.statusCode === 404;
}

/**
 * Assemble a full ScanReport from a scan summary plus its paginated file results.
 *
 * @internal Implementation detail of the scan helpers — not part of the public API.
 */
export function buildScanReport(
    summary: HiddenLayerApi.ScanReportSummaryResponseV3,
    fileResults: HiddenLayerApi.ScanFileResultWithComplianceV3[],
): ScanReport {
    const report: Record<string, unknown> = { ...summary, file_results: fileResults };
    const nestedSummary: Record<string, unknown> = { ...summary.summary };
    for (const field of DEPRECATED_SUMMARY_MIRROR_FIELDS) {
        if (report[field] === undefined && nestedSummary[field] !== undefined) {
            report[field] = nestedSummary[field];
        }
    }
    return report as unknown as ScanReport;
}

/**
 * Fetch every file result for a scan, throttling between page reads.
 *
 * @internal Implementation detail of the scan helpers — not part of the public API.
 */
export async function collectFileResults(
    client: HiddenLayerClient,
    scanId: string,
): Promise<HiddenLayerApi.ScanFileResultWithComplianceV3[]> {
    const page = await client.scans.results.listFiles({ scan_id: scanId, page_size: FILE_RESULTS_PAGE_SIZE });
    const fileResults = [...page.data];
    while (page.hasNextPage()) {
        await sleep(FILE_RESULTS_PAGE_DELAY_MS);
        await page.getNextPage();
        fileResults.push(...page.data);
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
export async function getScanResults(client: HiddenLayerClient, scanId: string): Promise<ScanReport> {
    let retries = 0;
    const maxRetries = 5; // Fewer retries since we're not waiting for completion
    const baseDelay = 500; // milliseconds

    while (retries < maxRetries) {
        try {
            const summary = await client.scans.results.retrieveSummary({ scan_id: scanId });
            const fileResults = await collectFileResults(client, scanId);
            return buildScanReport(summary, fileResults);
        } catch (error) {
            if (!isNotFound(error)) {
                throw error;
            }
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
export async function waitForScanResults(client: HiddenLayerClient, scanId: string): Promise<ScanReport> {
    const baseDelay = 100; // milliseconds
    let retries = 0;

    while (true) {
        try {
            const summary = await client.scans.results.retrieveSummary({ scan_id: scanId });
            if (
                summary.status === ScanStatus.DONE ||
                summary.status === ScanStatus.FAILED ||
                summary.status === ScanStatus.CANCELED
            ) {
                const fileResults = await collectFileResults(client, scanId);
                return buildScanReport(summary, fileResults);
            }
            console.info(`scan status: ${summary.status}`);
        } catch (error) {
            if (!isNotFound(error)) {
                throw error;
            }
            console.info("scan not found yet, retrying...");
        }

        retries++;
        let delay = baseDelay * 2 ** retries + Math.random() * 1000; // exponential back off retry
        delay = Math.min(delay, 30000); // cap at 30 seconds
        await sleep(delay);
    }
}
