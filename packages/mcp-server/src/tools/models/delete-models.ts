// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/v2/models/{model_id}',
  operationId: 'sensor_sor_api_v2_models__model_id__delete',
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
    required: ['model_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { model_id, ...body } = args as any;
  const response = await client.models.delete(model_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
