// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { OffsetPage, type OffsetPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Cards extends APIResource {
  /**
   * List Model Cards
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const cardListResponse of client.models.cards.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    params: CardListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CardListResponsesOffsetPage, CardListResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...query } = params ?? {};
    return this._client.getAPIList('/models/v4/cards', OffsetPage<CardListResponse>, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined) },
        options?.headers,
      ]),
    });
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
  /**
   * Query param:
   */
  aidr_severity?: Array<'SAFE' | 'UNSAFE' | 'SUSPICIOUS'>;

  /**
   * Query param: filter by aidr enabled
   */
  aidr_status?: 'ENABLED' | 'DISABLED' | 'ANY';

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

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
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
