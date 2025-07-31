// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.jobs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/scan/v3/results',
  operationId: 'get_condensed_model_scan_reports',
};

export const tool: Tool = {
  name: 'list_scans_jobs',
  description: 'Get scan results (Summaries)',
  inputSchema: {
    type: 'object',
    properties: {
      detection_category: {
        type: 'string',
        description: 'filter by a single detection category',
      },
      end_time: {
        type: 'string',
        description: 'End Time',
        format: 'date-time',
      },
      latest_per_model_version_only: {
        type: 'boolean',
        description: 'only return latest result per model version',
      },
      limit: {
        type: 'integer',
      },
      model_ids: {
        type: 'array',
        description: 'Model ID',
        items: {
          type: 'string',
        },
      },
      model_name: {
        type: 'object',
        description: 'filter by the model name',
        properties: {
          contains: {
            type: 'string',
          },
          eq: {
            type: 'string',
          },
        },
      },
      model_version_ids: {
        type: 'array',
        description: 'Model Version IDs',
        items: {
          type: 'string',
        },
      },
      offset: {
        type: 'integer',
      },
      scanner_version: {
        type: 'string',
        description: 'filter by version of the scanner',
      },
      severity: {
        type: 'array',
        description: 'Severities',
        items: {
          type: 'string',
        },
      },
      sort: {
        type: 'string',
        description:
          'allow sorting by model name, status, severity or created at, ascending (+) or the default descending (-)',
      },
      source: {
        type: 'object',
        description: 'source of model related to scans',
        properties: {
          eq: {
            type: 'string',
            enum: ['adhoc'],
          },
        },
      },
      start_time: {
        type: 'string',
        description: 'Start Time',
        format: 'date-time',
      },
      status: {
        type: 'array',
        description: 'Statuses',
        items: {
          type: 'string',
        },
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.scans.jobs.list(body));
};

export default { metadata, tool, handler };
