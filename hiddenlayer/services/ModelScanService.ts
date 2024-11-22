import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

import { GetObjectCommand, S3Client, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { glob } from 'glob';
import { NodeJsClient } from '@smithy/types';

import { BlobServiceClient } from '@azure/storage-blob';

import { SensorApi, ModelScanApi, Model, Configuration, ModelSupplyChainApi, ScanReportV3, ScanReportV3StatusEnum } from "../../generated";
import AdmZip from 'adm-zip';
import { sleep } from './utils';
import { ModelService } from './ModelService';
import { EnterpriseModelScanApi } from '../enterprise/EnterpriseModelScanApi';

export class ModelScanService {
    readonly sensorApi: SensorApi;
    readonly modelScanApi : ModelScanApi;
    readonly modelSupplyChainApi: ModelSupplyChainApi;
    readonly modelService: ModelService;
    readonly isSaaS: boolean;

    constructor(isSaaS: boolean, config: Configuration) {
        this.isSaaS = isSaaS;
        if (isSaaS) {
            this.modelScanApi = new ModelScanApi(config);
        } else {
            this.modelScanApi = new EnterpriseModelScanApi(config);
        }
        this.sensorApi = new SensorApi(config);
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
     * @returns ScanResultsV2
     */
    async scanFile(modelName: string,
        modelPath: string,
        waitForResults: boolean = true) : Promise<ScanReportV3> {

        const sensor = await this.submitFileToModelScanner(modelPath, modelName);

        let scanReport = await this.getScanResults(modelName)

        const baseDelay = 0.1; // seconds
        let retries = 0;

        if (waitForResults) {
            console.log(`${modelPath} scan status: ${scanReport.status}`);
            while (scanReport.status != ScanReportV3StatusEnum.Done 
                && scanReport.status != ScanReportV3StatusEnum.Failed) {
                retries += 1;
                const delay = baseDelay * Math.pow(2, retries) + Math.random(); // exponential back off retry
                await sleep(delay);

                scanReport = await this.getScanResults(modelName);
                console.log(`${modelPath} scan status: ${scanReport.status}`);
            }
        }

        return scanReport;
    }

    async scanS3Model(modelName: string,
        bucket: string,
        key: string,
        waitForResults: boolean = true): Promise<ScanReportV3> {
        const s3Client = new S3Client() as NodeJsClient<S3Client>;
        const body: GetObjectCommandOutput = await s3Client.send(new GetObjectCommand({
            Bucket: bucket,
            Key: key
        }));
        const tmpFile = `/tmp/${uuidv4()}`;
        const bodyString = await body.Body.transformToString();
        await fs.promises.writeFile(tmpFile, bodyString);

        return await this.scanFile(modelName, tmpFile, waitForResults);
    }

    async scanAzureBlobModel(modelName: string,
        accountUrl: string,
        container: string,
        blob: string,
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

        return await this.scanFile(modelName, tmpFile, waitForResults);
    }

    async scanFolder(modelName: string,
        path: string,
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

        const zip = new AdmZip();
        for (const file of files) {
            zip.addLocalFile(file);
        }
        zip.writeZip(filename);

        return await this.scanFile(modelName, filename, waitForResults);
    }

    async getScanResults(modelName: string): Promise<ScanReportV3> {
        const response = await this.sensorApi.sensorSorApiV3ModelCardsQueryGet({
            modelNameEq: modelName,
            limit: 1
        })
        const modelId = response.results[0].modelId;

        const scans = await this.modelSupplyChainApi.modelScanApiV3ScanQuery(
            {
                modelIds: [modelId],
                latestPerModelVersionOnly: true
            }
        );
        if (scans.total == 0 || scans.items == null) {
            return null;
        }
        const scan = scans.items[0];
        const scanReport = this.modelSupplyChainApi.modelScanApiV3ScanModelVersionIdGet({
            scanId: scan.scanId
        })
        return scanReport;
    }

    private async submitFileToModelScanner(modelPath: string, modelName: string): Promise<Model> {
        if (this.isSaaS) {
            return await this.submitFileToSaaSModelScanner(modelPath, modelName);
        } else {
            return await this.submitFileToEnterpriseModelScanner(modelPath, modelName);
        }
    }

    private async submitFileToSaaSModelScanner(modelPath: string, modelName: string): Promise<Model> {
        const fileStats = await fs.promises.stat(modelPath);
        const fileSize = fileStats.size;

        const model = await this.modelService.create(modelName);
        const upload = await this.sensorApi.beginMultipartUpload({ xContentLength: fileSize, sensorId: model.sensorId });

        let file: fs.promises.FileHandle;
        try {
            file = await fs.promises.open(modelPath, 'r');
            for (let i = 0; i < upload.parts.length; i++) {
                const part = upload.parts[i];
                const readAmount = part.endOffset - part.startOffset;
                const partData = await file.read(Buffer.alloc(readAmount), 0, readAmount, part.startOffset);

                if (part.uploadUrl) {
                    // When upload URL is provided, this is wher we should upload the part
                    await fetch(part.uploadUrl, {
                        method: 'PUT',
                        body: partData.buffer,
                        headers: {
                            'Content-Type': 'application/octet-stream'
                        }
                    });
                } else {
                    await this.sensorApi.uploadModelPart({ sensorId: model.sensorId, uploadId: upload.uploadId, part: part.partNumber, body: partData.buffer });
                }
            }
        } finally {
            await file.close();
        }

        await this.sensorApi.completeMultipartUploadRaw({ sensorId: model.sensorId, uploadId: upload.uploadId });
        await this.modelScanApi.scanModel({ sensorId: model.sensorId });
        return model;
    }

    private async submitFileToEnterpriseModelScanner(modelPath: string, modelName: string): Promise<Model> {
        const model: Model = {
            sensorId: uuidv4(),
            createdAt: new Date(),
            tenantId: "0000",
            plaintextName: modelName,
            active: true,
            version: 1,
        };

        await this.modelScanApi.scanModel({ sensorId: model.sensorId, scanModelRequest: { location: modelPath } });

        return model;
    }
}
