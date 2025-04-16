// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Reports extends APIResource {
  /**
   * Engine Report Endpoint of Model Scan Results
   */
  create(scanID: string, body: ReportCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/scans/v3/reports/${scanID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ReportCreateParams {
  location: string;
}

export declare namespace Reports {
  export { type ReportCreateParams as ReportCreateParams };
}
