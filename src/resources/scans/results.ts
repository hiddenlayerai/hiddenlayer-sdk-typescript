// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Results extends APIResource {
  /**
   * Get scan results in SARIF format
   *
   * @example
   * ```ts
   * const response = await client.scans.results.sarif(
   *   '00000000-0000-0000-0000-000000000000',
   * );
   * ```
   */
  sarif(
    scanID: string,
    params: ResultSarifParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<string> {
    const { 'X-Correlation-Id': xCorrelationID } = params ?? {};
    return this._client.get(path`/scan/v3/results/${scanID}/sarif`, {
      ...options,
      headers: buildHeaders([
        {
          Accept: 'application/sarif+json',
          ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface FileScanReport {
  file_results?: Array<FileScanReport.FileResult>;
}

export namespace FileScanReport {
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

export type ResultSarifResponse = string;

export interface ResultSarifParams {
  /**
   * An ID that will be included with associated logs and downstream HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export declare namespace Results {
  export {
    type FileScanReport as FileScanReport,
    type ResultSarifResponse as ResultSarifResponse,
    type ResultSarifParams as ResultSarifParams,
  };
}
