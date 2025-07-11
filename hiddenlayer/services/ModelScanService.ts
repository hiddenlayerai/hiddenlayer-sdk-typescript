import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

import { GetObjectCommand, S3Client, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { glob } from 'glob';
import { NodeJsClient } from '@smithy/types';

import { BlobServiceClient } from '@azure/storage-blob';

import { SensorApi, Configuration, ModelSupplyChainApi, ScanReportV3, ScanReportV3StatusEnum, Sarif210, ScanJob, ScanJobAccessSourceEnum } from "../../generated";
import { sleep } from './utils';
import { ModelService } from './ModelService';
import "../extensions/ModelSupplyChainApiExtensions";

export class ModelScanService {
    readonly sensorApi: SensorApi;
    readonly modelSupplyChainApi: ModelSupplyChainApi;
    readonly modelService: ModelService;
    readonly isSaaS: boolean;
    readonly maxWaitForScanCreationRetries: number;
    readonly origin: string;
    readonly requestSource: string;

    constructor(isSaaS: boolean, 
        config: Configuration, 
        origin: string = null,
        requestSource: string = null,
        maxWaitForScanCreationRetries: number = 5) {
        this.isSaaS = isSaaS;
        this.sensorApi = new SensorApi(config);
        this.modelService = new ModelService(config);
        this.modelSupplyChainApi = new ModelSupplyChainApi(config);
        this.maxWaitForScanCreationRetries = maxWaitForScanCreationRetries;
        this.origin = origin;
        this.requestSource = requestSource;
    }

    /**
     * Scan a local model file using the HiddenLayer Model Scanner.
     * 
     * @param modelName Name of the model to be shown on the HiddenLayer UI
     * @param modelPath Local path to the model file
     * @param waitForResults True whether to wait for the scan to finish, defaults to true.
     * 
     * @returns ScanReportV3
     */
    async scanFile(modelName: string,
        modelPath: string,
        modelVersion?: string,
        waitForResults: boolean = true) : Promise<ScanReportV3> {

        const scanId = await this.startMultiFileUpload(modelName, modelVersion);
        await this.submitFileToModelScanner(modelPath, scanId);
        await this.completeMultiFileUpload(scanId);
        return await this.getScanResults(scanId, waitForResults);
    }

    async communityScan(modelName: string,
        modelPath: string,
        scanType: ScanJobAccessSourceEnum,
        modelVersion: string = "main",
        waitForResults: boolean = true) : Promise<ScanReportV3> {
        const scanJob: Omit<ScanJob, 'scanId'|'status'> = {
            inventory: {
                modelName: modelName,
                modelVersion: modelVersion,
                requestedScanLocation: modelPath,
                requestingEntity: 'hiddenlayer-typescript-sdk',
                origin: this.origin,
                requestSource: this.requestSource
            },
            access: {
                source: scanType
            }
        }
        const report = await this.modelSupplyChainApi.createScanJob({scanJob: scanJob});
        return await this.getScanResults(report.scanId, waitForResults);
    }

    async scanS3Model(modelName: string,
        bucket: string,
        key: string,
        modelVersion?: string,
        waitForResults: boolean = true): Promise<ScanReportV3> {
        const s3Client = new S3Client() as NodeJsClient<S3Client>;
        const body: GetObjectCommandOutput = await s3Client.send(new GetObjectCommand({
            Bucket: bucket,
            Key: key
        }));
        const tmpFile = `/tmp/${uuidv4()}`;
        const bodyString = await body.Body.transformToByteArray();
        await fs.promises.writeFile(tmpFile, Buffer.from(bodyString));

        return await this.scanFile(modelName, tmpFile, modelVersion, waitForResults);
    }

    async scanAzureBlobModel(modelName: string,
        accountUrl: string,
        container: string,
        blob: string,
        modelVersion?: string,
        sasKey?: string,
        waitForResults: boolean = true): Promise<ScanReportV3> {
        
        let connectionString = `BlobEndpoint=${accountUrl}`
        if (sasKey) {
            connectionString += `;SharedAccessSignature=${sasKey}`;
        };
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(container);
        const blobClient = containerClient.getBlobClient(blob);

        const tmpFile = `/tmp/${uuidv4()}`;
        await blobClient.downloadToFile(tmpFile);

        return await this.scanFile(modelName, tmpFile, modelVersion, waitForResults);
    }

    async scanFolder(modelName: string,
        path: string,
        modelVersion?: string,
        allowFilePatterns: string[] = [],
        ignoreFilePatterns: string[] = [],
        waitForResults: boolean = true): Promise<ScanReportV3> {

        const excludedFileTypes = [
            "**/*.txt",
            "**/*.md",
            "**/*.lock",
            "**/.gitattributes",
            "**/.git",
            "**/.git/*",
            "**/.git/**"
        ]

        ignoreFilePatterns.push(...excludedFileTypes);

        for (let i = 0; i < allowFilePatterns.length; i++) {
            allowFilePatterns[i] = `${path}/**/${allowFilePatterns}`;
        }
        if (allowFilePatterns.length === 0) {
            allowFilePatterns.push(`${path}/**/*`);
        }

        const files = await glob(allowFilePatterns, { ignore: ignoreFilePatterns, nodir: true });

        const scanId = await this.startMultiFileUpload(modelName, modelVersion);
        for (const file of files) {
            await this.submitFileToModelScanner(file, scanId);
        }
        await this.completeMultiFileUpload(scanId);

        return await this.getScanResults(scanId, waitForResults);
    }

    async getScanResults(scanId: string, waitForResults: boolean): Promise<ScanReportV3> {
        let scanReport;
        for (let i = 0; i < this.maxWaitForScanCreationRetries; i++) {
            try{
                scanReport = await this.modelSupplyChainApi.getScanResults({
                    scanId: scanId
                })
                break;
            } catch (error) {
                // 404 means the scan is not found, give it another try unless this was the last try
                if (i < this.maxWaitForScanCreationRetries - 1 && error.response.status === 404) {
                    await sleep(1000);
                    continue;
                } else {
                    throw error;
                }
            }
        }

        const baseDelay = 0.1; // seconds
        let retries = 0;

        if (waitForResults) {
            console.log(`${scanId} scan status: ${scanReport.status}`);
            while (scanReport.status != ScanReportV3StatusEnum.Done 
                && scanReport.status != ScanReportV3StatusEnum.Failed) {
                retries += 1;
                const delay = baseDelay * Math.pow(2, retries) + Math.random(); // exponential back off retry
                await sleep(delay);

                scanReport = await this.modelSupplyChainApi.getScanResults({
                    scanId: scanId
                });
                console.log(`${scanId} scan status: ${scanReport.status}`);
            }
        }

        return scanReport;
    }

    async getSarifResults(scanId: string) : Promise<Sarif210> {
        const scan = await this.getScanResults(scanId, true);
        if (scan == null) return null;

        const sarif = await this.modelSupplyChainApi.modelScanApiV3ScanModelVersionIdGetSarif({scanId: scan.scanId})
        return sarif;
    }

    private async startMultiFileUpload(modelName: string, modelVersion?: string): Promise<string> {
        const multiFileUpload = await this.modelSupplyChainApi.beginMultiFileUpload({
            multiFileUploadRequestV3: { modelVersion: modelVersion, modelName: modelName, requestingEntity: 'hiddenlayer-typescript-sdk' }
        });
        return multiFileUpload.scanId;
    }

    private async completeMultiFileUpload(scanId: string): Promise<void> {
        await this.modelSupplyChainApi.completeMultiFileUpload({scanId: scanId});
    }

    private async submitFileToModelScanner(modelPath: string, scanId: string): Promise<void> {
        const fileStats = await fs.promises.stat(modelPath);
        const fileSize = fileStats.size;

        let file: fs.promises.FileHandle;
        try {
            file = await fs.promises.open(modelPath, 'r');
            const multiPartUpload = await this.modelSupplyChainApi.beginMultipartFileUpload({scanId: scanId, fileName: modelPath, fileContentLength: fileSize});
            for (let i = 0; i < multiPartUpload.parts.length; i++) {
                const part = multiPartUpload.parts[i];
                const readAmount = part.endOffset - part.startOffset;
                const partData = await file.read(Buffer.alloc(readAmount), 0, readAmount, part.startOffset);

                await fetch(part.uploadUrl, {
                    method: 'PUT',
                    body: partData.buffer,
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    }
                });
            }
            await this.modelSupplyChainApi.completeMultipartFileUpload({scanId: scanId, fileId: multiPartUpload.uploadId});
        } finally {
            await file.close();
        }
    }
}
