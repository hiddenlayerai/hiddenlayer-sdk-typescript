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
   *
   * @example
   * ```ts
   * const model = await client.models.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     'X-Correlation-Id':
   *       '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  retrieve(
    modelID: string,
    params: ModelRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ModelRetrieveResponse> {
    const { 'X-Correlation-Id': xCorrelationID } = params;
    return this._client.get(path`/api/v2/models/${modelID}`, {
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }

  /**
   * Delete Adhoc Model
   *
   * @example
   * ```ts
   * await client.models.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     'X-Correlation-Id':
   *       '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  delete(modelID: string, params: ModelDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'X-Correlation-Id': xCorrelationID } = params;
    return this._client.delete(path`/api/v2/models/${modelID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*', 'X-Correlation-Id': xCorrelationID }, options?.headers]),
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

export interface ModelRetrieveParams {
  /**
   * The unique identifier for the request.
   */
  'X-Correlation-Id': string;
}

export interface ModelDeleteParams {
  /**
   * The unique identifier for the request.
   */
  'X-Correlation-Id': string;
}

Models.Cards = Cards;

export declare namespace Models {
  export {
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelRetrieveParams as ModelRetrieveParams,
    type ModelDeleteParams as ModelDeleteParams,
  };

  export { Cards as Cards, type CardListResponse as CardListResponse, type CardListParams as CardListParams };
}
