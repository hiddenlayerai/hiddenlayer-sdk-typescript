/**
 * Community scan functionality for Hidden Layer SDK.
 *
 * This module provides the communityScan method that was available in the old SDK,
 * which combines scan request + polling + results retrieval in a single convenient method.
 */

import type { HiddenLayer } from '../client';
import type { ScanReport } from '../resources/scans/results';
import { getScanResults, waitForScanResults } from './scan-utils';

/**
 * Community scan source constants matching the old SDK.
 */
export const CommunityScanSource = {
  LOCAL: 'LOCAL',
  AWS_PRESIGNED: 'AWS_PRESIGNED',
  AWS_IAM_ROLE: 'AWS_IAM_ROLE',
  AZURE_BLOB_SAS: 'AZURE_BLOB_SAS',
  AZURE_BLOB_AD: 'AZURE_BLOB_AD',
  GOOGLE_SIGNED: 'GOOGLE_SIGNED',
  GOOGLE_OAUTH: 'GOOGLE_OAUTH',
  HUGGING_FACE: 'HUGGING_FACE',
} as const;

export type CommunityScanSourceType = (typeof CommunityScanSource)[keyof typeof CommunityScanSource];

export interface CommunityScanOptions {
  modelName: string;
  modelPath: string;
  modelSource: CommunityScanSourceType | string;
  modelVersion?: string;
  waitForResults?: boolean;
  requestSource?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
  origin?: string;
}

/**
 * Community scanner that provides the communityScan method with polling functionality.
 *
 * This class extends the generated SDK to provide the same functionality as the old SDK's
 * communityScan method, which initiates a scan and optionally waits for results.
 */
export class CommunityScanner {
  private readonly client: HiddenLayer;

  constructor(client: HiddenLayer) {
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
      modelVersion = 'main',
      waitForResults = true,
      requestSource = 'API Upload',
      origin = '',
    } = options;

    // Create the scan job
    const scanJob = await this.client.scans.jobs.request({
      access: {
        source: modelSource as CommunityScanSourceType,
      },
      inventory: {
        model_name: modelName,
        model_version: modelVersion,
        requested_scan_location: modelPath,
        requesting_entity: 'hiddenlayer-typescript-sdk',
        request_source: requestSource,
        origin: origin,
      },
    });

    const scanId = scanJob.scan_id;
    if (!scanId) {
      throw new Error('scan_id must have a value');
    }

    if (waitForResults) {
      return await waitForScanResults(this.client, scanId);
    } else {
      // Return current scan status without waiting
      return await getScanResults(this.client, scanId);
    }
  }
}
