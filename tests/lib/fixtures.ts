// Shared fixtures for the scan helper tests.
import { vi } from "vitest";
import type * as HiddenLayerApi from "../../src/api/index.js";
import type { HiddenLayerClient } from "../../src/Client.js";

export type FileResult = HiddenLayerApi.ScanFileResultWithComplianceV3;
export type FileResultsPage = Awaited<ReturnType<HiddenLayerClient["scans"]["results"]["listFiles"]>>;
export type ScanSummary = HiddenLayerApi.ScanReportSummaryResponseV3;

export function fileResult(fileId: string): FileResult {
    return { file_instance_id: fileId, file_location: `${fileId}.pkl` } as unknown as FileResult;
}

/** A summary carrying only the given fields, for tests that don't care about the rest. */
export function partialSummary(fields: Record<string, unknown>): ScanSummary {
    return fields as unknown as ScanSummary;
}

export function scanSummary(status: string = "pending", fields: Record<string, unknown> = {}): ScanSummary {
    return partialSummary({
        scan_id: "test-scan-123",
        status,
        summary: {
            detection_count: 1,
            file_count: 2,
            files_with_detections_count: 1,
        },
        inventory: {
            model_id: "test-model-id",
            model_version_id: "test-model-version-id",
            model_name: "test-model",
            requested_scan_location: "test.pkl",
        },
        start_time: "2024-01-01T00:00:00Z",
        version: "1.0.0",
        ...fields,
    });
}

/**
 * A file-results page that behaves like Fern's `core.Page`: `getNextPage()` loads the next page into the same
 * object, replacing `data`, rather than returning a new page.
 */
export function fakePage(...pages: FileResult[][]): FileResultsPage {
    let index = 0;
    const page = {
        data: pages[0] ?? [],
        hasNextPage: () => index < pages.length - 1,
        getNextPage: vi.fn(async () => {
            index++;
            page.data = pages[index] ?? [];
            return page;
        }),
    };
    return page as unknown as FileResultsPage;
}

/**
 * Make `setTimeout` run its callback at once so the helpers' retry and throttle sleeps cost nothing, and return
 * the delays they asked for. Undone by `vi.restoreAllMocks()`.
 */
export function runTimersImmediately(): number[] {
    const delays: number[] = [];
    vi.spyOn(globalThis, "setTimeout").mockImplementation(((callback: () => void, delay?: number) => {
        if (delay) delays.push(delay);
        callback();
        return {} as NodeJS.Timeout;
    }) as typeof setTimeout);
    return delays;
}
