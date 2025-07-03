// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class File extends APIResource {
  /**
   * Upload a model file
   *
   * @example
   * ```ts
   * const response = await client.scans.upload.file.add(
   *   '00000000-0000-0000-0000-000000000000',
   *   {
   *     'file-content-length': 12345,
   *     'file-name': 'exampleFile.txt',
   *     'X-Correlation-Id':
   *       '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  add(scanID: string, params: FileAddParams, options?: RequestOptions): APIPromise<FileAddResponse> {
    const {
      'file-content-length': fileContentLength,
      'file-name': fileName,
      'X-Correlation-Id': xCorrelationID,
    } = params;
    return this._client.post(path`/scan/v3/upload/${scanID}/file`, {
      ...options,
      headers: buildHeaders([
        {
          'file-content-length': fileContentLength.toString(),
          'file-name': fileName,
          'X-Correlation-Id': xCorrelationID,
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Complete a file upload
   *
   * @example
   * ```ts
   * const response = await client.scans.upload.file.complete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     scan_id: '00000000-0000-0000-0000-000000000000',
   *     'X-Correlation-Id':
   *       '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  complete(
    fileID: string,
    params: FileCompleteParams,
    options?: RequestOptions,
  ): APIPromise<FileCompleteResponse> {
    const { scan_id, 'X-Correlation-Id': xCorrelationID } = params;
    return this._client.patch(path`/scan/v3/upload/${scan_id}/file/${fileID}`, {
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }
}

export interface FileAddResponse {
  parts: Array<FileAddResponse.Part>;

  /**
   * UploadId for the current file
   */
  upload_id: string;
}

export namespace FileAddResponse {
  export interface Part {
    end_offset?: number;

    part_number?: number;

    start_offset?: number;

    upload_url?: string;
  }
}

export interface FileCompleteResponse {
  /**
   * Request to resource is successful
   */
  scan_id?: string;
}

export interface FileAddParams {
  /**
   * Added file size in bytes
   */
  'file-content-length': number;

  /**
   * Added file name
   */
  'file-name': string;

  /**
   * The unique identifier for the request.
   */
  'X-Correlation-Id': string;
}

export interface FileCompleteParams {
  /**
   * Path param: A Scan ID that must be present in the request URI
   */
  scan_id: string;

  /**
   * Header param: The unique identifier for the request.
   */
  'X-Correlation-Id': string;
}

export declare namespace File {
  export {
    type FileAddResponse as FileAddResponse,
    type FileCompleteResponse as FileCompleteResponse,
    type FileAddParams as FileAddParams,
    type FileCompleteParams as FileCompleteParams,
  };
}
