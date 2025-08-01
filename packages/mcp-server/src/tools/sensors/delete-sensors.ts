// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'sensors',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/v2/sensors/{sensor_id}',
  operationId: 'sensor_sor_api_v1_sensors__sensor_id__delete',
};

export const tool: Tool = {
  name: 'delete_sensors',
  description: 'Remove an Adhoc Sensor',
  inputSchema: {
    type: 'object',
    properties: {
      sensor_id: {
        type: 'string',
        title: 'Sensor ID',
      },
    },
    required: ['sensor_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { sensor_id, ...body } = args as any;
  const response = await client.sensors.delete(sensor_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
