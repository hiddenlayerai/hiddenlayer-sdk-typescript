// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResultsAPI from './results';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Jobs extends APIResource {
  /**
   * List all Model Scan Jobs
   *
   * @example
   * ```ts
   * const scanJob = await client.scans.jobs.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ScanJob> {
    return this._client.get('/scan/v3/jobs', {
      ...options,
      headers: buildHeaders([{ Accept: 'application/json; charset=utf-8' }, options?.headers]),
    });
  }

  /**
   * Request a Model Scan Job
   *
   * @example
   * ```ts
   * const scanReport = await client.scans.jobs.request({
   *   access: { source: 'HUGGING_FACE' },
   *   inventory: {
   *     model_name: 'some-model',
   *     model_version: 'main',
   *     requested_scan_location: 'owner/repo',
   *     requesting_entity: 'some-user@example.com',
   *   },
   * });
   * ```
   */
  request(body: JobRequestParams, options?: RequestOptions): APIPromise<ResultsAPI.ScanReport> {
    return this._client.post('/scan/v3/jobs', {
      body,
      ...options,
      headers: buildHeaders([
        { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json; charset=utf-8' },
        options?.headers,
      ]),
    });
  }
}

export interface ScanJob {
  access?: ScanJob.Access;

  inventory?: ScanJob.Inventory;

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
  }
}

export interface JobRequestParams {
  access?: JobRequestParams.Access;

  inventory?: JobRequestParams.Inventory;
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
  }
}

export declare namespace Jobs {
  export { type ScanJob as ScanJob, type JobRequestParams as JobRequestParams };
}
