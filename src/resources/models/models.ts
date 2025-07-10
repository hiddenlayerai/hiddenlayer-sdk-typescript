// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CardsAPI from './cards';
import { CardListParams, CardListResponse, Cards } from './cards';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Models extends APIResource {
  cards: CardsAPI.Cards = new CardsAPI.Cards(this._client);

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

    deployments?: Array<Version.Deployment>;

    locations?: { [key: string]: unknown };

    model_version_id?: string;

    multi_file?: boolean;

    retrievable?: boolean;

    tags?: { [key: string]: unknown };
  }

  export namespace Version {
    export interface Deployment {
      active?: boolean;

      path?: string;
    }
  }
}

Models.Cards = Cards;

export declare namespace Models {
  export { type ModelRetrieveResponse as ModelRetrieveResponse };

  export { Cards as Cards, type CardListResponse as CardListResponse, type CardListParams as CardListParams };
}
