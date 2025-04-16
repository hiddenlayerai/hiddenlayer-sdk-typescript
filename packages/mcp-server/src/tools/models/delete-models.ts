// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_models',
  description: 'Delete Adhoc Model',
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
  return client.models.delete(model_id);
};

export default { metadata, tool, handler };
