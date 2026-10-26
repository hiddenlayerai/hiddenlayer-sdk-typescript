// Security tests for path traversal mitigation and temp cleanup
import type { S3Client } from "@aws-sdk/client-s3";
import type { BlobServiceClient } from "@azure/storage-blob";
import { listFiles } from "@huggingface/hub";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { PathValidator } from "../../src/internal/utils/path-validator.js";
import { ModelScanner } from "../../src/lib/model-scan.js";
import { HiddenLayer } from "../../src/wrapper/HiddenLayer.js";
import type { FakeListFileEntry } from "../__mocks__/@huggingface/hub.js";
import { fakePage, partialSummary } from "../lib/fixtures.js";

vi.mock("@aws-sdk/client-s3");
vi.mock("@azure/storage-blob");
vi.mock("@huggingface/hub");

vi.mock("fs", async (importOriginal) => {
    const actual = await importOriginal<typeof import("fs")>();
    return {
        ...actual,
        statSync: vi.fn(),
        readdirSync: vi.fn(),
        existsSync: vi.fn(),
        unlinkSync: vi.fn(),
        rmSync: vi.fn(),
        createWriteStream: vi.fn(),
        promises: { ...actual.promises, open: vi.fn(), mkdir: vi.fn(), writeFile: vi.fn() },
    };
});

const mockedFs = {
    statSync: fs.statSync as unknown as Mock<(filePath: string) => Partial<fs.Stats>>,
    existsSync: fs.existsSync as unknown as Mock<(filePath: string) => boolean>,
    unlinkSync: fs.unlinkSync as unknown as Mock<(filePath: string) => void>,
    rmSync: fs.rmSync as unknown as Mock<(filePath: string, options: unknown) => void>,
    createWriteStream: fs.createWriteStream as unknown as Mock<(filePath: string) => unknown>,
    open: fs.promises.open as unknown as Mock<(filePath: string, flags: string) => Promise<unknown>>,
    mkdir: fs.promises.mkdir as unknown as Mock<(dir: string, options: unknown) => Promise<void>>,
    writeFile: fs.promises.writeFile as unknown as Mock<(filePath: string, data: Buffer) => Promise<void>>,
};

const mockedListFiles = listFiles as unknown as Mock<(params: unknown) => AsyncGenerator<FakeListFileEntry>>;

describe("Path traversal and temp handling", () => {
    let client: HiddenLayer;
    let scanner: ModelScanner;

    beforeEach(() => {
        vi.resetAllMocks();
        // Avoid actual network upload of parts by returning no parts
        vi.stubGlobal(
            "fetch",
            vi.fn(async () => ({ ok: true, statusText: "OK" })),
        );

        client = new HiddenLayer({ token: "test-token" });
        scanner = new ModelScanner(client);

        vi.spyOn(client.scans.upload, "start").mockResolvedValue({ scan_id: "scan-123" });
        vi.spyOn(client.scans.upload.file, "add").mockResolvedValue({ upload_id: "upload-123", parts: [] });
        vi.spyOn(client.scans.upload.file, "complete").mockResolvedValue({ scan_id: "scan-123" });
        vi.spyOn(client.scans.upload, "completeAll").mockResolvedValue({ scan_id: "scan-123" });
        vi.spyOn(client.scans.results, "retrieveSummary").mockResolvedValue(partialSummary({ status: "done" }));
        vi.spyOn(client.scans.results, "listFiles").mockResolvedValue(fakePage([]));

        mockedFs.statSync.mockReturnValue({ size: 1234, isFile: () => true });
        // Provide a minimal file handle for scanFileInternal
        mockedFs.open.mockResolvedValue({
            read: vi.fn(async () => ({ bytesRead: 0 })),
            close: vi.fn(async () => undefined),
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    describe("PathValidator.createSafeTempPath", () => {
        it("creates path under os.tmpdir with sanitized basename", () => {
            const malicious = "../../../etc/passwd";
            const p = PathValidator.createSafeTempPath(malicious);
            expect(p.startsWith(os.tmpdir())).toBe(true);
            const base = path.basename(p);
            expect(base).not.toContain("..");
            expect(base).not.toContain("/");
            expect(base).not.toContain("\\");
            expect(base).toMatch(/^hiddenlayer-\d+-[a-z0-9]+-/);
        });

        it("preserves file extension", () => {
            const p = PathValidator.createSafeTempPath("model.onnx");
            expect(p.endsWith(".onnx")).toBe(true);
        });
    });

    describe("scanS3Model safe temp path and cleanup", () => {
        it("sanitizes key and cleans up temp file", async () => {
            const writeStream = {
                on: vi.fn((event: string, cb: () => void) => {
                    if (event === "finish") {
                        setImmediate(cb);
                    }
                    return writeStream;
                }),
            };
            mockedFs.createWriteStream.mockReturnValue(writeStream);
            const body = { on: vi.fn(), pipe: vi.fn(() => writeStream) };
            const mockS3Client = { send: vi.fn(async () => ({ Body: body })) } as unknown as S3Client;
            // Ensure cleanup path exists
            mockedFs.existsSync.mockReturnValue(true);

            await scanner.scanS3Model({
                modelName: "m",
                bucket: "b",
                key: "../../../etc/passwd",
                s3Client: mockS3Client,
                waitForResults: false,
            });

            const tempPathArg = mockedFs.createWriteStream.mock.calls[0][0];
            expect(tempPathArg.startsWith(os.tmpdir())).toBe(true);
            expect(tempPathArg).not.toContain("..");
            expect(mockedFs.unlinkSync).toHaveBeenCalledWith(tempPathArg);
        });
    });

    describe("scanAzureBlobModel safe temp path and cleanup", () => {
        it("sanitizes blob name and cleans up temp file", async () => {
            const downloadToFile = vi.fn(async (_path: string) => undefined);
            const mockBlobServiceClient = {
                getContainerClient: vi.fn(() => ({ getBlobClient: vi.fn(() => ({ downloadToFile })) })),
            } as unknown as BlobServiceClient;
            mockedFs.existsSync.mockReturnValue(true);

            await scanner.scanAzureBlobModel({
                modelName: "m",
                accountUrl: "https://example.com",
                container: "c",
                blob: "..\\..\\windows\\system32",
                blobServiceClient: mockBlobServiceClient,
                waitForResults: false,
            });

            const tempPathArg = downloadToFile.mock.calls[0][0];
            expect(tempPathArg.startsWith(os.tmpdir())).toBe(true);
            expect(tempPathArg).not.toContain("..");
            expect(mockedFs.unlinkSync).toHaveBeenCalledWith(tempPathArg);
        });
    });

    describe("scanHuggingFaceModel path validation and cleanup", () => {
        it("rejects a repo file path that escapes the download dir and still removes the temp dir", async () => {
            mockedListFiles.mockImplementation(async function* () {
                yield { type: "file", size: 1, path: "../../evil.bin", oid: "oid" };
            });
            mockedFs.existsSync.mockReturnValue(true);

            await expect(scanner.scanHuggingFaceModel({ repoId: "org/model", waitForResults: false })).rejects.toThrow(
                "path traversal not allowed",
            );

            const tempDir = mockedFs.mkdir.mock.calls[0][0];
            expect(tempDir.startsWith(os.tmpdir())).toBe(true);
            expect(mockedFs.writeFile).not.toHaveBeenCalled();
            expect(mockedFs.rmSync).toHaveBeenCalledWith(tempDir, { recursive: true, force: true });
        });
    });
});
