// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'sensors',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/api/v2/sensors/{sensor_id}',
  operationId: 'sensor_sor_api_v1_update',
};

export const tool: Tool = {
  name: 'update_sensors',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate Sensor\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'SensorSORUpdateResponseModel',\n  properties: {\n    detail: {\n      type: 'string',\n      title: 'Detail'\n    }\n  },\n  required: [    'detail'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      sensor_id: {
        type: 'string',
        title: 'Sensor ID',
      },
      active: {
        type: 'boolean',
        title: 'Active',
      },
      plaintext_name: {
        type: 'string',
        title: 'Plaintext Name',
      },
      tags: {
        type: 'object',
        title: 'Tags',
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
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { sensor_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.sensors.update(sensor_id, body)));
};

export default { metadata, tool, handler };
