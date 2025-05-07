// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class File extends APIResource {
  /**
   * Add file to V3 Upload
   *
   * @example
   * ```ts
   * const response = await client.scans.upload.file.add(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     'file-content-length': 12345,
   *     'file-name': 'exampleFile.txt',
   *   },
   * );
   * ```
   */
  add(scanID: string, params: FileAddParams, options?: RequestOptions): APIPromise<FileAddResponse> {
    const { 'file-content-length': fileContentLength, 'file-name': fileName } = params;
    return this._client.post(path`/scan/v3/upload/${scanID}/file`, {
      ...options,
      headers: buildHeaders([
        { 'file-content-length': fileContentLength.toString(), 'file-name': fileName },
        options?.headers,
      ]),
    });
  }

  /**
   * Indicate that upload is completed for {file_id}
   *
   * @example
   * ```ts
   * const response = await client.scans.upload.file.complete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { scan_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  complete(
    fileID: string,
    params: FileCompleteParams,
    options?: RequestOptions,
  ): APIPromise<FileCompleteResponse> {
    const { scan_id } = params;
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
}

export interface FileCompleteParams {
  scan_id: string;
}

export declare namespace File {
  export {
    type FileAddResponse as FileAddResponse,
    type FileCompleteResponse as FileCompleteResponse,
    type FileAddParams as FileAddParams,
    type FileCompleteParams as FileCompleteParams,
  };
}
