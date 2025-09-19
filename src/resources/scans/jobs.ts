// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResultsAPI from './results';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Jobs extends APIResource {
  /**
   * Get scan results
   *
   * @example
   * ```ts
   * const scanReport = await client.scans.jobs.retrieve(
   *   '00000000-0000-0000-0000-000000000000',
   * );
   * ```
   */
  retrieve(
    scanID: string,
    params: JobRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ResultsAPI.ScanReport> {
    const { 'X-Correlation-Id': xCorrelationID, ...query } = params ?? {};
    return this._client.get(path`/scan/v3/results/${scanID}`, {
      query,
      ...options,
      headers: buildHeaders([
        {
          Accept: 'application/json; charset=utf-8',
          ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Get scan results (Summaries)
   *
   * @example
   * ```ts
   * const jobs = await client.scans.jobs.list();
   * ```
   */
  list(params: JobListParams | null | undefined = {}, options?: RequestOptions): APIPromise<JobListResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...query } = params ?? {};
    return this._client.get('/scan/v3/results', {
      query,
      ...options,
      headers: buildHeaders([
        {
          Accept: 'application/json; charset=utf-8',
          ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Scan a remote model
   *
   * @example
   * ```ts
   * const scanJob = await client.scans.jobs.request({
   *   access: { source: 'HUGGING_FACE' },
   *   inventory: {
   *     model_name: 'some-model',
   *     model_version: '',
   *     requested_scan_location: 'owner/repo',
   *     requesting_entity: 'some-user@example.com',
   *   },
   * });
   * ```
   */
  request(body: JobRequestParams, options?: RequestOptions): APIPromise<ScanJob> {
    return this._client.post('/scan/v3/jobs', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/json; charset=utf-8' }, options?.headers]),
    });
  }
}

export interface ScanJob {
  inventory: ScanJob.Inventory;

  /**
   * unique identifier for the scan
   */
  scan_id?: string;

  /**
   * Status of the scan
   */
  status?: 'pending' | 'running' | 'done' | 'failed' | 'canceled';
}

export namespace ScanJob {
  export interface Inventory {
    /**
     * Name of the model
     */
    model_name: string;

    /**
     * If you do not provide a version, one will be generated for you.
     */
    model_version: string;

    /**
     * Location to be scanned
     */
    requested_scan_location: string;

    /**
     * Entity that requested the scan
     */
    requesting_entity: string;

    /**
     * Specifies the platform or service where the model originated before being
     * scanned
     */
    origin?: string;

    /**
     * Identifies the system that requested the scan
     */
    request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
  }
}

export interface JobListResponse {
  /**
   * List of items. If no matching items are found, then `[]` will be returned.
   */
  items: Array<ResultsAPI.ScanReport>;

  /**
   * Maximum number of items to return
   */
  limit: number;

  /**
   * Begin returning the results from this offset
   */
  offset: number;

  /**
   * Total number of items available based on the query criteria.
   */
  total: number;
}

export interface JobRetrieveParams {
  /**
   * Query param: Filter file_results to only those that have detections (and
   * parents)
   */
  has_detections?: boolean;

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export interface JobListParams {
  /**
   * Query param: A comma separated list of rule set evaluation statuses to include
   */
  compliance_status?: Array<'COMPLIANT' | 'NONCOMPLIANT'>;

  /**
   * Query param: filter by a single detection category
   */
  detection_category?: string;

  /**
   * Query param: End Time
   */
  end_time?: string;

  /**
   * Query param: only return latest result per model version
   */
  latest_per_model_version_only?: boolean;

  /**
   * Query param:
   */
  limit?: number;

  /**
   * Query param: Model ID
   */
  model_ids?: Array<string>;

  /**
   * Query param: filter by the model name
   */
  model_name?: JobListParams.ModelName;

  /**
   * Query param: Model Version IDs
   */
  model_version_ids?: Array<string>;

  /**
   * Query param:
   */
  offset?: number;

  /**
   * Query param: Filter by request source using a comma-separated list
   */
  request_source?: Array<'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload'>;

  /**
   * Query param: filter by version of the scanner
   */
  scanner_version?: string;

  /**
   * Query param: Severities
   */
  severity?: Array<string>;

  /**
   * Query param: allow sorting by model name, status, severity or created at,
   * ascending (+) or the default descending (-)
   */
  sort?: string;

  /**
   * Query param: source of model related to scans
   */
  source?: JobListParams.Source;

  /**
   * Query param: Start Time
   */
  start_time?: string;

  /**
   * Query param: Statuses
   */
  status?: Array<string>;

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export namespace JobListParams {
  /**
   * filter by the model name
   */
  export interface ModelName {
    contains?: string;

    eq?: string;
  }

  /**
   * source of model related to scans
   */
  export interface Source {
    eq?: 'adhoc';
  }
}

export interface JobRequestParams {
  access: JobRequestParams.Access;

  inventory: JobRequestParams.Inventory;
}

export namespace JobRequestParams {
  export interface Access {
    source?:
      | 'LOCAL'
      | 'AWS_PRESIGNED'
      | 'AWS_IAM_ROLE'
      | 'AZURE_BLOB_SAS'
      | 'AZURE_BLOB_AD'
      | 'GOOGLE_SIGNED'
      | 'GOOGLE_OAUTH'
      | 'HUGGING_FACE';
  }

  export interface Inventory {
    /**
     * Name of the model
     */
    model_name: string;

    /**
     * If you do not provide a version, one will be generated for you.
     */
    model_version: string;

    /**
     * Location to be scanned
     */
    requested_scan_location: string;

    /**
     * Entity that requested the scan
     */
    requesting_entity: string;

    /**
     * Specifies the platform or service where the model originated before being
     * scanned
     */
    origin?: string;

    /**
     * Identifies the system that requested the scan
     */
    request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
  }
}

export declare namespace Jobs {
  export {
    type ScanJob as ScanJob,
    type JobListResponse as JobListResponse,
    type JobRetrieveParams as JobRetrieveParams,
    type JobListParams as JobListParams,
    type JobRequestParams as JobRequestParams,
  };
}
