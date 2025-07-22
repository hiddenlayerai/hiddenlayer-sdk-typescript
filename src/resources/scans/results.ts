// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Results extends APIResource {}

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
       * detection severity
       */
      severity: 'low' | 'medium' | 'high' | 'critical';

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
  inventory: ScanReport.ScanModelDetailsV3 | ScanReport.ScanModelIDsV3 | ScanReport.ScanModelComboV3;

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

  file_results?: Array<ScanReport.FileResult>;

  /**
   * if there is model geneaology info available
   */
  has_genealogy?: boolean;

  /**
   * detection severity
   */
  severity?: 'low' | 'medium' | 'high' | 'critical' | 'safe' | 'unknown';

  /**
   * aggregated summary statistics for the scan
   */
  summary?: ScanReport.Summary;
}

export namespace ScanReport {
  export interface ScanModelDetailsV3 {
    /**
     * name of the model
     */
    model_name: string;

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
    request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';

    /**
     * Entity that requested the scan
     */
    requesting_entity?: string;
  }

  export interface ScanModelIDsV3 {
    /**
     * Unique identifier for the model
     */
    model_id: string;

    /**
     * unique identifier for the model version
     */
    model_version_id: string;
  }

  export interface ScanModelComboV3 {
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
    request_source?: 'Hybrid Upload' | 'API Upload' | 'Integration' | 'UI Upload';

    /**
     * Entity that requested the scan
     */
    requesting_entity?: string;
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
       * detection severity
       */
      severity: 'low' | 'medium' | 'high' | 'critical';

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

  /**
   * aggregated summary statistics for the scan
   */
  export interface Summary {
    /**
     * list of unique detection categories found
     */
    categories?: Array<string>;

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
     * highest severity level found across all detections
     */
    severity?: 'low' | 'medium' | 'high' | 'critical' | 'safe' | 'unknown';

    /**
     * number of files with unknown file type
     */
    unknown_files?: number;
  }
}

export declare namespace Results {
  export { type FileScanReport as FileScanReport, type ScanReport as ScanReport };
}
