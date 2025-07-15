// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { OffsetPage, type OffsetPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

export class Cards extends APIResource {
  /**
   * List Model Cards
   */
  list(
    query: CardListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CardListResponsesOffsetPage, CardListResponse> {
    return this._client.getAPIList('/models/v4/cards', OffsetPage<CardListResponse>, { query, ...options });
  }
}

export type CardListResponsesOffsetPage = OffsetPage<CardListResponse>;

export interface CardListResponse {
  /**
   * Unix Nano Epoch Timestamp
   */
  created_at: number;

  model_id: string;

  plaintext_name: string;

  source: string;

  active_version_count?: number;

  attack_monitoring_threat_level?: 'safe' | 'unsafe' | 'suspicious' | 'not available';

  /**
   * A value of `true` indicates that one or more versions of this model have
   * associated model genealogy information.
   */
  has_genealogy?: boolean;

  model_scan_threat_level?: 'safe' | 'unsafe' | 'suspicious' | 'not available';

  security_posture?: CardListResponse.SecurityPosture;

  tags?: { [key: string]: unknown };
}

export namespace CardListResponse {
  export interface SecurityPosture {
    attack_monitoring?: boolean;

    model_scan?: boolean;
  }
}

export interface CardListParams extends OffsetPageParams {
  aidr_severity?: Array<'SAFE' | 'UNSAFE' | 'SUSPICIOUS'>;

  /**
   * filter by aidr enabled
   */
  aidr_status?: 'ENABLED' | 'DISABLED' | 'ANY';

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
  export {
    type CardListResponse as CardListResponse,
    type CardListResponsesOffsetPage as CardListResponsesOffsetPage,
    type CardListParams as CardListParams,
  };
}
