import {v4 as uuidv4} from 'uuid';
import { HiddenLayerServiceClient } from '../hiddenlayer/HiddenLayerServiceClient';
import assert from 'assert';
import { ScanDetectionV3SeverityEnum } from '../generated';

describe('Integration test suite in SaaS', () => {
    const client = getSaaSClient();

    runTestSuite(client);
});

describe('Integration test suite in Enterprise', () => {
    const client = getEnterpriseClient();
    
    runTestSuite(client);
});

function runTestSuite(client: HiddenLayerServiceClient) {
    it('should scan a model', async () => await performModelScanTest(client), 20000);
    it('should scan a folder', async () => await performScanFolderTest(client), 20000);
    it('should scan a model with a specified version', async () => await performModelScanTest(client, 123), 20000);
    it('should scan a folder with a specified version', async () => await performScanFolderTest(client, 123), 20000);
}

function getSaaSClient() {
    const clientId = process.env.HL_CLIENT_ID;
    const clientSecret = process.env.HL_CLIENT_SECRET;

    if (!clientId) {
        throw new Error("HL_CLIENT_ID is not set");
    }

    if (!clientSecret) {
        throw new Error("HL_CLIENT_SECRET is not set");
    }

    return HiddenLayerServiceClient.createSaaSClient(clientId, clientSecret);
}

function getEnterpriseClient() {
    return HiddenLayerServiceClient.createEnterpriseClient("http://localhost:8000");
}

async function performModelScanTest(client: HiddenLayerServiceClient, modelVersion?: number): Promise<void> {
    try {
        const modelPath = `./integration-tests/models/malicious_model.pkl`;
        const modelName = `sdk-integration-scan-model-${uuidv4()}`;

        const results = await client.modelScanner.scanFile(modelName, modelPath, modelVersion);

        if (modelVersion) {
            assert(results.inventory.modelVersion === modelVersion.toString());
        }

        assert(results.fileCount === 1);
        assert(results.filesWithDetectionsCount === 1);

        assert(results.fileResults != null && results.fileResults.length > 0)

        const fileResults = results.fileResults[0];
        const detections = fileResults.detections;

        assert(fileResults.details.fileTypeDetails["pickle_modules"].length > 0);
        assert(fileResults.details.fileTypeDetails["pickle_modules"].includes("callable: builtins.exec"));

        assert(detections != null);
        assert(detections[0].severity === ScanDetectionV3SeverityEnum.High);
        assert(detections[0].description.includes('This detection rule was triggered by the presence of a function or library that can be used to execute code'));

        if (client.isSaaS) {
            await client.model.delete(modelName);
        }
    } catch (error) {
        if (!client.isSaaS && error.cause?.code == 'ECONNREFUSED') {
            console.warn("Enterprise client test skipped because the server is not running")
        } else {
            throw error;
        }
    }
}

async function performScanFolderTest(client: HiddenLayerServiceClient, modelVersion?: number): Promise<void> {
    try {
        const folderPath = `./integration-tests/models/`;
        const modelName = `sdk-integration-scan-model-folder-${uuidv4()}`;

        const results = await client.modelScanner.scanFolder(modelName, folderPath, modelVersion);

        if (modelVersion) {
            assert(results.inventory.modelVersion === modelVersion.toString());
        }

        assert(results.fileCount === 3);
        assert(results.filesWithDetectionsCount === 2);

        const safeModel = 'safe_model.pkl';
        const maliciousModel = 'malicious_model.pkl';

        for (const fileResults of results.fileResults) {
            if (fileResults.fileLocation.includes(safeModel)) {
                const detections = fileResults.detections;
                assert(!detections);
                assert(fileResults.details.fileTypeDetails["pickle_modules"].length > 0);
                assert(fileResults.details.fileTypeDetails["pickle_modules"].includes("callable: builtins.print"));
            } else if (fileResults.fileLocation.includes(maliciousModel)) {
                const detections = fileResults.detections;
                assert(fileResults.details.fileTypeDetails["pickle_modules"].length > 0);
                assert(fileResults.details.fileTypeDetails["pickle_modules"].includes("callable: builtins.exec"));

                assert (detections[0].severity === ScanDetectionV3SeverityEnum.High);
                assert(detections[0].description.includes('This detection rule was triggered by the presence of a function or library that can be used to execute code'));
            }
        }
        if (client.isSaaS) {
            await client.model.delete(modelName);
        }
    } catch (error) {
        if (!client.isSaaS && error.cause?.code == 'ECONNREFUSED') {
            console.warn("Enterprise client test skipped because the server is not running")
        } else {
            throw error;
        }
    }
}
