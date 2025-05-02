// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'sensors',
  operation: 'write',
  tags: [],
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

export const handler = (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { sensor_id, ...body } = args as any;
  return client.sensors.delete(sensor_id);
};

export default { metadata, tool, handler };
