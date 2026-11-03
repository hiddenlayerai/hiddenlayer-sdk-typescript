import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from "vitest";
import type * as HiddenLayerApi from "../../src/api/index.js";
import { CommunityScanner, CommunityScanSource } from "../../src/lib/community-scan.js";
import { HiddenLayer } from "../../src/wrapper/HiddenLayer.js";
import { fakePage, fileResult, partialSummary, runTimersImmediately, scanSummary } from "./fixtures.js";

vi.mock("@aws-sdk/client-s3");
vi.mock("@azure/storage-blob");
vi.mock("@huggingface/hub");

function scanJob(fields: Record<string, unknown>): HiddenLayerApi.ScanJob {
    return fields as unknown as HiddenLayerApi.ScanJob;
}

describe("CommunityScanner", () => {
    let client: HiddenLayer;
    let scanner: CommunityScanner;
    let mockRequest: MockInstance<HiddenLayer["scans"]["jobs"]["request"]>;
    let mockRetrieve: MockInstance<HiddenLayer["scans"]["jobs"]["retrieve"]>;
    let mockRetrieveSummary: MockInstance<HiddenLayer["scans"]["results"]["retrieveSummary"]>;
    let mockListFiles: MockInstance<HiddenLayer["scans"]["results"]["listFiles"]>;

    beforeEach(() => {
        client = new HiddenLayer({ token: "test-token" });
        scanner = new CommunityScanner(client);

        mockRequest = vi.spyOn(client.scans.jobs, "request");
        mockRetrieve = vi.spyOn(client.scans.jobs, "retrieve");
        mockRetrieveSummary = vi.spyOn(client.scans.results, "retrieveSummary");
        mockListFiles = vi.spyOn(client.scans.results, "listFiles");
        // Single page of one file result unless a test overrides it
        mockListFiles.mockResolvedValue(fakePage([fileResult("file-1")]));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("integration", () => {
        it("client has communityScanner property", () => {
            const testClient = new HiddenLayer({ token: "test-token" });
            expect(testClient.communityScanner).toBeInstanceOf(CommunityScanner);
        });

        it("communityScanner property is cached", () => {
            const testClient = new HiddenLayer({ token: "test-token" });
            const scanner1 = testClient.communityScanner;
            const scanner2 = testClient.communityScanner;
            expect(scanner1).toBe(scanner2);
        });
    });

    describe("communityScan", () => {
        it("creates scan job with correct parameters", async () => {
            mockRequest.mockResolvedValue(scanJob({ scan_id: "test-scan-123" }));
            mockRetrieveSummary.mockResolvedValue(
                scanSummary("pending", {
                    summary: { detection_count: 0, file_count: 0, files_with_detections_count: 0 },
                }),
            );

            const result = await scanner.communityScan({
                modelName: "test-model",
                modelPath: "https://example.com/model.pkl",
                modelSource: CommunityScanSource.AWS_PRESIGNED,
                waitForResults: false,
            });

            expect(mockRequest).toHaveBeenCalledWith({
                access: { source: "AWS_PRESIGNED" },
                inventory: {
                    model_name: "test-model",
                    model_version: "main",
                    requested_scan_location: "https://example.com/model.pkl",
                    requesting_entity: "hiddenlayer-typescript-sdk",
                    request_source: "API Upload",
                    origin: "",
                },
            });

            expect(mockRetrieveSummary).toHaveBeenCalledWith({ scan_id: "test-scan-123" });
            expect(mockRetrieve).not.toHaveBeenCalled();
            expect(result.scan_id).toBe("test-scan-123");
            expect(result.status).toBe("pending");
            expect(result.file_results).toHaveLength(1);
        });

        it("handles custom parameters", async () => {
            mockRequest.mockResolvedValue(scanJob({ scan_id: "test-scan-123" }));
            mockRetrieveSummary.mockResolvedValue(partialSummary({ status: "pending" }));

            await scanner.communityScan({
                modelName: "custom-model",
                modelPath: "https://custom.com/model.bin",
                modelSource: CommunityScanSource.HUGGING_FACE,
                modelVersion: "v2.0",
                waitForResults: false,
                requestSource: "Integration",
                origin: "CustomOrigin",
            });

            expect(mockRequest).toHaveBeenCalledWith({
                access: { source: "HUGGING_FACE" },
                inventory: {
                    model_name: "custom-model",
                    model_version: "v2.0",
                    requested_scan_location: "https://custom.com/model.bin",
                    requesting_entity: "hiddenlayer-typescript-sdk",
                    request_source: "Integration",
                    origin: "CustomOrigin",
                },
            });
        });

        it("throws error when scan_id is missing", async () => {
            mockRequest.mockResolvedValue(scanJob({ scan_id: null }));

            await expect(
                scanner.communityScan({
                    modelName: "test-model",
                    modelPath: "https://example.com/model.pkl",
                    modelSource: "AWS_PRESIGNED",
                }),
            ).rejects.toThrow("scan_id must have a value");
        });

        it("waits for results when waitForResults is true", async () => {
            mockRequest.mockResolvedValue(scanJob({ scan_id: "test-scan-123" }));
            mockRetrieveSummary
                .mockResolvedValueOnce(partialSummary({ scan_id: "test-scan-123", status: "pending" }))
                .mockResolvedValueOnce(partialSummary({ scan_id: "test-scan-123", status: "running" }))
                .mockResolvedValueOnce(
                    scanSummary("done", {
                        summary: { detection_count: 2, file_count: 1, files_with_detections_count: 1 },
                    }),
                );
            vi.spyOn(console, "info").mockImplementation(() => {});
            runTimersImmediately();

            const result = await scanner.communityScan({
                modelName: "test-model",
                modelPath: "https://example.com/model.pkl",
                modelSource: "AWS_PRESIGNED",
                waitForResults: true,
            });

            expect(mockRetrieveSummary).toHaveBeenCalledTimes(3);
            expect(mockListFiles).toHaveBeenCalledTimes(1);
            expect(mockRetrieve).not.toHaveBeenCalled();
            expect(result.scan_id).toBe("test-scan-123");
            expect(result.status).toBe("done");
            expect(result.file_results).toHaveLength(1);
            // Deprecated top-level counts are mirrored from the nested summary
            expect(result.detection_count).toBe(2);
        });
    });

    describe("CommunityScanSource constants", () => {
        it("has all expected source constants", () => {
            expect(CommunityScanSource.LOCAL).toBe("LOCAL");
            expect(CommunityScanSource.AWS_PRESIGNED).toBe("AWS_PRESIGNED");
            expect(CommunityScanSource.AWS_IAM_ROLE).toBe("AWS_IAM_ROLE");
            expect(CommunityScanSource.AZURE_BLOB_SAS).toBe("AZURE_BLOB_SAS");
            expect(CommunityScanSource.AZURE_BLOB_AD).toBe("AZURE_BLOB_AD");
            expect(CommunityScanSource.GOOGLE_SIGNED).toBe("GOOGLE_SIGNED");
            expect(CommunityScanSource.GOOGLE_OAUTH).toBe("GOOGLE_OAUTH");
            expect(CommunityScanSource.HUGGING_FACE).toBe("HUGGING_FACE");
        });
    });
});
