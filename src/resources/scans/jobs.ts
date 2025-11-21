// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResultsAPI from './results';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Jobs extends APIResource {
  /**
   * Get scan results
   *
   * @example
   * ```ts
   * const scanReport = await client.scans.jobs.retrieve(
   *   '00000000-0000-0000-0000-000000000000',
   * );
   * ```
   */
  retrieve(
    scanID: string,
    query: JobRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ResultsAPI.ScanReport> {
    return this._client.get(path`/scan/v3/results/${scanID}`, { query, ...options });
  }

  /**
   * Get scan results (Summaries)
   *
   * @example
   * ```ts
   * const jobs = await client.scans.jobs.list();
   * ```
   */
  list(query: JobListParams | null | undefined = {}, options?: RequestOptions): APIPromise<JobListResponse> {
    return this._client.get('/scan/v3/results', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/json; charset=utf-8' }, options?.headers]),
    });
  }

  /**
   * Scan a remote model
   *
   * @example
   * ```ts
   * const scanJob = await client.scans.jobs.request({
   *   access: { source: 'HUGGING_FACE' },
   *   inventory: {
   *     model_name: 'some-model',
   *     model_version: '',
   *     requested_scan_location: 'owner/repo',
   *     requesting_entity: 'some-user@example.com',
   *   },
   * });
   * ```
   */
  request(body: JobRequestParams, options?: RequestOptions): APIPromise<ScanJob> {
    return this._client.post('/scan/v3/jobs', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/json; charset=utf-8' }, options?.headers]),
    });
  }
}

export interface ScanJob {
  inventory: ScanJob.Inventory;

  /**
   * unique identifier for the scan
   */
  scan_id?: string;

  /**
   * Status of the scan
   */
  status?: 'pending' | 'running' | 'done' | 'failed' | 'canceled';
}

export namespace ScanJob {
  export interface Inventory {
    /**
     * Name of the model
     */
    model_name: string;

    /**
     * If you do not provide a version, one will be generated for you.
     */
    model_version: string;

    /**
     * Entity that requested the scan
     */
    requesting_entity: string;

    /**
     * Specifies the platform or service where the model originated before being
     * scanned
     */
    origin?: string;

    /**
     * Identifies the system that requested the scan
     */
    request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery';

    /**
     * @deprecated **DEPRECATED**: Use `scan_target` instead. Location of files to be
     * scanned. Maintained for backwards compatibility. If both
     * `requested_scan_location` and `scan_target` are provided, `scan_target` takes
     * precedence.
     */
    requested_scan_location?: string;

    /**
     * Specifies what to scan. Must provide at least one of: deep_scan with file
     * location details, provider_details, or both.
     */
    scan_target?: Inventory.ScanTarget;
  }

  export namespace Inventory {
    /**
     * Specifies what to scan. Must provide at least one of: deep_scan with file
     * location details, provider_details, or both.
     */
    export interface ScanTarget {
      /**
       * region of the discovered asset
       */
      asset_region?: string;

      deep_scan?: ScanTarget.DeepScan;

      provider_details?: ScanTarget.ProviderDetails;
    }

    export namespace ScanTarget {
      export interface DeepScan {
        /**
         * URL or path to the model files
         */
        file_location?: string;

        /**
         * List of specific files to scan
         */
        files?: Array<DeepScan.File>;
      }

      export namespace DeepScan {
        export interface File {
          /**
           * URL or path to the specific file
           */
          file_location: string;

          /**
           * Optional alias for the file name
           */
          file_name_alias?: string;
        }
      }

      export interface ProviderDetails {
        provider: 'AWS_BEDROCK' | 'AZURE_AI_FOUNDRY' | 'AWS_SAGEMAKER';

        /**
         * The provider's unique identifier for the model. Examples:
         *
         * - AWS Bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0"
         * - Azure AI Foundry: "Claude-3-5-Sonnet"
         */
        provider_model_id: string;

        /**
         * Optional full ARN or resource identifier for the model. Used for provisioned
         * models, custom deployments, or cross-account access.
         */
        model_arn?: string;
      }
    }
  }
}

export interface JobListResponse {
  /**
   * List of items. If no matching items are found, then `[]` will be returned.
   */
  items: Array<JobListResponse.Item>;

  /**
   * Maximum number of items to return
   */
  limit: number;

  /**
   * Begin returning the results from this offset
   */
  offset: number;

  /**
   * Total number of items available based on the query criteria.
   */
  total: number;
}

export namespace JobListResponse {
  /**
   * A scan report without any file results.
   */
  export interface Item {
    /**
     * @deprecated number of detections found; use `.summary.detection_count` instead
     */
    detection_count: number;

    /**
     * @deprecated number of files scanned; use `.summary.file_count` instead
     */
    file_count: number;

    /**
     * @deprecated number of files with detections found; use
     * `.summary.files_with_detections_count` instead
     */
    files_with_detections_count: number;

    inventory: Item.Inventory;

    /**
     * unique identifier for the scan
     */
    scan_id: string;

    /**
     * time the scan started
     */
    start_time: string;

    /**
     * status of the scan
     */
    status: 'pending' | 'running' | 'done' | 'failed' | 'canceled';

    summary: Item.Summary;

    /**
     * scanner version
     */
    version: string;

    /**
     * version of the scan report schema format
     */
    $schema_version?: string;

    compliance?: Item.Compliance;

    /**
     * @deprecated list of detection categories found; use
     * `.summary.detection_categories` instead
     */
    detection_categories?: Array<string>;

    /**
     * time the scan ended
     */
    end_time?: string;

    /**
     * if there is model geneaology info available
     */
    has_genealogy?: boolean;

    /**
     * @deprecated The highest severity of any detections on the scan, including
     * "safe". Use `.summary.highest_severity` instead.
     */
    severity?: 'critical' | 'high' | 'medium' | 'low' | 'unknown' | 'safe';
  }

  export namespace Item {
    export interface Inventory {
      /**
       * Unique identifier for the model
       */
      model_id: string;

      /**
       * name of the model
       */
      model_name: string;

      /**
       * unique identifier for the model version
       */
      model_version_id: string;

      /**
       * Location to be scanned
       */
      requested_scan_location: string;

      /**
       * Region of discovered asset
       */
      asset_region?: string;

      /**
       * URL or path to the model files, if available
       */
      file_location?: string;

      /**
       * source (provider) info
       */
      model_source?: string;

      /**
       * version of the model
       */
      model_version?: string;

      /**
       * Specifies the platform or service where the model originated before being
       * scanned
       */
      origin?: string;

      provider_details?: Inventory.ProviderDetails;

      /**
       * Identifies the system that requested the scan
       */
      request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery';

      /**
       * Entity that requested the scan
       */
      requesting_entity?: string;
    }

    export namespace Inventory {
      export interface ProviderDetails {
        provider: 'AWS_BEDROCK' | 'AZURE_AI_FOUNDRY' | 'AWS_SAGEMAKER';

        /**
         * The provider's unique identifier for the model. Examples:
         *
         * - AWS Bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0"
         * - Azure AI Foundry: "Claude-3-5-Sonnet"
         */
        provider_model_id: string;

        /**
         * Optional full ARN or resource identifier for the model. Used for provisioned
         * models, custom deployments, or cross-account access.
         */
        model_arn?: string;
      }
    }

    export interface Summary {
      /**
       * list of unique detection categories found
       */
      detection_categories?: Array<string>;

      /**
       * total number of detections found
       */
      detection_count?: number;

      /**
       * total number of files scanned
       */
      file_count?: number;

      /**
       * number of files that failed during scanning
       */
      files_failed_to_scan?: number;

      /**
       * number of files that contain detections
       */
      files_with_detections_count?: number;

      /**
       * The highest severity of any detections on the scan.
       */
      highest_severity?: 'critical' | 'high' | 'medium' | 'low' | 'none' | 'unknown';

      /**
       * @deprecated The highest severity of any detections on the scan, including
       * "safe". Use `.summary.highest_severity` instead.
       */
      severity?: 'critical' | 'high' | 'medium' | 'low' | 'unknown' | 'safe';

      /**
       * number of files with unknown file type
       */
      unknown_files?: number;
    }

    export interface Compliance {
      /**
       * The datetime when the rule set was evaluated against the scan result
       */
      evaluated_at?: string;

      /**
       * A list of non-default rule sets that were used when evaluating the scan result
       */
      rule_set_ids?: Array<string>;

      status?: 'COMPLIANT' | 'NONCOMPLIANT';
    }
  }
}

export interface JobRetrieveParams {
  /**
   * Filter file_results to only those that have detections (and parents)
   */
  has_detections?: boolean;
}

export interface JobListParams {
  /**
   * A comma separated list of rule set evaluation statuses to include
   */
  compliance_status?: Array<'COMPLIANT' | 'NONCOMPLIANT'>;

  /**
   * When true, returns only scans that with files. When false, returns only scans
   * without files. When not provided, returns all scans.
   */
  deep_scan?: boolean;

  /**
   * filter by a single detection category
   */
  detection_category?: string;

  /**
   * End Time
   */
  end_time?: string;

  /**
   * only return latest result per model version
   */
  latest_per_model_version_only?: boolean;

  limit?: number;

  /**
   * Model ID
   */
  model_ids?: Array<string>;

  /**
   * filter by the model name
   */
  model_name?: JobListParams.ModelName;

  /**
   * Model Version IDs
   */
  model_version_ids?: Array<string>;

  offset?: number;

  /**
   * Filter by model provider name
   */
  provider?: Array<string>;

  /**
   * Filter by region of the discovered asset
   */
  region?: Array<string>;

  /**
   * Filter by request source using a comma-separated list
   */
  request_source?: Array<'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery'>;

  /**
   * filter by version of the scanner
   */
  scanner_version?: string;

  /**
   * Severities
   */
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'none' | 'unknown' | 'safe';

  /**
   * allow sorting by model name, status, severity, scan start time, asset region, or
   * model provider ascending (+) or the default descending (-)
   */
  sort?: string;

  /**
   * source of model related to scans
   */
  source?: JobListParams.Source;

  /**
   * Start Time
   */
  start_time?: string;

  /**
   * Statuses
   */
  status?: Array<string>;
}

export namespace JobListParams {
  /**
   * filter by the model name
   */
  export interface ModelName {
    contains?: string;

    eq?: string;
  }

  /**
   * source of model related to scans
   */
  export interface Source {
    eq?: 'adhoc';
  }
}

export interface JobRequestParams {
  /**
   * Access method for the location of files associated with the scan
   */
  access: JobRequestParams.Access;

  inventory: JobRequestParams.Inventory;
}

export namespace JobRequestParams {
  /**
   * Access method for the location of files associated with the scan
   */
  export interface Access {
    source?:
      | 'LOCAL'
      | 'AWS_PRESIGNED'
      | 'AWS_IAM_ROLE'
      | 'AZURE_BLOB_SAS'
      | 'AZURE_BLOB_AD'
      | 'GOOGLE_SIGNED'
      | 'GOOGLE_OAUTH'
      | 'HUGGING_FACE'
      | 'NONE';
  }

  export interface Inventory {
    /**
     * Name of the model
     */
    model_name: string;

    /**
     * If you do not provide a version, one will be generated for you.
     */
    model_version: string;

    /**
     * Entity that requested the scan
     */
    requesting_entity: string;

    /**
     * Specifies the platform or service where the model originated before being
     * scanned
     */
    origin?: string;

    /**
     * Identifies the system that requested the scan
     */
    request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery';

    /**
     * @deprecated **DEPRECATED**: Use `scan_target` instead. Location of files to be
     * scanned. Maintained for backwards compatibility. If both
     * `requested_scan_location` and `scan_target` are provided, `scan_target` takes
     * precedence.
     */
    requested_scan_location?: string;

    /**
     * Specifies what to scan. Must provide at least one of: deep_scan with file
     * location details, provider_details, or both.
     */
    scan_target?: Inventory.ScanTarget;
  }

  export namespace Inventory {
    /**
     * Specifies what to scan. Must provide at least one of: deep_scan with file
     * location details, provider_details, or both.
     */
    export interface ScanTarget {
      /**
       * region of the discovered asset
       */
      asset_region?: string;

      deep_scan?: ScanTarget.DeepScan;

      provider_details?: ScanTarget.ProviderDetails;
    }

    export namespace ScanTarget {
      export interface DeepScan {
        /**
         * URL or path to the model files
         */
        file_location?: string;

        /**
         * List of specific files to scan
         */
        files?: Array<DeepScan.File>;
      }

      export namespace DeepScan {
        export interface File {
          /**
           * URL or path to the specific file
           */
          file_location: string;

          /**
           * Optional alias for the file name
           */
          file_name_alias?: string;
        }
      }

      export interface ProviderDetails {
        provider: 'AWS_BEDROCK' | 'AZURE_AI_FOUNDRY' | 'AWS_SAGEMAKER';

        /**
         * The provider's unique identifier for the model. Examples:
         *
         * - AWS Bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0"
         * - Azure AI Foundry: "Claude-3-5-Sonnet"
         */
        provider_model_id: string;

        /**
         * Optional full ARN or resource identifier for the model. Used for provisioned
         * models, custom deployments, or cross-account access.
         */
        model_arn?: string;
      }
    }
  }
}

export declare namespace Jobs {
  export {
    type ScanJob as ScanJob,
    type JobListResponse as JobListResponse,
    type JobRetrieveParams as JobRetrieveParams,
    type JobListParams as JobListParams,
    type JobRequestParams as JobRequestParams,
  };
}
