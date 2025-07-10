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
  aidr_severity?: Array<'SAFE' | 'UNSAFE' | 'SUSPICIOUS'>;

  /**
   * filter by aidr enabled
   */
  aidr_status?: 'ENABLED' | 'DISABLED' | 'ANY';

  limit?: number;

  /**
   * match on models created between dates
   */
  model_created?: CardListParams.ModelCreated;

  /**
   * substring match on model name
   */
  model_name?: CardListParams.ModelName;

  modscan_severity?: Array<'SAFE' | 'UNSAFE' | 'SUSPICIOUS' | 'UNKNOWN' | 'ERROR'>;

  modscan_status?: 'ENABLED' | 'DISABLED' | 'ANY';

  offset?: number;

  provider?: Array<'AZURE' | 'ADHOC'>;

  /**
   * allow sorting by model name or created at timestamp, ascending (+) or the
   * default descending (-)
   */
  sort?: string;

  /**
   * substring and full match on model source
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
