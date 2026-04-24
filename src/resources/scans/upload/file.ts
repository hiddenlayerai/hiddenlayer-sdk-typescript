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
   *   { 'file-content-length': 12345 },
   * );
   * ```
   */
  add(scanID: string, params: FileAddParams, options?: RequestOptions): APIPromise<FileAddResponse> {
    const { 'file-content-length': fileContentLength, 'file-name': fileName, 'file-name-base64': fileNameBase64 } = params
    return this._client.post(path`/scan/v3/upload/${scanID}/file`, { ...options, headers: buildHeaders([{'file-content-length': fileContentLength.toString(), ...(fileName != null ? { 'file-name': fileName } : undefined), ...(fileNameBase64 != null ? { 'file-name-base64': fileNameBase64 } : undefined)}, options?.headers]) });
  }

  /**
   * Complete a file upload
   *
   * @example
   * ```ts
   * const response = await client.scans.upload.file.complete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { scan_id: '00000000-0000-0000-0000-000000000000' },
   * );
   * ```
   */
  complete(fileID: string, params: FileCompleteParams, options?: RequestOptions): APIPromise<FileCompleteResponse> {
    const { scan_id } = params
    return this._client.patch(path`/scan/v3/upload/${scan_id}/file/${fileID}`, options);
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
  scan_id: string;
}

export interface FileAddParams {
  /**
   * Added file size in bytes
   */
  'file-content-length': number;

  /**
   * File name. One of `file-name` or `file-name-base64` must be provided. When
   * `file-name-base64` is present it takes precedence; otherwise this value is used.
   */
  'file-name'?: string;

  /**
   * UTF-8 friendly base64-encoded file name. Optional; when omitted, the server uses
   * the `file-name` header. One of `file-name` or `file-name-base64` must be
   * provided.
   */
  'file-name-base64'?: string;
}

export interface FileCompleteParams {
  /**
   * A Model Scan ID
   */
  scan_id: string;
}

export declare namespace File {
  export {
    type FileAddResponse as FileAddResponse,
    type FileCompleteResponse as FileCompleteResponse,
    type FileAddParams as FileAddParams,
    type FileCompleteParams as FileCompleteParams
  };
}
