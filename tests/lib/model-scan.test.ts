import type { S3Client } from "@aws-sdk/client-s3";
import type { BlobServiceClient } from "@azure/storage-blob";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { afterEach, beforeEach, describe, expect, it, type Mock, type MockInstance, vi } from "vitest";
import type * as HiddenLayerApi from "../../src/api/index.js";
import { ModelScanner } from "../../src/lib/model-scan.js";
import { HiddenLayer } from "../../src/wrapper/HiddenLayer.js";
import { fakePage, fileResult, partialSummary, scanSummary } from "./fixtures.js";

vi.mock("@aws-sdk/client-s3");
vi.mock("@azure/storage-blob");
vi.mock("@huggingface/hub");

vi.mock("fs", async (importOriginal) => {
    const actual = await importOriginal<typeof import("fs")>();
    return {
        ...actual,
        statSync: vi.fn(),
        readdirSync: vi.fn(),
        createWriteStream: vi.fn(),
        promises: { ...actual.promises, open: vi.fn(), mkdir: vi.fn(), writeFile: vi.fn() },
    };
});

interface FakeFileHandle {
    read: Mock<(buffer: Buffer, offset: number, length: number, position: number) => Promise<{ bytesRead: number }>>;
    close: Mock<() => Promise<void>>;
}

type FakeDirent = Pick<fs.Dirent, "name" | "isDirectory">;

const mockedFs = {
    statSync: fs.statSync as unknown as Mock<(filePath: string) => Partial<fs.Stats>>,
    readdirSync: fs.readdirSync as unknown as Mock<(dir: string) => FakeDirent[]>,
    createWriteStream: fs.createWriteStream as unknown as Mock<(filePath: string) => unknown>,
    open: fs.promises.open as unknown as Mock<(filePath: string, flags: string) => Promise<FakeFileHandle>>,
    mkdir: fs.promises.mkdir as unknown as Mock<(dir: string, options: unknown) => Promise<void>>,
    writeFile: fs.promises.writeFile as unknown as Mock<(filePath: string, data: Buffer) => Promise<void>>,
};

function emptyFileHandle(bytesRead = 0): FakeFileHandle {
    return {
        read: vi.fn(async () => ({ bytesRead })),
        close: vi.fn(async () => undefined),
    };
}

function dirent(name: string, isDirectory = false): FakeDirent {
    return { name, isDirectory: () => isDirectory };
}

describe("ModelScanner", () => {
    let client: HiddenLayer;
    let scanner: ModelScanner;
    let fetchMock: Mock<(url: string, init: RequestInit) => Promise<Pick<Response, "ok" | "statusText">>>;
    let mockStart: MockInstance<HiddenLayer["scans"]["upload"]["start"]>;
    let mockFileAdd: MockInstance<HiddenLayer["scans"]["upload"]["file"]["add"]>;
    let mockFileComplete: MockInstance<HiddenLayer["scans"]["upload"]["file"]["complete"]>;
    let mockCompleteAll: MockInstance<HiddenLayer["scans"]["upload"]["completeAll"]>;
    let mockRetrieve: MockInstance<HiddenLayer["scans"]["jobs"]["retrieve"]>;
    let mockRetrieveSummary: MockInstance<HiddenLayer["scans"]["results"]["retrieveSummary"]>;
    let mockListFiles: MockInstance<HiddenLayer["scans"]["results"]["listFiles"]>;

    beforeEach(() => {
        vi.resetAllMocks();

        // Presigned part uploads go through the global fetch, not the API client.
        fetchMock = vi.fn(async () => ({ ok: true, statusText: "OK" }));
        vi.stubGlobal("fetch", fetchMock);

        client = new HiddenLayer({ token: "test-token" });
        scanner = new ModelScanner(client);

        mockStart = vi.spyOn(client.scans.upload, "start");
        mockFileAdd = vi.spyOn(client.scans.upload.file, "add");
        mockFileComplete = vi
            .spyOn(client.scans.upload.file, "complete")
            .mockResolvedValue({ scan_id: "test-scan-123" });
        mockCompleteAll = vi.spyOn(client.scans.upload, "completeAll").mockResolvedValue({ scan_id: "test-scan-123" });
        mockRetrieve = vi.spyOn(client.scans.jobs, "retrieve");
        mockRetrieveSummary = vi.spyOn(client.scans.results, "retrieveSummary");
        mockListFiles = vi.spyOn(client.scans.results, "listFiles");
        // Single page of one file result unless a test overrides it
        mockListFiles.mockResolvedValue(fakePage([fileResult("file-1")]));
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    describe("integration", () => {
        it("client has modelScanner property", () => {
            const testClient = new HiddenLayer({ token: "test-token" });
            expect(testClient.modelScanner).toBeInstanceOf(ModelScanner);
        });

        it("modelScanner property is cached", () => {
            const testClient = new HiddenLayer({ token: "test-token" });
            const scanner1 = testClient.modelScanner;
            const scanner2 = testClient.modelScanner;
            expect(scanner1).toBe(scanner2);
        });
    });

    describe("scanFile", () => {
        const mockFileContent = Buffer.from("test model data");
        const mockFilePath = "/tmp/test-model.pkl";

        beforeEach(() => {
            mockedFs.statSync.mockReturnValue({ size: mockFileContent.length });
            mockedFs.open.mockResolvedValue({
                read: vi.fn(async (buffer: Buffer, offset: number, length: number, _position: number) => {
                    mockFileContent.copy(buffer, offset, 0, length);
                    return { bytesRead: length };
                }),
                close: vi.fn(async () => undefined),
            });
        });

        it("uploads file with multipart upload", async () => {
            const mockSummary = scanSummary("done", {
                summary: { detection_count: 0, file_count: 1, files_with_detections_count: 0 },
            });
            mockStart.mockResolvedValue({ scan_id: "test-scan-123" });
            mockFileAdd.mockResolvedValue({
                upload_id: "upload-123",
                parts: [
                    {
                        part_number: 1,
                        start_offset: 0,
                        end_offset: mockFileContent.length,
                        upload_url: "https://example.com/upload-url",
                    },
                ],
            });
            mockRetrieveSummary.mockResolvedValue(mockSummary);

            const result = await scanner.scanFile({
                modelName: "test-model",
                modelPath: mockFilePath,
                waitForResults: false,
            });

            expect(mockStart).toHaveBeenCalledWith({
                model_name: "test-model",
                model_version: "1",
                requesting_entity: "hiddenlayer-typescript-sdk",
                request_source: "API Upload",
                origin: "",
            });

            expect(mockFileAdd).toHaveBeenCalledWith({
                scan_id: "test-scan-123",
                "file-name": path
                    .basename(mockFilePath)
                    .replace(/[^A-Za-z0-9._-]/g, "_")
                    .slice(0, 255),
                "file-content-length": mockFileContent.length,
            });

            expect(fetchMock).toHaveBeenCalledWith(
                "https://example.com/upload-url",
                expect.objectContaining({
                    method: "PUT",
                    headers: { "Content-Type": "application/octet-stream" },
                }),
            );
            expect(Buffer.from(fetchMock.mock.calls[0][1].body as Uint8Array)).toEqual(mockFileContent);

            expect(mockFileComplete).toHaveBeenCalledWith({ scan_id: "test-scan-123", file_id: "upload-123" });
            expect(mockCompleteAll).toHaveBeenCalledWith({ scan_id: "test-scan-123" });
            expect(mockRetrieve).not.toHaveBeenCalled();
            expect(result.scan_id).toBe(mockSummary.scan_id);
            expect(result.status).toBe(mockSummary.status);
            expect(result.file_results).toHaveLength(1);
        });

        it("throws error when scan_id is missing", async () => {
            mockStart.mockResolvedValue({ scan_id: null } as unknown as HiddenLayerApi.scans.StartUploadResponse);

            await expect(
                scanner.scanFile({
                    modelName: "test-model",
                    modelPath: mockFilePath,
                }),
            ).rejects.toThrow("scan_id must have a value");
        });

        it("handles custom parameters", async () => {
            mockStart.mockResolvedValue({ scan_id: "test-scan-123" });
            mockFileAdd.mockResolvedValue({ upload_id: "upload-123", parts: [] });
            mockRetrieveSummary.mockResolvedValue(partialSummary({ status: "pending" }));

            await scanner.scanFile({
                modelName: "custom-model",
                modelPath: mockFilePath,
                modelVersion: "v2.0",
                waitForResults: false,
                requestSource: "Integration",
                origin: "CustomOrigin",
            });

            expect(mockStart).toHaveBeenCalledWith({
                model_name: "custom-model",
                model_version: "v2.0",
                requesting_entity: "hiddenlayer-typescript-sdk",
                request_source: "Integration",
                origin: "CustomOrigin",
            });
        });
    });

    describe("scanFolder", () => {
        const mockFolderPath = "/tmp/models";

        beforeEach(() => {
            mockedFs.open.mockResolvedValue(emptyFileHandle(1000));
            mockedFs.readdirSync.mockImplementation((dir: string) => {
                if (dir === mockFolderPath) {
                    return [dirent("model1.pkl"), dirent("model2.h5"), dirent("subdir", true), dirent("readme.txt")];
                }
                if (dir === path.join(mockFolderPath, "subdir")) return [dirent("model3.pt")];
                return [];
            });
            mockedFs.statSync.mockImplementation((filePath: string) => ({
                size: 1000,
                isDirectory: () => filePath.includes("subdir") && !filePath.endsWith(".pt"),
            }));
        });

        it("scans all files in folder recursively", async () => {
            mockStart.mockResolvedValue({ scan_id: "test-scan-123" });
            mockFileAdd.mockResolvedValue({ upload_id: "upload-123", parts: [] });
            mockRetrieveSummary.mockResolvedValue(partialSummary({ status: "done" }));

            await scanner.scanFolder({
                modelName: "folder-models",
                path: mockFolderPath,
                waitForResults: false,
            });

            expect(mockStart).toHaveBeenCalledTimes(1);
            // Should skip .txt files by default
            expect(mockFileAdd).toHaveBeenCalledTimes(3);
        });

        it("applies file patterns correctly", async () => {
            mockStart.mockResolvedValue({ scan_id: "test-scan-123" });
            mockFileAdd.mockResolvedValue({ upload_id: "upload-123", parts: [] });
            mockRetrieveSummary.mockResolvedValue(partialSummary({ status: "done" }));

            await scanner.scanFolder({
                modelName: "folder-models",
                path: mockFolderPath,
                allowFilePatterns: ["*.pkl", "*.h5"],
                waitForResults: false,
            });

            // Should only upload .pkl and .h5 files
            expect(mockFileAdd).toHaveBeenCalledTimes(2);
        });

        it("throws error when scan_id is missing", async () => {
            mockStart.mockResolvedValue({ scan_id: null } as unknown as HiddenLayerApi.scans.StartUploadResponse);

            await expect(
                scanner.scanFolder({
                    modelName: "folder-models",
                    path: mockFolderPath,
                }),
            ).rejects.toThrow("scan_id must have a value");
        });
    });

    describe("cloud storage methods", () => {
        beforeEach(() => {
            mockedFs.statSync.mockReturnValue({ size: 1000, isFile: () => true, isDirectory: () => false });
            mockedFs.open.mockResolvedValue(emptyFileHandle());
            mockStart.mockResolvedValue({ scan_id: "scan-123" });
            mockFileAdd.mockResolvedValue({ upload_id: "upload-123", parts: [] });
            mockRetrieveSummary.mockResolvedValue(partialSummary({ status: "done" }));
        });

        it("scanS3Model uses S3 client to download and then scans", async () => {
            const writeStream = {
                on: vi.fn((event: string, cb: () => void) => {
                    if (event === "finish") setImmediate(cb);
                    return writeStream;
                }),
            };
            mockedFs.createWriteStream.mockReturnValue(writeStream);
            const send = vi.fn(async () => ({ Body: { on: vi.fn(), pipe: vi.fn((ws: unknown) => ws) } }));
            const mockS3Client = { send } as unknown as S3Client;

            await expect(
                scanner.scanS3Model({
                    modelName: "s3-model",
                    bucket: "test-bucket",
                    key: "test.pkl",
                    s3Client: mockS3Client,
                    waitForResults: false,
                }),
            ).resolves.toBeDefined();

            expect(send).toHaveBeenCalled();
        });

        it("scanAzureBlobModel uses BlobServiceClient to download and then scans", async () => {
            const downloadToFile = vi.fn(async (_path: string) => undefined);
            const mockBlobServiceClient = {
                getContainerClient: vi.fn(() => ({ getBlobClient: vi.fn(() => ({ downloadToFile })) })),
            } as unknown as BlobServiceClient;

            await expect(
                scanner.scanAzureBlobModel({
                    modelName: "azure-model",
                    accountUrl: "https://test.blob.core.windows.net",
                    container: "test-container",
                    blob: "test.pkl",
                    blobServiceClient: mockBlobServiceClient,
                    waitForResults: false,
                }),
            ).resolves.toBeDefined();

            expect(downloadToFile).toHaveBeenCalled();
        });

        it("scanHuggingFaceModel downloads snapshot and scans folder", async () => {
            mockedFs.mkdir.mockResolvedValue(undefined);
            mockedFs.writeFile.mockResolvedValue(undefined);
            mockedFs.readdirSync.mockImplementation((dir: string) =>
                path.basename(dir) === "models" ? [dirent("model.bin")] : [dirent("models", true)],
            );

            await expect(
                scanner.scanHuggingFaceModel({ repoId: "test/model", waitForResults: false }),
            ).resolves.toBeDefined();

            const tempDir = mockedFs.mkdir.mock.calls[0][0];
            expect(tempDir.startsWith(os.tmpdir())).toBe(true);
            expect(mockedFs.writeFile).toHaveBeenCalledWith(
                path.join(tempDir, "models", "model.bin"),
                Buffer.from("mock-data"),
            );
            expect(mockStart).toHaveBeenCalledWith(
                expect.objectContaining({ model_name: "test/model", origin: "Hugging Face" }),
            );
            expect(mockFileAdd).toHaveBeenCalledWith(expect.objectContaining({ "file-name": "model.bin" }));
        });
    });

    describe("file filtering", () => {
        it("default exclude patterns", async () => {
            mockedFs.open.mockResolvedValue(emptyFileHandle(1000));
            mockedFs.readdirSync.mockReturnValue([
                dirent("model.pkl"),
                dirent("readme.txt"),
                dirent("notes.md"),
                dirent("package.lock"),
                dirent(".gitattributes"),
                dirent(".git", true),
            ]);
            mockedFs.statSync.mockReturnValue({ size: 1000, isDirectory: () => false });
            mockStart.mockResolvedValue({ scan_id: "test-scan-123" });
            mockFileAdd.mockResolvedValue({ upload_id: "upload-123", parts: [] });
            mockRetrieveSummary.mockResolvedValue(partialSummary({ status: "done" }));

            await scanner.scanFolder({
                modelName: "test",
                path: "/tmp/test",
                waitForResults: false,
            });

            // Should only upload model.pkl, excluding all others
            expect(mockFileAdd).toHaveBeenCalledTimes(1);
            expect(mockFileAdd).toHaveBeenCalledWith(
                expect.objectContaining({
                    scan_id: "test-scan-123",
                    "file-name": expect.stringContaining("model.pkl"),
                }),
            );
        });
    });
});
