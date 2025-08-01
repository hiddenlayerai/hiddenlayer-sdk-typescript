// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/api/v2/models',
  operationId: 'sensor_sor_api_v1_models__models__put',
};

export const tool: Tool = {
  name: 'create_models',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpsert Models\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    details: {\n      type: 'string'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      body: {
        type: 'array',
        items: {
          type: 'object',
          title: 'SensorSORModelItem',
          properties: {
            name: {
              type: 'string',
              title: 'Name',
            },
            source: {
              type: 'string',
              title: 'Model Source',
            },
            model_id: {
              type: 'string',
              title: 'Model ID',
            },
            tenant_id: {
              type: 'string',
              title: 'Tenant ID',
            },
            versions: {
              type: 'array',
              title: 'Model Versions',
              items: {
                type: 'object',
                title: 'SensorSORModelVersion',
                properties: {
                  version: {
                    type: 'string',
                    title: 'Version',
                  },
                  deployments: {
                    type: 'array',
                    title: 'Deployments',
                    items: {
                      type: 'object',
                      title: 'Deployment',
                      properties: {
                        active: {
                          type: 'boolean',
                        },
                        path: {
                          type: 'string',
                          title: 'Deployment path',
                        },
                      },
                    },
                  },
                  locations: {
                    type: 'object',
                    title: 'Model Locations',
                  },
                  model_version_id: {
                    type: 'string',
                    title: 'Model Version ID',
                  },
                  multi_file: {
                    type: 'boolean',
                    title: 'Multi field',
                  },
                  retrievable: {
                    type: 'boolean',
                    title: 'Retrievable',
                  },
                  tags: {
                    type: 'object',
                    title: 'Tags',
                  },
                },
                required: ['version'],
              },
            },
          },
          required: ['name', 'source'],
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['body'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.models.create(body)));
};

export default { metadata, tool, handler };
