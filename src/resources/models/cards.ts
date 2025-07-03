// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Cards extends APIResource {
  /**
   * List Model Cards
   *
   * @example
   * ```ts
   * const cards = await client.models.cards.list({
   *   'X-Correlation-Id':
   *     '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  list(params: CardListParams, options?: RequestOptions): APIPromise<CardListResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...query } = params;
    return this._client.get('/models/v3/cards', {
      query,
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }
}

export interface CardListResponse {
  page_number: number;

  page_size: number;

  results: Array<CardListResponse.Result>;

  total_count: number;
}

export namespace CardListResponse {
  export interface Result {
    /**
     * Unix Nano Epoch Timestamp
     */
    created_at: number;

    model_id: string;

    plaintext_name: string;

    source: string;

    active_versions?: Array<number>;

    attack_monitoring_threat_level?: 'safe' | 'unsafe' | 'suspicious' | 'not available';

    model_scan_threat_level?: 'safe' | 'unsafe' | 'suspicious' | 'not available';

    security_posture?: Result.SecurityPosture;

    tags?: { [key: string]: unknown };
  }

  export namespace Result {
    export interface SecurityPosture {
      attack_monitoring?: boolean;

      model_scan?: boolean;
    }
  }
}

export interface CardListParams {
  /**
   * Header param: The unique identifier for the request.
   */
  'X-Correlation-Id': string;

  /**
   * Query param:
   */
  aidr_severity?: Array<'SAFE' | 'UNSAFE' | 'SUSPICIOUS'>;

  /**
   * Query param: filter by aidr enabled
   */
  aidr_status?: 'ENABLED' | 'DISABLED' | 'ANY';

  /**
   * Query param:
   */
  limit?: number;

  /**
   * Query param: match on models created between dates
   */
  model_created?: CardListParams.ModelCreated;

  /**
   * Query param: substring match on model name
   */
  model_name?: CardListParams.ModelName;

  /**
   * Query param:
   */
  modscan_severity?: Array<'SAFE' | 'UNSAFE' | 'SUSPICIOUS' | 'UNKNOWN' | 'ERROR'>;

  /**
   * Query param:
   */
  modscan_status?: 'ENABLED' | 'DISABLED' | 'ANY';

  /**
   * Query param:
   */
  offset?: number;

  /**
   * Query param:
   */
  provider?: Array<'AZURE' | 'ADHOC'>;

  /**
   * Query param: allow sorting by model name or created at timestamp, ascending (+)
   * or the default descending (-)
   */
  sort?: string;

  /**
   * Query param: substring and full match on model source
   */
  source?: CardListParams.Source;
}

export namespace CardListParams {
  /**
   * match on models created between dates
   */
  export interface ModelCreated {
    gte?: string;

    lte?: string;
  }

  /**
   * substring match on model name
   */
  export interface ModelName {
    contains?: string;

    eq?: string;
  }

  /**
   * substring and full match on model source
   */
  export interface Source {
    contains?: string;

    eq?: string;
  }
}

export declare namespace Cards {
  export { type CardListResponse as CardListResponse, type CardListParams as CardListParams };
}
