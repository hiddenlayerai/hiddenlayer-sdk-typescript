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
    query: JobRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ResultsAPI.ScanReport> {
    return this._client.get(path`/scan/v3/results/${scanID}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/json; charset=utf-8' }, options?.headers]),
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
  list(query: JobListParams | null | undefined = {}, options?: RequestOptions): APIPromise<JobListResponse> {
    return this._client.get('/scan/v3/results', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/json; charset=utf-8' }, options?.headers]),
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
   * Filter file_results to only those that have detections (and parents)
   */
  has_detections?: boolean;
}

export interface JobListParams {
  /**
   * filter by a single detection category
   */
  detection_category?: string;

  /**
   * End Time
   */
  end_time?: string;

  /**
   * only return latest result per model version
   */
  latest_per_model_version_only?: boolean;

  limit?: number;

  /**
   * Model ID
   */
  model_ids?: Array<string>;

  /**
   * filter by the model name
   */
  model_name?: JobListParams.ModelName;

  /**
   * Model Version IDs
   */
  model_version_ids?: Array<string>;

  offset?: number;

  /**
   * filter by version of the scanner
   */
  scanner_version?: string;

  /**
   * Severities
   */
  severity?: Array<string>;

  /**
   * allow sorting by model name, status, severity or created at, ascending (+) or
   * the default descending (-)
   */
  sort?: string;

  /**
   * source of model related to scans
   */
  source?: JobListParams.Source;

  /**
   * Start Time
   */
  start_time?: string;

  /**
   * Statuses
   */
  status?: Array<string>;
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
