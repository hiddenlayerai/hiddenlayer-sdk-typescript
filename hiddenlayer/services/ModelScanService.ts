import fs from 'fs';

import { ScanResultsV2, SensorApi, ModelScanApi, ScanResultsV2StatusEnum } from "../../generated";
import { sleep } from './utils';
import { ScanResultsMetadata } from '../models/ScanResultsMetadata';
import { ModelService } from './ModelService';

export class ModelScanService {
    readonly sensorApi = new SensorApi();
    readonly modelScanApi = new ModelScanApi();
    readonly modelService = new ModelService();

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

        const fileStats = await fs.promises.stat(modelPath);
        const fileSize = fileStats.size;

        const sensor = await this.modelService.create(modelName);
        const upload = await this.sensorApi.beginMultipartUpload({xContentLength: fileSize, sensorId: sensor.sensorId});

        let file: fs.promises.FileHandle;
        try {
            file = await fs.promises.open(modelPath, 'r')
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
                    await this.sensorApi.uploadModelPart({sensorId: sensor.sensorId, uploadId: upload.uploadId, part: part.partNumber, body: partData.buffer});
                }
            }
        } finally {
            await file.close();
        }

        await this.sensorApi.completeMultipartUpload({sensorId: sensor.sensorId, uploadId: upload.uploadId});
        await this.modelScanApi.scanModel({sensorId: sensor.sensorId});

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
}