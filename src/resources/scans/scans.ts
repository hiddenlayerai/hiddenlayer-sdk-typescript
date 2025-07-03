// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as JobsAPI from './jobs';
import { JobListResponse, JobRequestParams, Jobs, ScanJob } from './jobs';
import * as ResultsAPI from './results';
import { FileScanReport, Results, ScanReport } from './results';
import * as UploadAPI from './upload/upload';
import {
  Upload,
  UploadCompleteAllParams,
  UploadCompleteAllResponse,
  UploadStartParams,
  UploadStartResponse,
} from './upload/upload';

export class Scans extends APIResource {
  results: ResultsAPI.Results = new ResultsAPI.Results(this._client);
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);
  upload: UploadAPI.Upload = new UploadAPI.Upload(this._client);
}

Scans.Results = Results;
Scans.Jobs = Jobs;
Scans.Upload = Upload;

export declare namespace Scans {
  export { Results as Results, type FileScanReport as FileScanReport, type ScanReport as ScanReport };

  export {
    Jobs as Jobs,
    type ScanJob as ScanJob,
    type JobListResponse as JobListResponse,
    type JobRequestParams as JobRequestParams,
  };

  export {
    Upload as Upload,
    type UploadCompleteAllResponse as UploadCompleteAllResponse,
    type UploadStartResponse as UploadStartResponse,
    type UploadCompleteAllParams as UploadCompleteAllParams,
    type UploadStartParams as UploadStartParams,
  };
}
