// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models.cards',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/models/v3/cards',
  operationId: 'sensor_sor_api_v3_model_cards_query_get',
};

export const tool: Tool = {
  name: 'list_models_cards',
  description: 'List Model Cards',
  inputSchema: {
    type: 'object',
    properties: {
      'X-Correlation-Id': {
        type: 'string',
      },
      aidr_severity: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['SAFE', 'UNSAFE', 'SUSPICIOUS'],
        },
      },
      aidr_status: {
        type: 'string',
        description: 'filter by aidr enabled',
        enum: ['ENABLED', 'DISABLED', 'ANY'],
      },
      limit: {
        type: 'integer',
      },
      model_created: {
        type: 'object',
        description: 'match on models created between dates',
        properties: {
          gte: {
            type: 'string',
            format: 'date-time',
          },
          lte: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: [],
      },
      model_name: {
        type: 'object',
        description: 'substring match on model name',
        properties: {
          contains: {
            type: 'string',
          },
          eq: {
            type: 'string',
          },
        },
        required: [],
      },
      modscan_severity: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['SAFE', 'UNSAFE', 'SUSPICIOUS', 'UNKNOWN', 'ERROR'],
        },
      },
      modscan_status: {
        type: 'string',
        enum: ['ENABLED', 'DISABLED', 'ANY'],
      },
      offset: {
        type: 'integer',
      },
      provider: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['AZURE', 'ADHOC'],
        },
      },
      sort: {
        type: 'string',
        description:
          'allow sorting by model name or created at timestamp, ascending (+) or the default descending (-)',
      },
      source: {
        type: 'object',
        description: 'substring and full match on model source',
        properties: {
          contains: {
            type: 'string',
          },
          eq: {
            type: 'string',
          },
        },
        required: [],
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.models.cards.list(body));
};

export default { metadata, tool, handler };
