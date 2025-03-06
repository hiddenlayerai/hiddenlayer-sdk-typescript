import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

import { GetObjectCommand, S3Client, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { glob } from 'glob';
import { NodeJsClient } from '@smithy/types';

import { BlobServiceClient } from '@azure/storage-blob';

import { SensorApi, Configuration, ModelSupplyChainApi, ScanReportV3, ScanReportV3StatusEnum, Sarif210 } from "../../generated";
import AdmZip from 'adm-zip';
import { sleep } from './utils';
import { ModelService } from './ModelService';
import "../extensions/ModelSupplyChainApiExtensions";

export class ModelScanService {
    readonly sensorApi: SensorApi;
    //readonly modelScanApi : ModelScanApi;
    readonly modelSupplyChainApi: ModelSupplyChainApi;
    readonly modelService: ModelService;
    readonly isSaaS: boolean;

    constructor(isSaaS: boolean, config: Configuration) {
        this.isSaaS = isSaaS;
        this.sensorApi = new SensorApi(config);
        //this.modelScanApi = new ModelScanApi(config);
        this.modelService = new ModelService(config);
        this.modelSupplyChainApi = new ModelSupplyChainApi(config);
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
        const bodyString = await body.Body.transformToString();
        await fs.promises.writeFile(tmpFile, bodyString);

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

        const tmpDirectory = fs.mkdtempSync('/tmp/')
        const filename = `${tmpDirectory}/${uuidv4()}.zip`;

        const files = await glob(allowFilePatterns, { ignore: ignoreFilePatterns, nodir: true });

        const scanId = await this.startMultiFileUpload(modelName, modelVersion);
        for (const file of files) {
            await this.submitFileToModelScanner(file, scanId);
        }
        await this.completeMultiFileUpload(scanId);

        return await this.getScanResults(scanId, waitForResults);
    }

    async getScanResults(scanId: string, waitForResults: boolean): Promise<ScanReportV3> {
        let scanReport = await this.modelSupplyChainApi.getScanResults({
            scanId: scanId
        })

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
