// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FileAPI from './file';
import { File, FileAddParams, FileAddResponse, FileCompleteParams, FileCompleteResponse } from './file';
import { APIPromise } from '../../../core/api-promise';
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
   * );
   * ```
   */
  completeAll(scanID: string, options?: RequestOptions): APIPromise<UploadCompleteAllResponse> {
    return this._client.patch(path`/scan/v3/upload/${scanID}`, options);
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
   * });
   * ```
   */
  start(body: UploadStartParams, options?: RequestOptions): APIPromise<UploadStartResponse> {
    return this._client.post('/scan/v3/upload', { body, ...options });
  }
}

export interface UploadCompleteAllResponse {
  /**
   * Request to resource is successful
   */
  scan_id: string;
}

export interface UploadStartResponse {
  /**
   * Request to resource is successful
   */
  scan_id: string;
}

export interface UploadStartParams {
  /**
   * Model name
   */
  model_name: string;

  /**
   * Model version
   */
  model_version: string;

  /**
   * Requesting entity
   */
  requesting_entity: string;

  /**
   * Requested location alias
   */
  location_alias?: string;

  /**
   * Specifies the platform or service where the model originated before being
   * scanned
   */
  origin?: string;

  /**
   * Identifies the system that requested the scan
   */
  request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery';
}

Upload.File = File;

export declare namespace Upload {
  export {
    type UploadCompleteAllResponse as UploadCompleteAllResponse,
    type UploadStartResponse as UploadStartResponse,
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
