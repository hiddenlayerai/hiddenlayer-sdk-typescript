import { HiddenLayerServiceClient } from "../hiddenlayer";

export class Examples {
    async run() {
        const clientId = process.env.HL_CLIENT_ID;
        const clientSecret = process.env.HL_CLIENT_SECRET;
        
        const client = HiddenLayerServiceClient.createSaaSClient(clientId, clientSecret);
        
        // Scan a model saved locally on disk
        const scanResults = await client.modelScanner.scanFile("sdk_example_model", `${__dirname}/models/example_model.xgb`);
        console.log(scanResults);

        /*
        // Scan an S3 model
        const s3ScanResults = await client.modelScanner.scanS3Model("s3-model", "<your_bucket>", "<your_key>");
        console.log(s3ScanResults);

        // Scan an Azure Blob model
        const blobScanResults = await client.modelScanner.scanAzureBlobModel("azure-model", "https://<storageaccountname>.blob.core.windows.net", "<your_container>", "path/to/model.safetensors", "<sas_key - optional>");
        console.log(blobScanResults);
        */
    }
}

const examples = new Examples();
examples.run().then(() => console.log("Done!"));