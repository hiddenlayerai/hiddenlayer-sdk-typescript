// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'sensors',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/sensors/{sensor_id}',
  operationId: 'sensor_sor_api_v1_sensors__sensor_id__get',
};

export const tool: Tool = {
  name: 'retrieve_sensors',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet Sensor\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'SensorSORItemResponse',\n  properties: {\n    active: {\n      type: 'boolean',\n      title: 'Active'\n    },\n    created_at: {\n      type: 'string',\n      title: 'Created At Time',\n      format: 'date-time'\n    },\n    model_id: {\n      type: 'string',\n      title: 'Model ID'\n    },\n    plaintext_name: {\n      type: 'string',\n      title: 'Plaintext Name'\n    },\n    sensor_id: {\n      type: 'string',\n      title: 'Sensor ID'\n    },\n    tags: {\n      type: 'object',\n      title: 'Tags',\n      additionalProperties: true\n    },\n    tenant_id: {\n      type: 'string',\n      title: 'Tenant ID'\n    },\n    adhoc: {\n      type: 'boolean',\n      title: 'Adhoc model'\n    },\n    version: {\n      type: 'integer',\n      title: 'Version'\n    }\n  },\n  required: [    'active',\n    'created_at',\n    'model_id',\n    'plaintext_name',\n    'sensor_id',\n    'tags',\n    'tenant_id'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      sensor_id: {
        type: 'string',
        title: 'Sensor ID',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['sensor_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { sensor_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.sensors.retrieve(sensor_id)));
};

export default { metadata, tool, handler };
