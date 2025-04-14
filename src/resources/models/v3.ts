// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class V3 extends APIResource {
  /**
   * List Model Cards
   */
  listCards(
    query: V3ListCardsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<V3ListCardsResponse> {
    return this._client.get('/models/v3/cards', { query, ...options });
  }
}

export interface V3ListCardsResponse {
  page_number: number;

  page_size: number;

  results: Array<V3ListCardsResponse.Result>;

  total_count: number;
}

export namespace V3ListCardsResponse {
  export interface Result {}
}

export interface V3ListCardsParams {
  limit?: number;

  /**
   * substring match on model name
   */
  'model_name[contains]'?: string;

  /**
   * substring match on model name
   */
  'model_name[eq]'?: string;

  offset?: number;

  /**
   * allow sorting by model name or created at timestamp, ascending (+) or the
   * default descending (-)
   */
  sort?: string;
}

export declare namespace V3 {
  export { type V3ListCardsResponse as V3ListCardsResponse, type V3ListCardsParams as V3ListCardsParams };
}
