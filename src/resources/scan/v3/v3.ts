// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from './jobs';
import { JobRequestParams, Jobs, ScanJob } from './jobs';
import * as ResultsAPI from './results';
import {
  FileScanReport,
  ResultCompletePartParams,
  ResultCompletePartResponse,
  ResultListParams,
  ResultListResponse,
  ResultRetrieveParams,
  ResultStartParams,
  Results,
  ScanReport,
} from './results';
import * as UploadAPI from './upload/upload';
import { Upload, UploadCompleteAllResponse, UploadStartParams, UploadStartResponse } from './upload/upload';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class V3 extends APIResource {
  results: ResultsAPI.Results = new ResultsAPI.Results(this._client);
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
  upload: UploadAPI.Upload = new UploadAPI.Upload(this._client);

  /**
   * Health check endpoint for Model Supply Chain Services
   */
  checkHealth(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/scans/v3/health', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Readiness check endpoint for Model Supply Chain Services
   */
  checkReadiness(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/scans/v3/readiness', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Engine Report Endpoint of Model Scan Results
   */
  createReport(scanID: string, body: V3CreateReportParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/scans/v3/reports/${scanID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Retrieve Model Scan Results
   */
  retrieveResults(
    scanID: string,
    query: V3RetrieveResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/scans/v3/results/${scanID}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/json; charset=utf-8' }, options?.headers]),
    });
  }
}

export type V3RetrieveResultsResponse = unknown;

export interface V3CreateReportParams {
  location: string;
}

export interface V3RetrieveResultsParams {
  /**
   * Cursor value returned from a previous request. Used to fetch the next page of
   * results.
   */
  cursor?: string;

  page_size?: number;
}

V3.Results = Results;
V3.Jobs = Jobs;
V3.Upload = Upload;

export declare namespace V3 {
  export {
    type V3RetrieveResultsResponse as V3RetrieveResultsResponse,
    type V3CreateReportParams as V3CreateReportParams,
    type V3RetrieveResultsParams as V3RetrieveResultsParams,
  };

  export {
    Results as Results,
    type FileScanReport as FileScanReport,
    type ScanReport as ScanReport,
    type ResultListResponse as ResultListResponse,
    type ResultCompletePartResponse as ResultCompletePartResponse,
    type ResultRetrieveParams as ResultRetrieveParams,
    type ResultListParams as ResultListParams,
    type ResultCompletePartParams as ResultCompletePartParams,
    type ResultStartParams as ResultStartParams,
  };

  export { Jobs as Jobs, type ScanJob as ScanJob, type JobRequestParams as JobRequestParams };

  export {
    Upload as Upload,
    type UploadCompleteAllResponse as UploadCompleteAllResponse,
    type UploadStartResponse as UploadStartResponse,
    type UploadStartParams as UploadStartParams,
  };
}
