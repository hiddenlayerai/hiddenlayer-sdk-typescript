// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.results',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'patch_scans_results',
  description: 'Indicate part (file or files) of a model scan has completed',
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan ID',
        description: 'unique identifier for the scan',
      },
      detection_count: {
        type: 'integer',
        title: 'Number of detections',
        description: 'number of detections found',
      },
      file_count: {
        type: 'integer',
        title: 'Number of files',
        description: 'number of files scanned',
      },
      files_with_detections_count: {
        type: 'integer',
        title: 'Number of files with detections',
        description: 'number of files with detections found',
      },
      inventory: {
        type: 'object',
        title: 'Model Inventory Info',
        description: 'information about model and version that this scan relates to',
        properties: {
          model_id: {
            type: 'string',
            title: 'Model ID',
            description: 'Unique identifier for the model',
          },
          model_name: {
            type: 'string',
            title: 'Model Name',
            description: 'name of the model',
          },
          model_version: {
            type: 'string',
            title: 'Model Version',
            description: 'version of the model',
          },
          model_version_id: {
            type: 'string',
            title: 'Model Version ID',
            description: 'unique identifier for the model version',
          },
          requested_scan_location: {
            type: 'string',
            title: 'Requested Scan Location',
            description: 'Location to be scanned',
          },
          model_source: {
            type: 'string',
            title: 'Model Source',
            description: 'source (provider) info',
          },
          requesting_entity: {
            type: 'string',
            title: 'Requesting Entity',
            description: 'Entity that requested the scan',
          },
        },
        required: ['model_id', 'model_name', 'model_version', 'model_version_id', 'requested_scan_location'],
      },
      start_time: {
        type: 'string',
        title: 'Scan Start Time',
        description: 'time the scan started',
        format: 'date-time',
      },
      status: {
        type: 'string',
        title: 'Status',
        description: 'status of the scan',
        enum: ['pending', 'running', 'done', 'failed', 'canceled'],
      },
      version: {
        type: 'string',
        title: 'Version',
        description: 'scanner version',
      },
      has_detections: {
        type: 'boolean',
        description: 'Filter file_results to only those that have detections (and parents)',
      },
      detection_categories: {
        type: 'array',
        title: 'Detection Categories',
        description: 'list of detection categories found',
        items: {
          type: 'string',
        },
      },
      end_time: {
        type: 'string',
        title: 'Scan End Time',
        description: 'time the scan ended',
        format: 'date-time',
      },
      file_results: {
        type: 'array',
        title: 'File Results',
        items: {
          type: 'object',
          title: 'FileScanReportV3',
          properties: {
            details: {
              type: 'object',
              title: 'FileDetailsV3',
              properties: {
                estimated_time: {
                  type: 'string',
                  title: 'Estimated Time',
                  description: 'estimated time to scan the file',
                },
                file_type: {
                  type: 'string',
                  title: 'File Type',
                  description: 'type of the file',
                },
                sha256: {
                  type: 'string',
                  title: 'SHA256',
                  description: 'hexadecimal sha256 hash of file',
                },
                file_size: {
                  type: 'string',
                  title: 'File Size',
                  description: 'size of the file in human readable format',
                },
                file_size_bytes: {
                  type: 'integer',
                  title: 'File Size Bytes',
                  description: 'size of the file in bytes',
                },
                file_type_details: {
                  type: 'object',
                  title: 'File Type Details',
                },
                md5: {
                  type: 'string',
                  title: 'MD5',
                  description: 'hexadecimal md5 hash of file',
                },
                tlsh: {
                  type: 'string',
                  title: 'TLSH',
                  description: 'TLSH hash of file',
                },
              },
              required: ['estimated_time', 'file_type', 'sha256'],
            },
            end_time: {
              type: 'string',
              title: 'Scan End Time',
              description: 'time the scan ended',
              format: 'date-time',
            },
            file_instance_id: {
              type: 'string',
              title: 'File Instance ID',
              description: 'unique ID of the file',
            },
            file_location: {
              type: 'string',
              title: 'File Location',
              description: 'full file path',
            },
            seen: {
              type: 'string',
              title: 'Seen',
              description: 'time the scan was seen at',
              format: 'date-time',
            },
            start_time: {
              type: 'string',
              title: 'Scan Start Time',
              description: 'time the scan started',
              format: 'date-time',
            },
            status: {
              type: 'string',
              title: 'Status',
              description: 'status of the scan',
              enum: ['skipped', 'pending', 'running', 'done', 'failed', 'canceled'],
            },
            detections: {
              type: 'array',
              title: 'Detections',
              items: {
                type: 'object',
                title: 'ScanDetectionV3',
                properties: {
                  category: {
                    type: 'string',
                    title: 'Category',
                    description: 'Vulnerability category for the detection',
                  },
                  description: {
                    type: 'string',
                    title: 'Description',
                    description: 'detection description',
                  },
                  detection_id: {
                    type: 'string',
                    title: 'Detection ID',
                    description: 'unique identifier for the detection',
                  },
                  mitre_atlas: {
                    type: 'array',
                    title: 'MITRE Atlas',
                    items: {
                      type: 'object',
                      properties: {
                        tactic: {
                          type: 'string',
                          title: 'Tactic',
                          description: 'MITRE Atlas Tactic',
                        },
                        technique: {
                          type: 'string',
                          title: 'Technique',
                          description: 'MITRE Atlas Technique',
                        },
                      },
                      required: [],
                    },
                  },
                  owasp: {
                    type: 'array',
                    title: 'OWASP',
                    items: {
                      type: 'string',
                    },
                  },
                  rule_id: {
                    type: 'string',
                    title: 'Rule ID',
                    description: 'unique identifier for the rule that sourced the detection',
                  },
                  severity: {
                    type: 'string',
                    title: 'Severity',
                    description: 'detection severity',
                    enum: ['low', 'medium', 'high', 'critical'],
                  },
                  cve: {
                    type: 'array',
                    title: 'CVE',
                    items: {
                      type: 'string',
                    },
                  },
                  cwe: {
                    type: 'string',
                    title: 'CWE',
                  },
                  cwe_href: {
                    type: 'string',
                    title: 'CWE Href',
                    description: 'CWE URL for the detection',
                  },
                  impact: {
                    type: 'string',
                    title: 'Impact',
                    description: 'detection impact',
                  },
                  likelihood: {
                    type: 'string',
                    title: 'Likelihood',
                    description: 'detection likelihood',
                  },
                  risk: {
                    type: 'string',
                    title: 'Risk',
                    description: 'detection risk',
                    enum: ['MALICIOUS', 'SUSPICIOUS', 'BENIGN'],
                  },
                  rule_details: {
                    type: 'array',
                    title: 'Rule Details',
                    items: {
                      type: 'object',
                      properties: {
                        description: {
                          type: 'string',
                          title: 'Description',
                          description: 'description of the deprecation',
                        },
                        status: {
                          type: 'string',
                          title: 'status',
                          description: 'status',
                          enum: ['created', 'deprecated', 'updated', 'superseded'],
                        },
                        status_at: {
                          type: 'string',
                          title: 'Status At',
                          description: 'date-time when the details entry was created',
                          format: 'date-time',
                        },
                      },
                      required: [],
                    },
                  },
                  technical_blog_href: {
                    type: 'string',
                    title: 'Technical Blog Href',
                    description: 'Hiddenlayer Technical Blog URL for the detection',
                  },
                },
                required: [
                  'category',
                  'description',
                  'detection_id',
                  'mitre_atlas',
                  'owasp',
                  'rule_id',
                  'severity',
                ],
              },
            },
            file_results: {
              type: 'array',
              title: 'File Results',
              items: {
                $ref: '#/properties/file_results/items',
              },
            },
          },
          required: [
            'details',
            'end_time',
            'file_instance_id',
            'file_location',
            'seen',
            'start_time',
            'status',
          ],
        },
      },
      severity: {
        type: 'string',
        title: 'Severity',
        description: 'detection severity',
        enum: ['low', 'medium', 'high', 'critical', 'safe', 'unknown'],
      },
    },
  },
};

export const handler = (client: HiddenLayer, args: any) => {
  const { scan_id, ...body } = args;
  return client.scans.results.patch(scan_id, body);
};

export default { metadata, tool, handler };
