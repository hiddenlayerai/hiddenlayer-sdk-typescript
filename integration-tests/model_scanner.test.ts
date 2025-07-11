import {v4 as uuidv4} from 'uuid';
import { HiddenLayerServiceClient } from '../hiddenlayer/HiddenLayerServiceClient';
import assert from 'assert';
import { ScanDetectionV3SeverityEnum, ScanJobAccessSourceEnum } from '../generated';

describe('Integration test suite in SaaS', () => {
    const client = getSaaSClient();

    runTestSuite(client);
});

/*
 * Enterprise client tests are skipped. We will bring these back when Enterprise model scanner supports v3 endpoints
 *
describe('Integration test suite in Enterprise', () => {
    const client = getEnterpriseClient();

    runTestSuite(client);
});
 */

function runTestSuite(client: HiddenLayerServiceClient) {
    it('should scan a model', async () => await performModelScanTest(client), 120000);
    it('should scan a folder', async () => await performScanFolderTest(client), 120000);
    it('should scan a model with a specified version', async () => await performModelScanTest(client, "123"), 120000);
    it('should scan a folder with a specified version', async () => await performScanFolderTest(client, "123"), 120000);
    it('should get sarif results for a model', async () => await getSarifResultsTest(client), 120000);
    it('should rescan a model with the same version', async () => await performRescanTest(client), 120000);
    it('should scan a community model', async () => await performCommunityScanTest(client), 120000);
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

/*
function getEnterpriseClient() {
    return HiddenLayerServiceClient.createEnterpriseClient("http://localhost:8000");
}
*/

async function performModelScanTest(client: HiddenLayerServiceClient, modelVersion?: string): Promise<void> {
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
        assert(detections[0].severity === ScanDetectionV3SeverityEnum.Critical);
        assert(detections[0].description.includes('This detection rule was triggered by the presence of a function or library that can be used to execute code'));

        if (client.isSaaS) {
            await client.model.deleteModel(results.inventory.modelId);
        }
    } catch (error) {
        if (!client.isSaaS && error.cause?.code == 'ECONNREFUSED') {
            console.warn("Enterprise client test skipped because the server is not running")
        } else {
            throw error;
        }
    }
}

async function performCommunityScanTest(client: HiddenLayerServiceClient): Promise<void> {
    const modelName = `typescript-sdk-integration-community-scan-model-${uuidv4()}`;
    const communityModel = "https://huggingface.co/ScanMe/Models"
    const results = await client.modelScanner.communityScan(modelName, communityModel, ScanJobAccessSourceEnum.HuggingFace, "main");

    console.log(results);
    assert(results.fileResults != null && results.fileResults.length > 0)
    assert(results.fileResults.length === 8);
    assert(results.fileCount === 12);
    assert(results.filesWithDetectionsCount === 6);

}

async function performScanFolderTest(client: HiddenLayerServiceClient, modelVersion?: string): Promise<void> {
    try {
        const folderPath = `./integration-tests/models/`;
        const modelName = `sdk-integration-scan-model-folder-${uuidv4()}`;

        const results = await client.modelScanner.scanFolder(modelName, folderPath, modelVersion);

        if (modelVersion) {
            assert(results.inventory.modelVersion === modelVersion.toString());
        }

        assert(results.fileCount === 2);
        // v2 scans roll detections up to parent zip, v3 do not. A v2 submission generates a v2 and v3 scan, we don't kow which hits db last
        // hence why we can see either 1 or 2 detections at top level count
        assert([1,2].indexOf(results.filesWithDetectionsCount) > -1);

        const safeModel = 'safe_model.pkl';
        const maliciousModel = 'malicious_model.pkl';
        let safeModelFound = false;
        let maliciousModelFound = false;

        for (const fileResults of results.fileResults) {
            if (fileResults.fileLocation.includes(safeModel)) {
                const detections = fileResults.detections;
                assert(!detections);
                assert(fileResults.details.fileTypeDetails["pickle_modules"].length > 0);
                assert(fileResults.details.fileTypeDetails["pickle_modules"].includes("callable: builtins.print"));
                safeModelFound = true;
            } else if (fileResults.fileLocation.includes(maliciousModel)) {
                const detections = fileResults.detections;
                assert(fileResults.details.fileTypeDetails["pickle_modules"].length > 0);
                assert(fileResults.details.fileTypeDetails["pickle_modules"].includes("callable: builtins.exec"));

                assert (detections[0].severity === ScanDetectionV3SeverityEnum.Critical);
                assert(detections[0].description.includes('This detection rule was triggered by the presence of a function or library that can be used to execute code'));
                maliciousModelFound = true;
            }
        }
        assert(safeModelFound);
        assert(maliciousModelFound);
        if (client.isSaaS) {
            await client.model.deleteModel(results.inventory.modelId);
        }
    } catch (error) {
        if (!client.isSaaS && error.cause?.code == 'ECONNREFUSED') {
            console.warn("Enterprise client test skipped because the server is not running")
        } else {
            throw error;
        }
    }
}

async function performRescanTest(client: HiddenLayerServiceClient): Promise<void>{
    try {
        const modelPath = `./integration-tests/models/malicious_model.pkl`;
        const modelName = `sdk-integration-scan-model-${uuidv4()}`;
        const modelVersion = "456";

        let results = await client.modelScanner.scanFile(modelName, modelPath, modelVersion);
        results = await client.modelScanner.scanFile(modelName, modelPath, modelVersion);

        assert(results.fileCount === 1);
        assert(results.filesWithDetectionsCount === 1);

        assert(results.fileResults != null && results.fileResults.length > 0)

        const fileResults = results.fileResults[0];
        const detections = fileResults.detections;

        assert(fileResults.details.fileTypeDetails["pickle_modules"].length > 0);
        assert(fileResults.details.fileTypeDetails["pickle_modules"].includes("callable: builtins.exec"));

        assert(detections != null);
        assert(detections[0].severity === ScanDetectionV3SeverityEnum.Critical);
        assert(detections[0].description.includes('This detection rule was triggered by the presence of a function or library that can be used to execute code'));

        if (client.isSaaS) {
            await client.model.deleteModel(results.inventory.modelId);
        }
    } catch (error) {
        if (!client.isSaaS && error.cause?.code == 'ECONNREFUSED') {
            console.warn("Enterprise client test skipped because the server is not running")
        } else {
            throw error;
        }
    }
}

async function getSarifResultsTest(client: HiddenLayerServiceClient): Promise<void> {
    try {
        const modelName = `sdk-integration-scan-model-${uuidv4()}`;
        const modelPath = `./integration-tests/models/malicious_model.pkl`;

        const scanResult = await client.modelScanner.scanFile(modelName, modelPath);
        const sarifResults = await client.modelScanner.getSarifResults(scanResult.scanId);

        assert(sarifResults.version === "2.1.0");
        assert(sarifResults.runs.length === 1);
        const run = sarifResults.runs[0];
        assert(run.tool.driver.name === "HiddenLayer Model Scanner");
        assert(run.results.length > 0);
        const runResults = run.results[0];
        assert(runResults.level === "error");
        assert(runResults.ruleId === "PICKLE_0017_202408");
        if (client.isSaaS) {
            await client.model.deleteModel(scanResult.inventory.modelId);
        }
    } catch (error) {
        if (!client.isSaaS && error.cause?.code == 'ECONNREFUSED') {
            console.warn("Enterprise client test skipped because the server is not running")
        } else {
            throw error;
        }
    }
}
