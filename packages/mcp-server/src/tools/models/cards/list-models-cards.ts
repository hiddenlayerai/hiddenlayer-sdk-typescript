// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models.cards',
  operation: 'read',
  tags: [],
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

export const handler = (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.models.cards.list(body);
};

export default { metadata, tool, handler };
