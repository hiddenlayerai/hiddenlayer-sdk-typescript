import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

import { GetObjectCommand, S3Client, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { NodeJsClient } from '@smithy/types';

import { BlobServiceClient } from '@azure/storage-blob';

import { ScanResultsV2, SensorApi, ModelScanApi, ScanResultsV2StatusEnum, Model } from "../../generated";
import { sleep } from './utils';
import { ScanResultsMetadata } from '../models/ScanResultsMetadata';
import { ModelService } from './ModelService';
import { EnterpriseModelScanApi } from '../enterprise/EnterpriseModelScanApi';

export class ModelScanService {
    readonly sensorApi = new SensorApi();
    readonly modelScanApi;
    readonly modelService = new ModelService();
    readonly isSaaS: boolean;

    constructor(isSaaS: boolean) {
        this.isSaaS = isSaaS;
        if (isSaaS) {
            this.modelScanApi = new ModelScanApi();
        } else {
            this.modelScanApi = new EnterpriseModelScanApi();
        }
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
        waitForResults: boolean = true) : Promise<ScanResultsV2 & ScanResultsMetadata> {

        const sensor = await this.submitFileToModelScanner(modelPath, modelName);

        let scanResults = await this.modelScanApi.scanStatus({sensorId: sensor.sensorId});

        const baseDelay = 0.1; // seconds
        let retries = 0;

        if (waitForResults) {
            console.log(`${modelPath} scan status: ${scanResults.status}`);
            while (scanResults.status != ScanResultsV2StatusEnum.Done 
                && scanResults.status != ScanResultsV2StatusEnum.Failed) {
                retries += 1;
                const delay = baseDelay * Math.pow(2, retries) + Math.random(); // exponential back off retry
                await sleep(delay);
                scanResults = await this.modelScanApi.scanStatus({sensorId: sensor.sensorId});
                console.log(`${modelPath} scan status: ${scanResults.status}`);
            }
        }

        return {
            ...scanResults,
            fileName: modelName,
            filePath: modelPath,
            sensorId: sensor.sensorId
        };
    }

    async scanS3Model(modelName: string,
        bucket: string,
        key: string,
        waitForResults: boolean = true): Promise<ScanResultsV2 & ScanResultsMetadata> {
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
        waitForResults: boolean = true): Promise<ScanResultsV2 & ScanResultsMetadata> {
        
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

        await this.sensorApi.completeMultipartUpload({ sensorId: model.sensorId, uploadId: upload.uploadId });
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
