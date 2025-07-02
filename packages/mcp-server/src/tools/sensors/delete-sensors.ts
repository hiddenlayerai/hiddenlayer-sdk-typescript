// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'sensors',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/v2/sensors/{sensor_id}',
  operationId: 'delete_sensor',
};

export const tool: Tool = {
  name: 'delete_sensors',
  description: 'Delete Sensor',
  inputSchema: {
    type: 'object',
    properties: {
      sensor_id: {
        type: 'string',
        title: 'Sensor ID',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { sensor_id, ...body } = args as any;
  const response = await client.sensors.delete(sensor_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
