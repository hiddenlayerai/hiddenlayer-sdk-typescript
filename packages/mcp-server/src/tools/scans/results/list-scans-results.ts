// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.results',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_scans_results',
  description: 'Get condensed reports for a Model Scan',
  inputSchema: {
    type: 'object',
    properties: {
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
      model_version_ids: {
        type: 'array',
        description: 'Model Version ID',
        items: {
          type: 'string',
        },
      },
      offset: {
        type: 'integer',
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
          'allow sorting by status, severity or created at, ascending (+) or the default descending (-)',
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
  },
};

export const handler = (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.scans.results.list(body);
};

export default { metadata, tool, handler };
