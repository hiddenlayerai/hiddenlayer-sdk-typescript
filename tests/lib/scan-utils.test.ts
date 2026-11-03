import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from "vitest";
import { NotFoundError } from "../../src/api/errors/NotFoundError.js";
import { HiddenLayerError } from "../../src/errors/index.js";
import {
    buildScanReport,
    collectFileResults,
    FILE_RESULTS_PAGE_DELAY_MS,
    FILE_RESULTS_PAGE_SIZE,
    getScanResults,
    ScanStatus,
    waitForScanResults,
} from "../../src/lib/scan-utils.js";
import { HiddenLayer } from "../../src/wrapper/HiddenLayer.js";
import { type FileResult, fakePage, fileResult, runTimersImmediately, scanSummary } from "./fixtures.js";

vi.mock("@aws-sdk/client-s3");
vi.mock("@azure/storage-blob");
vi.mock("@huggingface/hub");

describe("scan-utils", () => {
    let client: HiddenLayer;
    let mockRetrieve: MockInstance<HiddenLayer["scans"]["jobs"]["retrieve"]>;
    let mockRetrieveSummary: MockInstance<HiddenLayer["scans"]["results"]["retrieveSummary"]>;
    let mockListFiles: MockInstance<HiddenLayer["scans"]["results"]["listFiles"]>;

    beforeEach(() => {
        client = new HiddenLayer({ token: "test-token" });
        mockRetrieve = vi.spyOn(client.scans.jobs, "retrieve");
        mockRetrieveSummary = vi.spyOn(client.scans.results, "retrieveSummary");
        mockListFiles = vi.spyOn(client.scans.results, "listFiles");

        vi.spyOn(console, "info").mockImplementation(() => {});
        vi.spyOn(console, "error").mockImplementation(() => {});

        runTimersImmediately();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    function mockSinglePageOfFiles(items: FileResult[] = [fileResult("file-1")]): FileResult[] {
        mockListFiles.mockResolvedValue(fakePage(items));
        return items;
    }

    describe("ScanStatus constants", () => {
        it("has all expected status constants", () => {
            expect(ScanStatus.DONE).toBe("done");
            expect(ScanStatus.FAILED).toBe("failed");
            expect(ScanStatus.PENDING).toBe("pending");
            expect(ScanStatus.RUNNING).toBe("running");
            expect(ScanStatus.CANCELED).toBe("canceled");
        });
    });

    describe("collectFileResults", () => {
        it("collects a single page without throttling", async () => {
            const items = mockSinglePageOfFiles();
            const delays = runTimersImmediately();

            const results = await collectFileResults(client, "test-scan-123");

            expect(results).toEqual(items);
            expect(mockListFiles).toHaveBeenCalledWith({ scan_id: "test-scan-123", page_size: FILE_RESULTS_PAGE_SIZE });
            expect(delays).toEqual([]);
        });

        it("collects every page in order, throttled between page reads", async () => {
            const page = fakePage([fileResult("file-1")], [fileResult("file-2")], [fileResult("file-3")]);
            mockListFiles.mockResolvedValue(page);
            const delays = runTimersImmediately();

            const results = await collectFileResults(client, "test-scan-123");

            expect(results.map((r) => r.file_instance_id)).toEqual(["file-1", "file-2", "file-3"]);
            expect(mockListFiles).toHaveBeenCalledTimes(1);
            expect(page.getNextPage).toHaveBeenCalledTimes(2);
            // One throttle sleep before each subsequent page fetch
            expect(delays).toEqual([FILE_RESULTS_PAGE_DELAY_MS, FILE_RESULTS_PAGE_DELAY_MS]);
        });
    });

    describe("buildScanReport", () => {
        it("maps summary, file results, and deprecated mirror fields", () => {
            const summary = scanSummary("done");
            const fileResults = [fileResult("file-1"), fileResult("file-2")];

            const report = buildScanReport(summary, fileResults);

            expect(report.scan_id).toBe("test-scan-123");
            expect(report.status).toBe("done");
            expect(report.file_results).toEqual(fileResults);
            // Deprecated top-level fields are mirrored from the nested summary
            expect(report.detection_count).toBe(1);
            expect(report.file_count).toBe(2);
            expect(report.files_with_detections_count).toBe(1);
        });

        it("does not overwrite top-level fields already on the summary", () => {
            const summary = scanSummary("done", { detection_count: 7 });

            const report = buildScanReport(summary, []);

            expect(report.detection_count).toBe(7);
        });
    });

    describe("getScanResults", () => {
        it("assembles the report from the summary and file results on first try", async () => {
            mockRetrieveSummary.mockResolvedValue(scanSummary("pending"));
            const items = mockSinglePageOfFiles();

            const result = await getScanResults(client, "test-scan-123");

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
            expect(mockRetrieveSummary).toHaveBeenCalledWith({ scan_id: "test-scan-123" });
            expect(mockRetrieve).not.toHaveBeenCalled();
            expect(result.scan_id).toBe("test-scan-123");
            expect(result.status).toBe("pending");
            expect(result.file_results).toEqual(items);
        });

        it("retries on 404 error", async () => {
            const notFoundError = new NotFoundError({ detail: "Not found" });
            mockRetrieveSummary
                .mockRejectedValueOnce(notFoundError)
                .mockRejectedValueOnce(notFoundError)
                .mockResolvedValueOnce(scanSummary("pending"));
            mockSinglePageOfFiles();

            const result = await getScanResults(client, "test-scan-123");

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(3);
            expect(result.scan_id).toBe("test-scan-123");
            expect(console.info).toHaveBeenCalledWith(expect.stringContaining("Scan not yet available"));
        });

        it("retries on a generic HiddenLayerError with status 404", async () => {
            mockRetrieveSummary
                .mockRejectedValueOnce(new HiddenLayerError({ statusCode: 404, body: { detail: "Not found" } }))
                .mockResolvedValueOnce(scanSummary("pending"));
            mockSinglePageOfFiles();

            const result = await getScanResults(client, "test-scan-123");

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(2);
            expect(result.scan_id).toBe("test-scan-123");
        });

        it("throws error after max retries", async () => {
            const notFoundError = new NotFoundError({ detail: "Not found" });
            mockRetrieveSummary.mockRejectedValue(notFoundError);

            await expect(getScanResults(client, "test-scan-123")).rejects.toBe(notFoundError);

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(5); // max retries
            expect(console.error).toHaveBeenCalledWith("Scan test-scan-123 not found after 5 attempts");
        });

        it("throws non-404 errors immediately", async () => {
            const serverError = new HiddenLayerError({ statusCode: 500, body: { detail: "Server error" } });
            mockRetrieveSummary.mockRejectedValue(serverError);

            await expect(getScanResults(client, "test-scan-123")).rejects.toBe(serverError);

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
        });
    });

    describe("waitForScanResults", () => {
        it("polls the summary until scan is done, then assembles the report", async () => {
            mockRetrieveSummary
                .mockResolvedValueOnce(scanSummary("pending"))
                .mockResolvedValueOnce(scanSummary("running"))
                .mockResolvedValueOnce(scanSummary("done"));
            const items = mockSinglePageOfFiles();

            const result = await waitForScanResults(client, "test-scan-123");

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(3);
            expect(mockListFiles).toHaveBeenCalledTimes(1);
            expect(mockRetrieve).not.toHaveBeenCalled();
            expect(result.status).toBe("done");
            expect(result.file_results).toEqual(items);
            expect(console.info).toHaveBeenCalledWith("scan status: pending");
            expect(console.info).toHaveBeenCalledWith("scan status: running");
        });

        it("handles initial 404 errors gracefully", async () => {
            const notFoundError = new NotFoundError({ detail: "Not found" });
            mockRetrieveSummary
                .mockRejectedValueOnce(notFoundError)
                .mockRejectedValueOnce(notFoundError)
                .mockResolvedValueOnce(scanSummary("pending"))
                .mockResolvedValueOnce(scanSummary("done"));
            mockSinglePageOfFiles();

            const result = await waitForScanResults(client, "test-scan-123");

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(4);
            expect(result.status).toBe("done");
            expect(console.info).toHaveBeenCalledWith("scan not found yet, retrying...");
        });

        it("returns immediately on failed status", async () => {
            mockRetrieveSummary.mockResolvedValueOnce(scanSummary("failed"));
            mockSinglePageOfFiles();

            const result = await waitForScanResults(client, "test-scan-123");

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
            expect(result.status).toBe("failed");
        });

        it("returns immediately on canceled status", async () => {
            mockRetrieveSummary.mockResolvedValueOnce(scanSummary("canceled"));
            mockSinglePageOfFiles();

            const result = await waitForScanResults(client, "test-scan-123");

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
            expect(result.status).toBe("canceled");
        });

        it("throws non-404 errors", async () => {
            const serverError = new HiddenLayerError({ statusCode: 500, body: { detail: "Server error" } });
            mockRetrieveSummary.mockRejectedValue(serverError);

            await expect(waitForScanResults(client, "test-scan-123")).rejects.toBe(serverError);

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
            expect(mockListFiles).not.toHaveBeenCalled();
        });

        it("exponential backoff works correctly", async () => {
            vi.spyOn(Math, "random").mockReturnValue(0.5);
            mockRetrieveSummary
                .mockResolvedValueOnce(scanSummary("pending"))
                .mockResolvedValueOnce(scanSummary("pending"))
                .mockResolvedValueOnce(scanSummary("pending"))
                .mockResolvedValueOnce(scanSummary("pending"))
                .mockResolvedValueOnce(scanSummary("done"));
            mockSinglePageOfFiles();
            const delays = runTimersImmediately();

            await waitForScanResults(client, "test-scan-123");

            expect(delays).toHaveLength(4);
            for (let i = 1; i < delays.length; i++) {
                expect(delays[i - 1]).toBeLessThan(delays[i]);
            }
            for (const delay of delays) {
                expect(delay).toBeLessThanOrEqual(30000);
            }
        });
    });
});
