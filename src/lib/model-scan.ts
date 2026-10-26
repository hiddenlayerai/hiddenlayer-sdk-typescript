/**
 * The model scanner: uploads local files and folders, and models fetched from S3, Azure Blob Storage and
 * Hugging Face, to the scan upload API, then waits for or reads the scan report.
 *
 * The storage SDKs are peer dependencies imported by the scan that needs one, so importing the package
 * works without them.
 */

import type { S3Client } from "@aws-sdk/client-s3";
import type { BlobServiceClient, newPipeline } from "@azure/storage-blob";
import type { downloadFile, listFiles } from "@huggingface/hub";
import * as fs from "fs";
import { minimatch } from "minimatch";
import * as path from "path";
import type * as HiddenLayerApi from "../api/index.js";
import type { HiddenLayerClient } from "../Client.js";
import { PathValidator } from "../internal/utils/path-validator.js";
import { getScanResults, type ScanReport, waitForScanResults } from "./scan-utils.js";

const EXCLUDE_FILE_TYPES = ["*.txt", "*.md", "*.lock", ".gitattributes", ".git", ".git/*", "*/.git", "**/.git/**"];

type HubListFilesParams = Parameters<typeof listFiles>[0];
type HubDownloadFileParams = Parameters<typeof downloadFile>[0];

/** The credential `new BlobServiceClient(accountUrl, credential)` takes; omit it when `accountUrl` carries a SAS token. */
export type AzureBlobCredential = NonNullable<Parameters<typeof newPipeline>[0]>;

async function importPeer<T>(name: string, load: () => Promise<T>): Promise<T> {
    try {
        return await load();
    } catch (error) {
        throw new Error(`This scan needs ${name}: install it beside @hiddenlayerai/hiddenlayer-sdk. ${errorMessage(error)}`);
    }
}

export interface ScanFileOptions {
    modelName: string;
    modelPath: string;
    modelVersion?: string;
    waitForResults?: boolean;
    requestSource?: HiddenLayerApi.ScanJobRequestSource;
    origin?: string;
}

export interface ScanFolderOptions {
    modelName: string;
    path: string;
    modelVersion?: string;
    allowFilePatterns?: string[];
    ignoreFilePatterns?: string[];
    waitForResults?: boolean;
    requestSource?: HiddenLayerApi.ScanJobRequestSource;
    origin?: string;
}

export interface ScanS3ModelOptions {
    modelName: string;
    bucket: string;
    key: string;
    modelVersion?: string;
    s3Client?: S3Client;
    waitForResults?: boolean;
    requestSource?: HiddenLayerApi.ScanJobRequestSource;
}

export interface ScanAzureBlobModelOptions {
    modelName: string;
    accountUrl: string;
    container: string;
    blob: string;
    modelVersion?: string;
    blobServiceClient?: BlobServiceClient;
    credential?: AzureBlobCredential;
    waitForResults?: boolean;
    requestSource?: HiddenLayerApi.ScanJobRequestSource;
}

export interface ScanHuggingFaceModelOptions {
    repoId: string;
    modelName?: string;
    revision?: string;
    localDir?: string;
    allowFilePatterns?: string[];
    ignoreFilePatterns?: string[];
    forceDownload?: boolean;
    hfToken?: string | boolean;
    waitForResults?: boolean;
    requestSource?: HiddenLayerApi.ScanJobRequestSource;
}

function matchesAny(basename: string, patterns: string[] | undefined): boolean {
    return (patterns ?? []).some((pattern) => minimatch(basename, pattern));
}

/**
 * Filter path objects based on an allowlist and a denylist.
 *
 * Patterns are Unix shell-style wildcards which are NOT regular expressions.
 *
 * @param items - List of paths to filter
 * @param allowPatterns - Patterns constituting the allowlist. If provided, item paths must match at least one pattern from the allowlist
 * @param ignorePatterns - Patterns constituting the denylist. If provided, item paths must not match any patterns from the denylist
 * @returns Filtered list of paths
 */
function* filterPathObjects(
    items: Iterable<string>,
    allowPatterns?: string[],
    ignorePatterns?: string[],
): Generator<string> {
    for (const item of items) {
        if (fs.statSync(item).isDirectory()) {
            continue;
        }
        const basename = path.basename(item);
        if (allowPatterns && allowPatterns.length > 0 && !matchesAny(basename, allowPatterns)) {
            continue;
        }
        if (matchesAny(basename, ignorePatterns)) {
            continue;
        }
        yield item;
    }
}

/**
 * Recursively get all files in a directory.
 */
function* getAllFiles(dir: string, excludePatterns: string[] = []): Generator<string> {
    for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
        const filePath = path.join(dir, file.name);
        if (!file.isDirectory()) {
            yield filePath;
            continue;
        }
        const shouldExclude =
            filePath.includes("/.git/") ||
            filePath.endsWith("/.git") ||
            excludePatterns.some((pattern) => minimatch(file.name, pattern) || minimatch(filePath, pattern));
        if (!shouldExclude) {
            yield* getAllFiles(filePath, excludePatterns);
        }
    }
}

/**
 * Model scanner that provides file and folder scanning functionality.
 *
 * This class extends the generated SDK to provide the same functionality as the old SDK's
 * ModelScanAPI, including multipart upload functionality for files and folders.
 */
export class ModelScanner {
    private readonly client: HiddenLayerClient;

    constructor(client: HiddenLayerClient) {
        this.client = client;
    }

    /**
     * Scan a local model file using the HiddenLayer Model Scanner.
     *
     * @param options - The scan options
     * @returns Scan Results
     */
    async scanFile(options: ScanFileOptions): Promise<ScanReport> {
        const {
            modelName,
            modelPath,
            modelVersion = "1",
            waitForResults = true,
            requestSource = "API Upload",
            origin = "",
        } = options;

        const scanId = await this.startUpload(modelName, modelVersion, requestSource, origin);
        await this.scanFileInternal(scanId, modelPath);
        return await this.completeUpload(scanId, waitForResults);
    }

    /**
     * Submits all files in a directory and its sub directories to be scanned.
     *
     * @param options - The scan options
     * @returns Scan Results
     */
    async scanFolder(options: ScanFolderOptions): Promise<ScanReport> {
        const {
            modelName,
            path: folderPath,
            modelVersion = "1",
            allowFilePatterns,
            ignoreFilePatterns,
            waitForResults = true,
            requestSource = "API Upload",
            origin = "",
        } = options;

        const scanId = await this.startUpload(modelName, modelVersion, requestSource, origin);

        const finalIgnorePatterns = ignoreFilePatterns
            ? [...EXCLUDE_FILE_TYPES, ...ignoreFilePatterns]
            : EXCLUDE_FILE_TYPES;
        const files = filterPathObjects(
            getAllFiles(folderPath, finalIgnorePatterns),
            allowFilePatterns,
            finalIgnorePatterns,
        );
        for (const file of files) {
            await this.scanFileInternal(scanId, file);
        }

        return await this.completeUpload(scanId, waitForResults);
    }

    /**
     * Scan a model file on S3.
     *
     * @param options - The scan options
     * @returns Scan Results
     *
     * @example
     * ```ts
     * await client.modelScanner.scanS3Model({
     *   modelName: 'your-model-name',
     *   bucket: 's3_bucket',
     *   key: 'path/to/file'
     * });
     * ```
     */
    async scanS3Model(options: ScanS3ModelOptions): Promise<ScanReport> {
        const {
            modelName,
            bucket,
            key,
            modelVersion = "1",
            s3Client,
            waitForResults = true,
            requestSource = "API Upload",
        } = options;

        const s3 = await importPeer("@aws-sdk/client-s3", () => import("@aws-sdk/client-s3"));
        const client = s3Client ?? new s3.S3Client();
        const tempPath = PathValidator.createSafeTempPath(key);

        try {
            const response = await client.send(new s3.GetObjectCommand({ Bucket: bucket, Key: key }));
            if (!response.Body) {
                throw new Error("No response body from S3");
            }
            // In Node the body is a Readable; the SDK types it as a union with the browser stream types.
            const stream = response.Body as NodeJS.ReadableStream;
            const writeStream = fs.createWriteStream(tempPath);
            await new Promise<void>((resolve, reject) => {
                // pipe() doesn't forward the source's errors, so a failed download would otherwise never settle.
                stream.on("error", reject);
                stream.pipe(writeStream).on("finish", () => resolve()).on("error", reject);
            });

            return await this.scanFile({
                modelPath: tempPath,
                modelName,
                modelVersion,
                waitForResults,
                requestSource,
                origin: "S3",
            });
        } catch (e) {
            throw new Error(`Couldn't download model s3://${bucket}/${key}: ${errorMessage(e)}`);
        } finally {
            cleanupTempFile(tempPath);
        }
    }

    /**
     * Scan a model file on Azure Blob Storage.
     *
     * @param options - The scan options
     * @returns Scan Results
     *
     * @example
     * ```ts
     * await client.modelScanner.scanAzureBlobModel({
     *   modelName: 'your-model-name',
     *   accountUrl: 'https://<storageaccountname>.blob.core.windows.net',
     *   container: 'container_name',
     *   blob: 'path/to/file.bin',
     *   credential: new DefaultAzureCredential(), // or put a SAS token in accountUrl and omit it
     * });
     * ```
     */
    async scanAzureBlobModel(options: ScanAzureBlobModelOptions): Promise<ScanReport> {
        const {
            modelName,
            accountUrl,
            container,
            blob,
            modelVersion = "1",
            blobServiceClient,
            credential,
            waitForResults = true,
            requestSource = "API Upload",
        } = options;

        let client = blobServiceClient;
        if (client === undefined) {
            const azure = await importPeer("@azure/storage-blob", () => import("@azure/storage-blob"));
            client = new azure.BlobServiceClient(accountUrl, credential);
        }
        const tempPath = PathValidator.createSafeTempPath(blob);
        const blobClient = client.getContainerClient(container).getBlobClient(blob);

        try {
            await blobClient.downloadToFile(tempPath);

            return await this.scanFile({
                modelPath: tempPath,
                modelName,
                modelVersion,
                waitForResults,
                requestSource,
                origin: "Azure Blob Storage",
            });
        } catch (e) {
            throw new Error(`Couldn't download model ${accountUrl}, ${container}, ${blob}: ${errorMessage(e)}`);
        } finally {
            cleanupTempFile(tempPath);
        }
    }

    /**
     * Scans a model on HuggingFace.
     *
     * Note: Requires the `@huggingface/hub` package to be installed.
     *
     * @param options - The scan options
     * @returns Scan Results
     */
    async scanHuggingFaceModel(options: ScanHuggingFaceModelOptions): Promise<ScanReport> {
        const {
            repoId,
            modelName,
            revision,
            localDir,
            allowFilePatterns,
            ignoreFilePatterns,
            hfToken,
            waitForResults = true,
            requestSource = "API Upload",
        } = options;

        const isTempDir = !localDir;
        const finalLocalDir = localDir ?? PathValidator.createSafeTempDir(repoId);
        const finalIgnorePatterns = ignoreFilePatterns
            ? [...EXCLUDE_FILE_TYPES, ...ignoreFilePatterns]
            : EXCLUDE_FILE_TYPES;
        const accessToken = typeof hfToken === "string" && hfToken ? hfToken : undefined;

        const hub = await importPeer("@huggingface/hub", () => import("@huggingface/hub"));
        await fs.promises.mkdir(finalLocalDir, { recursive: true });

        try {
            const listParams: HubListFilesParams = { repo: repoId, recursive: true };
            if (revision) listParams.revision = revision;
            if (accessToken) listParams.accessToken = accessToken;

            for await (const entry of hub.listFiles(listParams)) {
                if (entry.type !== "file") continue;
                const basename = path.basename(entry.path);
                if (allowFilePatterns && allowFilePatterns.length > 0 && !matchesAny(basename, allowFilePatterns)) {
                    continue;
                }
                if (matchesAny(basename, finalIgnorePatterns)) {
                    continue;
                }

                const dlParams: HubDownloadFileParams = { repo: repoId, path: entry.path };
                if (revision) dlParams.revision = revision;
                if (accessToken) dlParams.accessToken = accessToken;
                const res = await hub.downloadFile(dlParams);
                if (!res) continue;
                const outPath = PathValidator.validateFilePath(entry.path, finalLocalDir);
                await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
                await fs.promises.writeFile(outPath, Buffer.from(await res.arrayBuffer()));
            }

            return await this.scanFolder({
                modelName: modelName || repoId,
                modelVersion: revision || "1",
                path: finalLocalDir,
                ...(allowFilePatterns ? { allowFilePatterns } : {}),
                ...(ignoreFilePatterns ? { ignoreFilePatterns } : {}),
                waitForResults,
                requestSource,
                origin: "Hugging Face",
            });
        } finally {
            if (isTempDir) {
                cleanupTempDir(finalLocalDir);
            }
        }
    }

    private async startUpload(
        modelName: string,
        modelVersion: string,
        requestSource: HiddenLayerApi.ScanJobRequestSource,
        origin: string,
    ): Promise<string> {
        const { scan_id: scanId } = await this.client.scans.upload.start({
            model_name: modelName,
            model_version: modelVersion,
            requesting_entity: "hiddenlayer-typescript-sdk",
            request_source: requestSource,
            origin: origin,
        });
        if (!scanId) {
            throw new Error("scan_id must have a value");
        }
        return scanId;
    }

    private async completeUpload(scanId: string, waitForResults: boolean): Promise<ScanReport> {
        await this.client.scans.upload.completeAll({ scan_id: scanId });
        if (waitForResults) {
            return await waitForScanResults(this.client, scanId);
        }
        return await getScanResults(this.client, scanId);
    }

    /**
     * Upload a single file using multipart upload.
     */
    private async scanFileInternal(scanId: string, filePath: string): Promise<void> {
        const filesize = fs.statSync(filePath).size;

        const baseFileName = path.basename(filePath);
        const sanitizedFileName = baseFileName.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 255) || "file";
        const upload = await this.client.scans.upload.file.add({
            scan_id: scanId,
            "file-name": sanitizedFileName,
            "file-content-length": filesize,
        });

        const fileHandle = await fs.promises.open(filePath, "r");
        try {
            for (const part of upload.parts) {
                if (part.start_offset == null) {
                    throw new Error("part must have a start_offset");
                }
                if (!part.upload_url) {
                    throw new Error("part.upload_url must not be null");
                }

                const span = part.end_offset != null ? part.end_offset - part.start_offset : 0;
                const buffer = Buffer.alloc(span || filesize - part.start_offset);
                const { bytesRead } = await fileHandle.read(buffer, 0, buffer.length, part.start_offset);

                // Presigned storage URL: uploaded with plain fetch, never through the API client.
                const response = await fetch(part.upload_url, {
                    method: "PUT",
                    body: buffer.subarray(0, bytesRead),
                    headers: { "Content-Type": "application/octet-stream" },
                });
                if (!response.ok) {
                    throw new Error(`Failed to upload part: ${response.statusText}`);
                }
            }
        } finally {
            await fileHandle.close();
        }

        await this.client.scans.upload.file.complete({ scan_id: scanId, file_id: upload.upload_id });
    }
}

function errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

function cleanupTempFile(filePath: string): void {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch {
        // Best-effort cleanup; ignore errors
    }
}

function cleanupTempDir(dirPath: string): void {
    try {
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
        }
    } catch {
        // Best-effort cleanup; ignore errors
    }
}
