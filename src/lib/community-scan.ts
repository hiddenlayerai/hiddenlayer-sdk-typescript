/**
 * The community scanner: requests a scan of a model the scanner fetches from a remote location, then waits
 * for or reads the scan report.
 */

import type * as HiddenLayerApi from "../api/index.js";
import type { HiddenLayerClient } from "../Client.js";
import { getScanResults, type ScanReport, waitForScanResults } from "./scan-utils.js";

/**
 * Community scan source constants matching the old SDK.
 */
export const CommunityScanSource = {
    LOCAL: "LOCAL",
    AWS_PRESIGNED: "AWS_PRESIGNED",
    AWS_IAM_ROLE: "AWS_IAM_ROLE",
    AZURE_BLOB_SAS: "AZURE_BLOB_SAS",
    AZURE_BLOB_AD: "AZURE_BLOB_AD",
    GOOGLE_SIGNED: "GOOGLE_SIGNED",
    GOOGLE_OAUTH: "GOOGLE_OAUTH",
    HUGGING_FACE: "HUGGING_FACE",
} as const;

export type CommunityScanSourceType = (typeof CommunityScanSource)[keyof typeof CommunityScanSource];

export interface CommunityScanOptions {
    modelName: string;
    modelPath: string;
    modelSource: CommunityScanSourceType | string;
    modelVersion?: string;
    waitForResults?: boolean;
    requestSource?: HiddenLayerApi.ScanJobRequestSource;
    origin?: string;
}

/**
 * Community scanner that provides the communityScan method with polling functionality.
 *
 * This class extends the generated SDK to provide the same functionality as the old SDK's
 * communityScan method, which initiates a scan and optionally waits for results.
 */
export class CommunityScanner {
    private readonly client: HiddenLayerClient;

    constructor(client: HiddenLayerClient) {
        this.client = client;
    }

    /**
     * Scan a model available at a remote location using the HiddenLayer Model Scanner.
     *
     * @param options - The scan options
     * @param options.modelName - Name of the model to be shown on the HiddenLayer UI
     * @param options.modelPath - Path to the model file in the remote location, e.g. a presigned S3 URL
     * @param options.modelSource - Type of remote location where the model is stored
     * @param options.modelVersion - Version of the model to be shown on the HiddenLayer UI (default: "main")
     * @param options.waitForResults - Whether to wait for the scan to finish (default: true)
     * @param options.requestSource - Source that requested the scan (default: "API Upload")
     * @param options.origin - Origin platform where the model came from (default: "")
     * @returns Scan Results
     */
    async communityScan(options: CommunityScanOptions): Promise<ScanReport> {
        const {
            modelName,
            modelPath,
            modelSource,
            modelVersion = "main",
            waitForResults = true,
            requestSource = "API Upload",
            origin = "",
        } = options;

        const scanJob = await this.client.scans.jobs.request({
            access: {
                source: modelSource as HiddenLayerApi.scans.ScanJobRequest.Access.Source,
            },
            inventory: {
                model_name: modelName,
                model_version: modelVersion,
                requested_scan_location: modelPath,
                requesting_entity: "hiddenlayer-typescript-sdk",
                request_source: requestSource,
                origin: origin,
            },
        });

        const scanId = scanJob.scan_id;
        if (!scanId) {
            throw new Error("scan_id must have a value");
        }

        if (waitForResults) {
            return await waitForScanResults(this.client, scanId);
        }
        return await getScanResults(this.client, scanId);
    }
}
