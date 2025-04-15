// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Cards extends APIResource {
  /**
   * List Model Cards
   */
  list(
    query: CardListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CardListResponse> {
    return this._client.get('/models/v3/cards', { query, ...options });
  }
}

export interface CardListResponse {
  page_number: number;

  page_size: number;

  results: Array<CardListResponse.Result>;

  total_count: number;
}

export namespace CardListResponse {
  export interface Result {}
}

export interface CardListParams {
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

export declare namespace Cards {
  export { type CardListResponse as CardListResponse, type CardListParams as CardListParams };
}
