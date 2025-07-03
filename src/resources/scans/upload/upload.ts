// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FileAPI from './file';
import { File, FileAddParams, FileAddResponse, FileCompleteParams, FileCompleteResponse } from './file';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Upload extends APIResource {
  file: FileAPI.File = new FileAPI.File(this._client);

  /**
   * Scan uploaded files
   *
   * @example
   * ```ts
   * const response = await client.scans.upload.completeAll(
   *   '00000000-0000-0000-0000-000000000000',
   *   {
   *     'X-Correlation-Id':
   *       '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  completeAll(
    scanID: string,
    params: UploadCompleteAllParams,
    options?: RequestOptions,
  ): APIPromise<UploadCompleteAllResponse> {
    const { 'X-Correlation-Id': xCorrelationID } = params;
    return this._client.patch(path`/scan/v3/upload/${scanID}`, {
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }

  /**
   * Start a model upload
   *
   * @example
   * ```ts
   * const response = await client.scans.upload.start({
   *   model_name: 'model_name',
   *   model_version: 'model_version',
   *   requesting_entity: 'requesting_entity',
   *   'X-Correlation-Id':
   *     '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  start(params: UploadStartParams, options?: RequestOptions): APIPromise<UploadStartResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...body } = params;
    return this._client.post('/scan/v3/upload', {
      body,
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }
}

export interface UploadCompleteAllResponse {
  /**
   * Request to resource is successful
   */
  scan_id?: string;
}

export interface UploadStartResponse {
  /**
   * Request to resource is successful
   */
  scan_id?: string;
}

export interface UploadCompleteAllParams {
  /**
   * The unique identifier for the request.
   */
  'X-Correlation-Id': string;
}

export interface UploadStartParams {
  /**
   * Body param: Model name
   */
  model_name: string;

  /**
   * Body param: Model version
   */
  model_version: string;

  /**
   * Body param: Requesting entity
   */
  requesting_entity: string;

  /**
   * Header param: The unique identifier for the request.
   */
  'X-Correlation-Id': string;

  /**
   * Body param: Requested location alias
   */
  location_alias?: string;

  /**
   * Body param: Specifies the platform or service where the model originated before
   * being scanned
   */
  origin?: string;

  /**
   * Body param: Identifies the system that requested the scan
   */
  request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';
}

Upload.File = File;

export declare namespace Upload {
  export {
    type UploadCompleteAllResponse as UploadCompleteAllResponse,
    type UploadStartResponse as UploadStartResponse,
    type UploadCompleteAllParams as UploadCompleteAllParams,
    type UploadStartParams as UploadStartParams,
  };

  export {
    File as File,
    type FileAddResponse as FileAddResponse,
    type FileCompleteResponse as FileCompleteResponse,
    type FileAddParams as FileAddParams,
    type FileCompleteParams as FileCompleteParams,
  };
}
