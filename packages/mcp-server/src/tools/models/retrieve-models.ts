// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/models/{model_id}',
  operationId: 'get_model',
};

export const tool: Tool = {
  name: 'retrieve_models',
  description: 'Get Model',
  inputSchema: {
    type: 'object',
    properties: {
      model_id: {
        type: 'string',
        title: 'Model ID',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { model_id, ...body } = args as any;
  return asTextContentResult(await client.models.retrieve(model_id));
};

export default { metadata, tool, handler };
