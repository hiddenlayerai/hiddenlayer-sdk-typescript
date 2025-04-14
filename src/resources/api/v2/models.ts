// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Models extends APIResource {
  /**
   * Get Model
   */
  retrieve(modelID: string, options?: RequestOptions): APIPromise<ModelRetrieveResponse> {
    return this._client.get(path`/api/v2/models/${modelID}`, options);
  }

  /**
   * Delete Adhoc Model
   */
  delete(modelID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v2/models/${modelID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ModelRetrieveResponse {
  name: string;

  source: string;

  model_id?: string;

  tenant_id?: string;

  versions?: Array<ModelRetrieveResponse.Version>;
}

export namespace ModelRetrieveResponse {
  export interface Version {
    version: string;

    locations?: Record<string, unknown>;

    model_version_id?: string;

    multi_file?: boolean;

    retrievable?: boolean;

    tags?: Record<string, unknown>;
  }
}

export declare namespace Models {
  export { type ModelRetrieveResponse as ModelRetrieveResponse };
}
