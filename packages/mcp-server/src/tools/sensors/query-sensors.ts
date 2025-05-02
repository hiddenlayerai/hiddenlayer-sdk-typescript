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
  name: 'query_sensors',
  description: 'Query a Sensor',
  inputSchema: {
    type: 'object',
    properties: {
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

export const handler = (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.sensors.query(body);
};

export default { metadata, tool, handler };
