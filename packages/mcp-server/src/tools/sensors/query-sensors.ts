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
  httpPath: '/api/v2/sensors/query',
  operationId: 'sensor_sor_api_v1_sensors_query_post',
};

export const tool: Tool = {
  name: 'query_sensors',
  description: 'Query Sensors',
  inputSchema: {
    type: 'object',
    properties: {
      'X-Correlation-Id': {
        type: 'string',
      },
      filter: {
        type: 'object',
        title: 'SensorSORQueryFilter',
        properties: {
          active: {
            type: 'boolean',
            title: 'Active',
          },
          created_at_start: {
            type: 'string',
            title: 'Created At Start',
            format: 'date-time',
          },
          created_at_stop: {
            type: 'string',
            title: 'Created At Stop',
            format: 'date-time',
          },
          plaintext_name: {
            type: 'string',
            title: 'Plaintext Name',
          },
          source: {
            type: 'string',
            title: 'Source',
            enum: ['adhoc'],
          },
          version: {
            type: 'integer',
            title: 'Version',
          },
        },
        required: [],
      },
      order_by: {
        type: 'string',
        title: 'Order By',
      },
      order_dir: {
        type: 'string',
        title: 'Order direction',
        enum: ['asc', 'desc', 'ASC', 'DESC'],
      },
      page_number: {
        type: 'integer',
        title: 'Page Number',
      },
      page_size: {
        type: 'integer',
        title: 'Page Size',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.sensors.query(body));
};

export default { metadata, tool, handler };
