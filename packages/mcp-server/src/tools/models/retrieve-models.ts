// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'read',
  tags: [],
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

export const handler = (client: HiddenLayer, args: any) => {
  const { model_id } = args;
  return client.models.retrieve(model_id);
};

export default { metadata, tool, handler };
