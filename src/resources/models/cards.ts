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
  active_version_count: number;

  attack_monitoring_threat_level: 'safe' | 'unsafe' | 'suspicious' | 'not available';

  /**
   * Unix Nano Epoch Timestamp
   */
  created_at: number;

  /**
   * A value of `true` indicates that one or more versions of this model have
   * associated model genealogy information.
   */
  has_genealogy: boolean;

  model_id: string;

  /**
   * The severity of the model's latest scan
   */
  model_scan_severity: 'not available' | 'critical' | 'high' | 'medium' | 'low' | 'none' | 'unknown';

  /**
   * @deprecated
   */
  model_scan_threat_level: 'safe' | 'unsafe' | 'suspicious' | 'not available';

  plaintext_name: string;

  source: string;

  aidr_threat_level?: 'high' | 'medium' | 'low' | 'none' | 'not available';

  /**
   * The ID of the most recent model scanner scan for this model's latest version.
   * Absent if no scan has been run.
   */
  latest_scan_id?: string;

  /**
   * True if the model's latest scan has an error
   */
  model_scan_has_error?: boolean;

  /**
   * The status of the model's compliance with regard to any policies. A trailing
   * asterisk indicates the model's status has been overridden.
   */
  policy_status?: 'COMPLIANT' | 'COMPLIANT_OVERRIDDEN' | 'NONCOMPLIANT' | 'NONCOMPLIANT_OVERRIDDEN';

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
   * Deprecated - use ModelCardAIDRThreatLevel(aidr_threat_level) instead
   */
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

  modscan_severity?: Array<
    | 'SAFE'
    | 'UNSAFE'
    | 'SUSPICIOUS'
    | 'UNKNOWN'
    | 'ERROR'
    | 'critical'
    | 'high'
    | 'medium'
    | 'low'
    | 'none'
    | 'unknown'
  >;

  modscan_status?: 'ENABLED' | 'DISABLED' | 'ANY';

  policy_status?: Array<'COMPLIANT' | 'NONCOMPLIANT'>;

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
