// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nQuery Sensors\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'SensorSORQueryResponse',\n  properties: {\n    page_number: {\n      type: 'integer',\n      title: 'Page Number'\n    },\n    page_size: {\n      type: 'integer',\n      title: 'Page Size'\n    },\n    results: {\n      type: 'array',\n      title: 'Results',\n      items: {\n        type: 'object',\n        title: 'SensorSORItemCreateRequest',\n        properties: {\n          active: {\n            type: 'boolean',\n            title: 'Active'\n          },\n          created_at: {\n            type: 'string',\n            title: 'Created At Time',\n            format: 'date-time'\n          },\n          plaintext_name: {\n            type: 'string',\n            title: 'Plaintext Name'\n          },\n          sensor_id: {\n            type: 'string',\n            title: 'Sensor ID'\n          },\n          tenant_id: {\n            type: 'string',\n            title: 'Tenant ID'\n          },\n          version: {\n            type: 'integer',\n            title: 'Version'\n          },\n          adhoc: {\n            type: 'boolean',\n            title: 'Adhoc model'\n          },\n          tags: {\n            type: 'object',\n            title: 'Tags'\n          }\n        },\n        required: [          'active',\n          'created_at',\n          'plaintext_name',\n          'sensor_id',\n          'tenant_id',\n          'version'\n        ]\n      }\n    },\n    total_count: {\n      type: 'integer',\n      title: 'Total Count'\n    }\n  },\n  required: [    'page_number',\n    'page_size',\n    'results',\n    'total_count'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.sensors.query(body)));
};

export default { metadata, tool, handler };
