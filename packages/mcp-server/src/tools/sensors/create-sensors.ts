// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'sensors',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/sensors/create',
  operationId: 'create_sensor',
};

export const tool: Tool = {
  name: 'create_sensors',
  description: 'Create a Sensor',
  inputSchema: {
    type: 'object',
    properties: {
      plaintext_name: {
        type: 'string',
        title: 'Sensor Name',
      },
      active: {
        type: 'boolean',
        title: 'Sensor Active',
      },
      adhoc: {
        type: 'boolean',
        title: 'Adhoc model',
      },
      tags: {
        type: 'object',
        title: 'Sensor Tags',
      },
      version: {
        type: 'integer',
        title: 'Sensor Version',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.sensors.create(body));
};

export default { metadata, tool, handler };
