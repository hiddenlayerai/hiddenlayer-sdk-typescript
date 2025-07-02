// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Results extends APIResource {
  /**
   * Get Result of a Model Scan
   *
   * @example
   * ```ts
   * const scanReport = await client.scans.results.retrieve(
   *   '00000000-0000-0000-0000-000000000000',
   * );
   * ```
   */
  retrieve(
    scanID: string,
    query: ResultRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScanReport> {
    return this._client.get(path`/scan/v3/results/${scanID}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/json; charset=utf-8' }, options?.headers]),
    });
  }

  /**
   * Get condensed reports for a Model Scan
   *
   * @example
   * ```ts
   * const results = await client.scans.results.list();
   * ```
   */
  list(
    query: ResultListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ResultListResponse> {
    return this._client.get('/scan/v3/results', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/json; charset=utf-8' }, options?.headers]),
    });
  }

  /**
   * Indicate part (file or files) of a model scan has completed
   *
   * @example
   * ```ts
   * const response = await client.scans.results.patch(
   *   '00000000-0000-0000-0000-000000000000',
   *   {
   *     detection_count: 0,
   *     file_count: 0,
   *     files_with_detections_count: 0,
   *     inventory: {
   *       model_id: '00000000-0000-0000-0000-000000000000',
   *       model_name: 'keras-tf-2025-05-27',
   *       model_version: '1.0.0',
   *       model_version_id:
   *         '00000000-0000-0000-0000-000000000000',
   *       requested_scan_location: '/files-to-scan',
   *     },
   *     body_scan_id: 'scan_id',
   *     start_time: '2019-12-27T18:11:19.117Z',
   *     status: 'pending',
   *     version: 'version',
   *   },
   * );
   * ```
   */
  patch(
    scanID: string,
    params: ResultPatchParams,
    options?: RequestOptions,
  ): APIPromise<ResultPatchResponse> {
    const { has_detections, ...body } = params;
    return this._client.patch(path`/scan/v3/results/${scanID}`, {
      query: { has_detections },
      body,
      ...options,
    });
  }

  /**
   * Indicate model scan has started
   *
   * @example
   * ```ts
   * await client.scans.results.start(
   *   '00000000-0000-0000-0000-000000000000',
   *   {
   *     detection_count: 0,
   *     file_count: 0,
   *     files_with_detections_count: 0,
   *     inventory: {
   *       model_id: '00000000-0000-0000-0000-000000000000',
   *       model_name: 'keras-tf-2025-05-27',
   *       model_version: '1.0.0',
   *       model_version_id:
   *         '00000000-0000-0000-0000-000000000000',
   *       requested_scan_location: '/files-to-scan',
   *     },
   *     body_scan_id: 'scan_id',
   *     start_time: '2019-12-27T18:11:19.117Z',
   *     status: 'pending',
   *     version: 'version',
   *   },
   * );
   * ```
   */
  start(scanID: string, params: ResultStartParams, options?: RequestOptions): APIPromise<void> {
    const { has_detections, ...body } = params;
    return this._client.post(path`/scan/v3/results/${scanID}`, {
      query: { has_detections },
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface FileScanReport {
  details: FileScanReport.Details;

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

  detections?: Array<FileScanReport.Detection>;

  file_results?: Array<FileScanReport>;
}

export namespace FileScanReport {
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

    file_type_details?: { [key: string]: unknown };

    /**
     * hexadecimal md5 hash of file
     */
    md5?: string;

    /**
     * TLSH hash of file
     */
    tlsh?: string;
  }

  export interface Detection {
    /**
     * Vulnerability category for the detection
     */
    category: string;

    /**
     * detection description
     */
    description: string;

    /**
     * unique identifier for the detection
     */
    detection_id: string;

    mitre_atlas: Array<Detection.MitreAtlas>;

    owasp: Array<string>;

    /**
     * unique identifier for the rule that sourced the detection
     */
    rule_id: string;

    /**
     * detection severity
     */
    severity: 'low' | 'medium' | 'high' | 'critical';

    cve?: Array<string>;

    cwe?: string;

    /**
     * CWE URL for the detection
     */
    cwe_href?: string;

    /**
     * detection impact
     */
    impact?: string;

    /**
     * detection likelihood
     */
    likelihood?: string;

    /**
     * detection risk
     */
    risk?: 'MALICIOUS' | 'SUSPICIOUS' | 'BENIGN';

    rule_details?: Array<Detection.RuleDetail>;

    /**
     * Hiddenlayer Technical Blog URL for the detection
     */
    technical_blog_href?: string;
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

export interface ScanReport {
  /**
   * number of detections found
   */
  detection_count: number;

  /**
   * number of files scanned
   */
  file_count: number;

  /**
   * number of files with detections found
   */
  files_with_detections_count: number;

  /**
   * information about model and version that this scan relates to
   */
  inventory: ScanReport.Inventory;

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

  /**
   * scanner version
   */
  version: string;

  /**
   * list of detection categories found
   */
  detection_categories?: Array<string>;

  /**
   * time the scan ended
   */
  end_time?: string;

  file_results?: Array<FileScanReport>;

  /**
   * detection severity
   */
  severity?: 'low' | 'medium' | 'high' | 'critical' | 'safe' | 'unknown';
}

export namespace ScanReport {
  /**
   * information about model and version that this scan relates to
   */
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
     * version of the model
     */
    model_version: string;

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
     * Entity that requested the scan
     */
    requesting_entity?: string;
  }
}

export interface ResultListResponse {
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

  /**
   * List of items. If no matching items are found, then `[]` will be returned.
   */
  items?: Array<ScanReport>;
}

export interface ResultPatchResponse {
  /**
   * Request to resource is successful
   */
  message: string;
}

export interface ResultRetrieveParams {
  /**
   * Filter file_results to only those that have detections (and parents)
   */
  has_detections?: boolean;
}

export interface ResultListParams {
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
   * Model Version ID
   */
  model_version_ids?: Array<string>;

  offset?: number;

  /**
   * Severities
   */
  severity?: Array<string>;

  /**
   * allow sorting by status, severity or created at, ascending (+) or the default
   * descending (-)
   */
  sort?: string;

  /**
   * Start Time
   */
  start_time?: string;

  /**
   * Statuses
   */
  status?: Array<string>;
}

export interface ResultPatchParams {
  /**
   * Body param: number of detections found
   */
  detection_count: number;

  /**
   * Body param: number of files scanned
   */
  file_count: number;

  /**
   * Body param: number of files with detections found
   */
  files_with_detections_count: number;

  /**
   * Body param: information about model and version that this scan relates to
   */
  inventory: ResultPatchParams.Inventory;

  /**
   * Body param: unique identifier for the scan
   */
  body_scan_id: string;

  /**
   * Body param: time the scan started
   */
  start_time: string;

  /**
   * Body param: status of the scan
   */
  status: 'pending' | 'running' | 'done' | 'failed' | 'canceled';

  /**
   * Body param: scanner version
   */
  version: string;

  /**
   * Query param: Filter file_results to only those that have detections (and
   * parents)
   */
  has_detections?: boolean;

  /**
   * Body param: list of detection categories found
   */
  detection_categories?: Array<string>;

  /**
   * Body param: time the scan ended
   */
  end_time?: string;

  /**
   * Body param:
   */
  file_results?: Array<FileScanReport>;

  /**
   * Body param: detection severity
   */
  severity?: 'low' | 'medium' | 'high' | 'critical' | 'safe' | 'unknown';
}

export namespace ResultPatchParams {
  /**
   * information about model and version that this scan relates to
   */
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
     * version of the model
     */
    model_version: string;

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
     * Entity that requested the scan
     */
    requesting_entity?: string;
  }
}

export interface ResultStartParams {
  /**
   * Body param: number of detections found
   */
  detection_count: number;

  /**
   * Body param: number of files scanned
   */
  file_count: number;

  /**
   * Body param: number of files with detections found
   */
  files_with_detections_count: number;

  /**
   * Body param: information about model and version that this scan relates to
   */
  inventory: ResultStartParams.Inventory;

  /**
   * Body param: unique identifier for the scan
   */
  body_scan_id: string;

  /**
   * Body param: time the scan started
   */
  start_time: string;

  /**
   * Body param: status of the scan
   */
  status: 'pending' | 'running' | 'done' | 'failed' | 'canceled';

  /**
   * Body param: scanner version
   */
  version: string;

  /**
   * Query param: Filter file_results to only those that have detections (and
   * parents)
   */
  has_detections?: boolean;

  /**
   * Body param: list of detection categories found
   */
  detection_categories?: Array<string>;

  /**
   * Body param: time the scan ended
   */
  end_time?: string;

  /**
   * Body param:
   */
  file_results?: Array<FileScanReport>;

  /**
   * Body param: detection severity
   */
  severity?: 'low' | 'medium' | 'high' | 'critical' | 'safe' | 'unknown';
}

export namespace ResultStartParams {
  /**
   * information about model and version that this scan relates to
   */
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
     * version of the model
     */
    model_version: string;

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
     * Entity that requested the scan
     */
    requesting_entity?: string;
  }
}

export declare namespace Results {
  export {
    type FileScanReport as FileScanReport,
    type ScanReport as ScanReport,
    type ResultListResponse as ResultListResponse,
    type ResultPatchResponse as ResultPatchResponse,
    type ResultRetrieveParams as ResultRetrieveParams,
    type ResultListParams as ResultListParams,
    type ResultPatchParams as ResultPatchParams,
    type ResultStartParams as ResultStartParams,
  };
}
