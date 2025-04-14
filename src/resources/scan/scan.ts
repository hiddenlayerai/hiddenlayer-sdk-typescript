// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V3API from './v3/v3';
import { V3, V3CreateReportParams, V3RetrieveResultsParams, V3RetrieveResultsResponse } from './v3/v3';

export class Scan extends APIResource {
  v3: V3API.V3 = new V3API.V3(this._client);
}

Scan.V3 = V3;

export declare namespace Scan {
  export {
    V3 as V3,
    type V3RetrieveResultsResponse as V3RetrieveResultsResponse,
    type V3CreateReportParams as V3CreateReportParams,
    type V3RetrieveResultsParams as V3RetrieveResultsParams,
  };
}
