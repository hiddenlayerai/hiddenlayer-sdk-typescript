import {v4 as uuidv4} from 'uuid';
import { HiddenLayerServiceClient } from '../hiddenlayer/HiddenLayerServiceClient';
import assert from 'assert';

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

async function performModelScanTest(client: HiddenLayerServiceClient): Promise<void> {
    try {
        const modelPath = `./integration-tests/models/malicious_model.pkl`;
        const modelName = `sdk-integration-scan-model-${uuidv4()}`;

        const results = await client.modelScanner.scanFile(modelName, modelPath);

        const detections = results.detections;

        console.log(results);

        assert(results.results.pickle_modules.length > 0);
        assert(results.results.pickle_modules.includes("callable: builtins.exec"));

        assert(detections != null);
        assert(detections[0]['severity'] == "MALICIOUS");
        assert(detections[0]["description"].includes('system'));

        if (client.isSaaS) {
            await client.model.delete(modelName);
        }
    } catch (error) {
        if (!client.isSaaS && error.cause?.code == 'ECONNREFUSED') {
            console.warn("Enterprise client test skipped because the server is not running")
        } else {
            console.warn(JSON.stringify(client))
            throw error;
        }
    }
}
