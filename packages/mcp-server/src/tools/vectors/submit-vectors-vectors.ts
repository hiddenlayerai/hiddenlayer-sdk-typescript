// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'vectors',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/submit',
  operationId: 'submit_vectors',
};

export const tool: Tool = {
  name: 'submit_vectors_vectors',
  description: 'Submit vectors',
  inputSchema: {
    type: 'object',
    properties: {
      input_layer: {
        type: 'string',
        title: 'Input Layer',
      },
      input_layer_dtype: {
        type: 'string',
        title: 'Input Layer Data Type',
      },
      input_layer_shape: {
        type: 'array',
        title: 'Input Layer Shape',
        items: {
          type: 'number',
        },
      },
      output_layer: {
        type: 'string',
        title: 'Output Layer',
      },
      output_layer_dtype: {
        type: 'string',
        title: 'Output Layer Data Type',
      },
      output_layer_shape: {
        type: 'array',
        title: 'Output Layer Shape',
        items: {
          type: 'number',
        },
      },
      sensor_id: {
        type: 'string',
        title: 'Sensor Id',
      },
      event_time: {
        type: 'string',
        title: 'Event Time',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
      },
      predictions: {
        type: 'array',
        title: 'Predictions',
        items: {
          type: 'number',
        },
      },
      requester_id: {
        type: 'string',
        title: 'Requester Id',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.vectors.submitVectors(body));
};

export default { metadata, tool, handler };
