// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/models/{model_id}',
  operationId: 'sensor_sor_api_v1_models__model_id__get',
};

export const tool: Tool = {
  name: 'retrieve_models',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet Model\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'SensorSORModelItem',\n  properties: {\n    name: {\n      type: 'string',\n      title: 'Name'\n    },\n    source: {\n      type: 'string',\n      title: 'Model Source'\n    },\n    model_id: {\n      type: 'string',\n      title: 'Model ID'\n    },\n    tenant_id: {\n      type: 'string',\n      title: 'Tenant ID'\n    },\n    versions: {\n      type: 'array',\n      title: 'Model Versions',\n      items: {\n        type: 'object',\n        title: 'SensorSORModelVersion',\n        properties: {\n          version: {\n            type: 'string',\n            title: 'Version'\n          },\n          deployments: {\n            type: 'array',\n            title: 'Deployments',\n            items: {\n              type: 'object',\n              title: 'Deployment',\n              properties: {\n                active: {\n                  type: 'boolean'\n                },\n                path: {\n                  type: 'string',\n                  title: 'Deployment path'\n                }\n              },\n              required: []\n            }\n          },\n          locations: {\n            type: 'object',\n            title: 'Model Locations'\n          },\n          model_version_id: {\n            type: 'string',\n            title: 'Model Version ID'\n          },\n          multi_file: {\n            type: 'boolean',\n            title: 'Multi field'\n          },\n          retrievable: {\n            type: 'boolean',\n            title: 'Retrievable'\n          },\n          tags: {\n            type: 'object',\n            title: 'Tags'\n          }\n        },\n        required: [          'version'\n        ]\n      }\n    }\n  },\n  required: [    'name',\n    'source'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      model_id: {
        type: 'string',
        title: 'Model ID',
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
  const { model_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.models.retrieve(model_id)));
};

export default { metadata, tool, handler };
