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
      limit: {
        type: 'integer',
      },
      'model_name[contains]': {
        type: 'string',
        description: 'substring match on model name',
      },
      'model_name[eq]': {
        type: 'string',
        description: 'substring match on model name',
      },
      offset: {
        type: 'integer',
      },
      sort: {
        type: 'string',
        description:
          'allow sorting by model name or created at timestamp, ascending (+) or the default descending (-)',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.models.cards.list(body));
};

export default { metadata, tool, handler };
