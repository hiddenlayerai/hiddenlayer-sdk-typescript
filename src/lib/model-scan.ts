/**
 * Model scanning functionality for Hidden Layer SDK.
 *
 * This module provides the model scanning methods that were available in the old SDK,
 * including scanFile and scanFolder methods with multipart upload functionality.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PathValidator } from '../internal/utils/path-validator';
import { minimatch } from 'minimatch';
import type { HiddenLayer } from '../client';
import type { ScanReport } from '../resources/scans/results';
import { getScanResults, waitForScanResults } from './scan-utils';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { BlobServiceClient } from '@azure/storage-blob';
import { listFiles, downloadFile } from '@huggingface/hub';

// Exclude patterns
const EXCLUDE_FILE_TYPES = [
  '*.txt',
  '*.md',
  '*.lock',
  '.gitattributes',
  '.git',
  '.git/*',
  '*/.git',
  '**/.git/**',
];

type HubListFilesParams = {
  repo: string;
  recursive?: boolean;
  revision?: string;
  accessToken?: string;
};

type HubDownloadFileParams = {
  repo: string;
  path: string;
  revision?: string;
  accessToken?: string;
};

export interface ScanFileOptions {
  modelName: string;
  modelPath: string;
  modelVersion?: string;
  waitForResults?: boolean;
  requestSource?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
  origin?: string;
}

export interface ScanFolderOptions {
  modelName: string;
  path: string;
  modelVersion?: string;
  allowFilePatterns?: string[];
  ignoreFilePatterns?: string[];
  waitForResults?: boolean;
  requestSource?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
  origin?: string;
}

export interface ScanS3ModelOptions {
  modelName: string;
  bucket: string;
  key: string;
  modelVersion?: string;
  s3Client?: S3Client;
  waitForResults?: boolean;
  requestSource?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
}

export interface ScanAzureBlobModelOptions {
  modelName: string;
  accountUrl: string;
  container: string;
  blob: string;
  modelVersion?: string;
  blobServiceClient?: BlobServiceClient;
  credential?: any;
  waitForResults?: boolean;
  requestSource?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
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
  requestSource?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
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
    const stats = fs.statSync(item);
    if (stats.isDirectory()) {
      continue;
    }

    // Get the basename for pattern matching
    const basename = path.basename(item);

    // Skip if there's an allowlist and path doesn't match any
    if (allowPatterns && allowPatterns.length > 0) {
      if (!allowPatterns.some((pattern) => minimatch(basename, pattern))) {
        continue;
      }
    }

    // Skip if there's a denylist and path matches any
    if (ignorePatterns && ignorePatterns.length > 0) {
      if (ignorePatterns.some((pattern) => minimatch(basename, pattern))) {
        continue;
      }
    }

    yield item;
  }
}

/**
 * Recursively get all files in a directory.
 */
function* getAllFiles(dir: string, excludePatterns: string[] = []): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Check if directory should be excluded
      const shouldExclude = excludePatterns.some((pattern) => {
        // Check against directory name
        if (minimatch(file.name, pattern)) return true;
        // Check against full path for patterns like **/.git/**
        if (minimatch(filePath, pattern)) return true;
        // Check if path contains .git directory
        if (filePath.includes('/.git/') || filePath.endsWith('/.git')) return true;
        return false;
      });

      if (!shouldExclude) {
        yield* getAllFiles(filePath, excludePatterns);
      }
    } else {
      yield filePath;
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
  private readonly client: HiddenLayer;

  constructor(client: HiddenLayer) {
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
      modelVersion = '1',
      waitForResults = true,
      requestSource = 'API Upload',
      origin = '',
    } = options;

    // Start the upload
    const uploadResponse = await this.client.scans.upload.start({
      model_name: modelName,
      model_version: modelVersion,
      requesting_entity: 'hiddenlayer-typescript-sdk',
      request_source: requestSource,
      origin: origin,
    });

    const scanId = uploadResponse.scan_id;
    if (!scanId) {
      throw new Error('scan_id must have a value');
    }

    // Upload the file
    await this.scanFileInternal(scanId, modelPath);

    // Complete the upload
    await this.client.scans.upload.completeAll(scanId);

    if (waitForResults) {
      return await waitForScanResults(this.client, scanId);
    } else {
      return await getScanResults(this.client, scanId);
    }
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
      modelVersion = '1',
      allowFilePatterns,
      ignoreFilePatterns,
      waitForResults = true,
      requestSource = 'API Upload',
      origin = '',
    } = options;

    // Start the upload
    const uploadResponse = await this.client.scans.upload.start({
      model_name: modelName,
      model_version: modelVersion,
      requesting_entity: 'hiddenlayer-typescript-sdk',
      request_source: requestSource,
      origin: origin,
    });

    const scanId = uploadResponse.scan_id;
    if (!scanId) {
      throw new Error('scan_id must have a value');
    }

    // Prepare file patterns
    const finalIgnorePatterns =
      ignoreFilePatterns ? [...EXCLUDE_FILE_TYPES, ...ignoreFilePatterns] : EXCLUDE_FILE_TYPES;

    // Get all files recursively (excluding directories that match patterns)
    const allFiles = getAllFiles(folderPath, finalIgnorePatterns);

    // Filter files
    const files = filterPathObjects(allFiles, allowFilePatterns, finalIgnorePatterns);

    // Upload each file
    for (const file of files) {
      await this.scanFileInternal(scanId, file);
    }

    // Complete the upload
    await this.client.scans.upload.completeAll(scanId);

    if (waitForResults) {
      return await waitForScanResults(this.client, scanId);
    } else {
      return await getScanResults(this.client, scanId);
    }
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
      modelVersion = '1',
      s3Client,
      waitForResults = true,
      requestSource = 'API Upload',
    } = options;

    const client: S3Client = s3Client || new S3Client();
    const tempPath = PathValidator.createSafeTempPath(key);

    try {
      // Download file from S3
      const response = await client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );

      // Save to temp file
      const stream = response.Body as any;
      if (!stream) {
        throw new Error('No response body from S3');
      }

      const writeStream = fs.createWriteStream(tempPath);

      await new Promise((resolve, reject) => {
        stream.pipe(writeStream).on('finish', resolve).on('error', reject);
      });

      return await this.scanFile({
        modelPath: tempPath,
        modelName,
        modelVersion,
        waitForResults,
        requestSource,
        origin: 'S3',
      });
    } catch (e: any) {
      throw new Error(`Couldn't download model s3://${bucket}/${key}: ${e.message}`);
    } finally {
      this.cleanupTempFile(tempPath);
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
   *   credential: '?<sas_key>', // If using a SAS key and not DefaultCredentials
   * });
   * ```
   */
  async scanAzureBlobModel(options: ScanAzureBlobModelOptions): Promise<ScanReport> {
    const {
      modelName,
      accountUrl,
      container,
      blob,
      modelVersion = '1',
      blobServiceClient,
      credential,
      waitForResults = true,
      requestSource = 'API Upload',
    } = options;

    const client: BlobServiceClient = blobServiceClient || new BlobServiceClient(accountUrl, credential);

    const tempPath = PathValidator.createSafeTempPath(blob);

    const containerClient = client.getContainerClient(container);
    const blobClient = containerClient.getBlobClient(blob);

    try {
      await blobClient.downloadToFile(tempPath);

      return await this.scanFile({
        modelPath: tempPath,
        modelName,
        modelVersion,
        waitForResults,
        requestSource,
        origin: 'Azure Blob Storage',
      });
    } catch (e: any) {
      throw new Error(`Couldn't download model ${accountUrl}, ${container}, ${blob}: ${e.message}`);
    } finally {
      this.cleanupTempFile(tempPath);
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
      forceDownload = false,
      hfToken,
      waitForResults = true,
      requestSource = 'API Upload',
    } = options;

    const createdTempDir = !localDir;
    const finalLocalDir = createdTempDir ? PathValidator.createSafeTempDir(repoId) : (localDir as string);
    const finalIgnorePatterns =
      ignoreFilePatterns ? [...EXCLUDE_FILE_TYPES, ...ignoreFilePatterns] : EXCLUDE_FILE_TYPES;

    // Ensure base directory exists
    await fs.promises.mkdir(finalLocalDir, { recursive: true });

    // Download files from the repo into finalLocalDir based on patterns
    const listParams: HubListFilesParams = { repo: repoId, recursive: true };
    if (revision) listParams.revision = revision;
    if (typeof hfToken === 'string' && hfToken) listParams.accessToken = hfToken;

    for await (const entry of listFiles(listParams)) {
      if (entry.type !== 'file') continue;
      const basename = path.basename(entry.path);
      if (allowFilePatterns && allowFilePatterns.length > 0) {
        if (!allowFilePatterns.some((pattern) => minimatch(basename, pattern))) {
          continue;
        }
      }
      if (finalIgnorePatterns && finalIgnorePatterns.length > 0) {
        if (finalIgnorePatterns.some((pattern) => minimatch(basename, pattern))) {
          continue;
        }
      }

      const dlParams: HubDownloadFileParams = { repo: repoId, path: entry.path };
      if (revision) dlParams.revision = revision;
      if (typeof hfToken === 'string' && hfToken) dlParams.accessToken = hfToken;
      const res = await downloadFile(dlParams);
      if (!res) continue;
      const buf = Buffer.from(await (res as any).arrayBuffer());
      const outPath = path.join(finalLocalDir, entry.path);
      await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
      await fs.promises.writeFile(outPath, buf);
    }

    const downloadedPath = finalLocalDir;

    try {
      return await this.scanFolder({
        modelName: modelName || repoId,
        modelVersion: revision || '1',
        path: downloadedPath,
        ...(allowFilePatterns ? { allowFilePatterns } : {}),
        ...(ignoreFilePatterns ? { ignoreFilePatterns } : {}),
        waitForResults,
        requestSource,
        origin: 'Hugging Face',
      });
    } finally {
      if (createdTempDir) {
        this.cleanupTempDir(downloadedPath);
      }
    }
  }

  /**
   * Upload a single file using multipart upload.
   */
  private async scanFileInternal(scanId: string, filePath: string): Promise<void> {
    const stats = fs.statSync(filePath);
    const filesize = stats.size;

    // Initiate multipart upload for this file
    const baseFileName = path.basename(filePath);
    const sanitizedFileName = baseFileName.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 255) || 'file';
    const upload = await this.client.scans.upload.file.add(scanId, {
      'file-name': sanitizedFileName,
      'file-content-length': filesize,
    });

    // Upload each part
    const fileHandle = await fs.promises.open(filePath, 'r');
    try {
      for (const part of upload.parts) {
        if (part.start_offset === null || part.start_offset === undefined) {
          throw new Error('part must have a start_offset');
        }

        const readAmount =
          part.end_offset !== null && part.end_offset !== undefined ?
            part.end_offset - part.start_offset
          : undefined;

        // Read the part data
        const buffer = Buffer.alloc(readAmount || filesize - part.start_offset);
        const { bytesRead } = await fileHandle.read(buffer, 0, buffer.length, part.start_offset);
        const partData = buffer.subarray(0, bytesRead);

        // Upload this part directly to the presigned URL
        if (!part.upload_url) {
          throw new Error('part.upload_url must not be null');
        }

        const response = await fetch(part.upload_url, {
          method: 'PUT',
          body: partData,
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to upload part: ${response.statusText}`);
        }
      }
    } finally {
      await fileHandle.close();
    }

    // Complete the file upload
    await this.client.scans.upload.file.complete(upload.upload_id, { scan_id: scanId });
  }

  private cleanupTempFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch {
      // Best-effort cleanup; ignore errors
    }
  }

  private cleanupTempDir(dirPath: string): void {
    try {
      if (fs.existsSync(dirPath)) {
        // Node 14+ supports rmSync; recursive directory cleanup
        const hasRmSync = (fs as any).rmSync;
        if (hasRmSync) {
          (fs as any).rmSync(dirPath, { recursive: true, force: true });
        } else {
          fs.rmdirSync(dirPath, { recursive: true });
        }
      }
    } catch {
      // Best-effort cleanup; ignore errors
    }
  }
}
