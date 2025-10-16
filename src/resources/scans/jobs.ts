// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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
   * const job = await client.scans.jobs.retrieve(
   *   '00000000-0000-0000-0000-000000000000',
   * );
   * ```
   */
  retrieve(
    scanID: string,
    params: JobRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<JobRetrieveResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...query } = params ?? {};
    return this._client.get(path`/scan/v3/results/${scanID}`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get scan results (Summaries)
   *
   * @example
   * ```ts
   * const jobs = await client.scans.jobs.list();
   * ```
   */
  list(params: JobListParams | null | undefined = {}, options?: RequestOptions): APIPromise<JobListResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...query } = params ?? {};
    return this._client.get('/scan/v3/results', {
      query,
      ...options,
      headers: buildHeaders([
        {
          Accept: 'application/json; charset=utf-8',
          ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined),
        },
        options?.headers,
      ]),
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
     * Specifies what to scan. Must provide at least one of: file_location,
     * provider_model, or both.
     */
    scan_target?: Inventory.ScanTarget;
  }

  export namespace Inventory {
    /**
     * Specifies what to scan. Must provide at least one of: file_location,
     * provider_model, or both.
     */
    export interface ScanTarget {
      /**
       * URL or path to the model files
       */
      file_location?: string;

      provider_model?: ScanTarget.ProviderModel;
    }

    export namespace ScanTarget {
      export interface ProviderModel {
        /**
         * The provider's unique identifier for the model. Examples:
         *
         * - AWS Bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0"
         * - Azure AI Foundry: "Claude-3-5-Sonnet"
         */
        model_id: string;

        provider: 'AWS_BEDROCK' | 'AZURE_AI_FOUNDRY' | 'AWS_SAGEMAKER';

        /**
         * Optional full ARN or resource identifier for the model. Used for provisioned
         * models, custom deployments, or cross-account access.
         */
        model_arn?: string;
      }
    }
  }
}

/**
 * A scan report with all of its details.
 */
export interface JobRetrieveResponse {
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

  inventory: JobRetrieveResponse.Inventory;

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

  summary: JobRetrieveResponse.Summary;

  /**
   * scanner version
   */
  version: string;

  /**
   * version of the scan report schema format
   */
  $schema_version?: string;

  compliance?: JobRetrieveResponse.Compliance;

  /**
   * @deprecated list of detection categories found; use
   * `.summary.detection_categories` instead
   */
  detection_categories?: Array<string>;

  /**
   * time the scan ended
   */
  end_time?: string;

  file_results?: Array<JobRetrieveResponse.FileResult>;

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

export namespace JobRetrieveResponse {
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

    /**
     * Identifies the system that requested the scan
     */
    request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery';

    /**
     * Entity that requested the scan
     */
    requesting_entity?: string;
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

  export interface FileResult {
    details: FileResult.Details;

    detections: Array<FileResult.Detection>;

    /**
     * time the scan ended
     */
    end_time: string;

    /**
     * unique ID of the file
     */
    file_instance_id: string;

    /**
     * full file path
     */
    file_location: string;

    /**
     * time the scan was seen at
     */
    seen: string;

    /**
     * time the scan started
     */
    start_time: string;

    /**
     * status of the scan
     */
    status: 'skipped' | 'pending' | 'running' | 'done' | 'failed' | 'canceled';

    /**
     * Error messages returned by the scanner
     */
    file_error?: Array<string>;
  }

  export namespace FileResult {
    export interface Details {
      /**
       * estimated time to scan the file
       */
      estimated_time: string;

      /**
       * type of the file
       */
      file_type: string;

      /**
       * hexadecimal sha256 hash of file
       */
      sha256: string;

      /**
       * size of the file in human readable format
       */
      file_size?: string;

      /**
       * size of the file in bytes
       */
      file_size_bytes?: number;

      file_type_details?:
        | Details.GgufFileAttributes
        | Details.KerasFileAttributes
        | Details.NumpyFileAttributes
        | Details.RdsFileAttributes;

      /**
       * hexadecimal md5 hash of file
       */
      md5?: string;

      /**
       * TLSH hash of file
       */
      tlsh?: string;
    }

    export namespace Details {
      export interface GgufFileAttributes {
        subtype: Array<string>;
      }

      export interface KerasFileAttributes {
        pickle_modules: Array<string>;

        subtype: Array<string>;

        keras_class_name?: string;

        keras_date_saved_at?: string;

        keras_module?: string;

        /**
         * version of the Keras file
         */
        keras_version?: string;
      }

      export interface NumpyFileAttributes {
        numpy_arrays: string;

        numpy_shape: Array<string>;

        subtype: Array<string>;
      }

      export interface RdsFileAttributes {
        /**
         * encoding of the RDS file
         */
        rds_encoding: string;

        /**
         * minimum reader version for the RDS file
         */
        rds_min_reader_version: string;

        /**
         * version of the RDS file
         */
        rds_version: string;

        /**
         * version of the RDS writer
         */
        rds_writer_version: string;

        subtype: Array<string>;
      }
    }

    export interface Detection {
      /**
       * Vulnerability category for the detection
       */
      category: string;

      cve: Array<string>;

      cwe: string;

      /**
       * CWE URL for the detection
       */
      cwe_href: string;

      /**
       * detection description
       */
      description: string;

      /**
       * unique identifier for the detection
       */
      detection_id: string;

      /**
       * detection impact
       */
      impact: string;

      /**
       * detection likelihood
       */
      likelihood: string;

      mitre_atlas: Array<Detection.MitreAtlas>;

      owasp: Array<string>;

      /**
       * detection risk
       */
      risk: 'MALICIOUS' | 'SUSPICIOUS';

      /**
       * unique identifier for the rule that sourced the detection
       */
      rule_id: string;

      /**
       * The severity of the detection.
       */
      severity: 'critical' | 'high' | 'medium' | 'low';

      rule_details?: Array<Detection.RuleDetail>;

      /**
       * @deprecated Hiddenlayer Technical Blog URL for the detection
       */
      technical_blog_href?: string;

      /**
       * Hiddenlayer Technical Blog URLs for the detection
       */
      technical_blog_hrefs?: Array<string>;
    }

    export namespace Detection {
      export interface MitreAtlas {
        /**
         * MITRE Atlas Tactic
         */
        tactic?: string;

        /**
         * MITRE Atlas Technique
         */
        technique?: string;
      }

      export interface RuleDetail {
        /**
         * description of the deprecation
         */
        description?: string;

        /**
         * status
         */
        status?: 'created' | 'deprecated' | 'updated' | 'superseded';

        /**
         * date-time when the details entry was created
         */
        status_at?: string;
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

      /**
       * Identifies the system that requested the scan
       */
      request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery';

      /**
       * Entity that requested the scan
       */
      requesting_entity?: string;
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
   * Query param: Filter file_results to only those that have detections (and
   * parents)
   */
  has_detections?: boolean;

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export interface JobListParams {
  /**
   * Query param: A comma separated list of rule set evaluation statuses to include
   */
  compliance_status?: Array<'COMPLIANT' | 'NONCOMPLIANT'>;

  /**
   * Query param: filter by a single detection category
   */
  detection_category?: string;

  /**
   * Query param: End Time
   */
  end_time?: string;

  /**
   * Query param: only return latest result per model version
   */
  latest_per_model_version_only?: boolean;

  /**
   * Query param:
   */
  limit?: number;

  /**
   * Query param: Model ID
   */
  model_ids?: Array<string>;

  /**
   * Query param: filter by the model name
   */
  model_name?: JobListParams.ModelName;

  /**
   * Query param: Model Version IDs
   */
  model_version_ids?: Array<string>;

  /**
   * Query param:
   */
  offset?: number;

  /**
   * Query param: Filter by request source using a comma-separated list
   */
  request_source?: Array<'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload' | 'AI Asset Discovery'>;

  /**
   * Query param: filter by version of the scanner
   */
  scanner_version?: string;

  /**
   * Query param: Severities
   */
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'none' | 'unknown' | 'safe';

  /**
   * Query param: allow sorting by model name, status, severity or created at,
   * ascending (+) or the default descending (-)
   */
  sort?: string;

  /**
   * Query param: source of model related to scans
   */
  source?: JobListParams.Source;

  /**
   * Query param: Start Time
   */
  start_time?: string;

  /**
   * Query param: Statuses
   */
  status?: Array<string>;

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
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
     * Specifies what to scan. Must provide at least one of: file_location,
     * provider_model, or both.
     */
    scan_target?: Inventory.ScanTarget;
  }

  export namespace Inventory {
    /**
     * Specifies what to scan. Must provide at least one of: file_location,
     * provider_model, or both.
     */
    export interface ScanTarget {
      /**
       * URL or path to the model files
       */
      file_location?: string;

      provider_model?: ScanTarget.ProviderModel;
    }

    export namespace ScanTarget {
      export interface ProviderModel {
        /**
         * The provider's unique identifier for the model. Examples:
         *
         * - AWS Bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0"
         * - Azure AI Foundry: "Claude-3-5-Sonnet"
         */
        model_id: string;

        provider: 'AWS_BEDROCK' | 'AZURE_AI_FOUNDRY' | 'AWS_SAGEMAKER';

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
    type JobRetrieveResponse as JobRetrieveResponse,
    type JobListResponse as JobListResponse,
    type JobRetrieveParams as JobRetrieveParams,
    type JobListParams as JobListParams,
    type JobRequestParams as JobRequestParams,
  };
}
