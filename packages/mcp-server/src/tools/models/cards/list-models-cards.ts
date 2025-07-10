// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'models.cards',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/models/v3/cards',
  operationId: 'sensor_sor_api_v3_model_cards_query_get',
};

export const tool: Tool = {
  name: 'list_models_cards',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList Model Cards\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'SensorSORModelCardQueryResponse',\n  properties: {\n    page_number: {\n      type: 'integer',\n      title: 'Page Number'\n    },\n    page_size: {\n      type: 'integer',\n      title: 'Page Size'\n    },\n    results: {\n      type: 'array',\n      title: 'Results',\n      items: {\n        type: 'object',\n        title: 'Model Card (V3) Response',\n        properties: {\n          created_at: {\n            type: 'integer',\n            title: 'Created At Time',\n            description: 'Unix Nano Epoch Timestamp'\n          },\n          model_id: {\n            type: 'string',\n            title: 'Model ID'\n          },\n          plaintext_name: {\n            type: 'string',\n            title: 'Plaintext Name'\n          },\n          source: {\n            type: 'string',\n            title: 'source of model metadata'\n          },\n          active_versions: {\n            type: 'array',\n            items: {\n              type: 'integer'\n            }\n          },\n          attack_monitoring_threat_level: {\n            type: 'string',\n            title: 'Attack Monitoring Severity',\n            enum: [              'safe',\n              'unsafe',\n              'suspicious',\n              'not available'\n            ]\n          },\n          model_scan_threat_level: {\n            type: 'string',\n            title: 'Model Scan Severity',\n            enum: [              'safe',\n              'unsafe',\n              'suspicious',\n              'not available'\n            ]\n          },\n          security_posture: {\n            type: 'object',\n            title: 'Security Posture',\n            properties: {\n              attack_monitoring: {\n                type: 'boolean',\n                title: 'Attack Monitoring Active'\n              },\n              model_scan: {\n                type: 'boolean',\n                title: 'Model Scan Active'\n              }\n            },\n            required: []\n          },\n          tags: {\n            type: 'object'\n          }\n        },\n        required: [          'created_at',\n          'model_id',\n          'plaintext_name',\n          'source'\n        ]\n      }\n    },\n    total_count: {\n      type: 'integer',\n      title: 'Total Count'\n    }\n  },\n  required: [    'page_number',\n    'page_size',\n    'results',\n    'total_count'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      aidr_severity: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['SAFE', 'UNSAFE', 'SUSPICIOUS'],
        },
      },
      aidr_status: {
        type: 'string',
        description: 'filter by aidr enabled',
        enum: ['ENABLED', 'DISABLED', 'ANY'],
      },
      limit: {
        type: 'integer',
      },
      model_created: {
        type: 'object',
        description: 'match on models created between dates',
        properties: {
          gte: {
            type: 'string',
            format: 'date-time',
          },
          lte: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: [],
      },
      model_name: {
        type: 'object',
        description: 'substring match on model name',
        properties: {
          contains: {
            type: 'string',
          },
          eq: {
            type: 'string',
          },
        },
        required: [],
      },
      modscan_severity: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['SAFE', 'UNSAFE', 'SUSPICIOUS', 'UNKNOWN', 'ERROR'],
        },
      },
      modscan_status: {
        type: 'string',
        enum: ['ENABLED', 'DISABLED', 'ANY'],
      },
      offset: {
        type: 'integer',
      },
      provider: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['AZURE', 'ADHOC'],
        },
      },
      sort: {
        type: 'string',
        description:
          'allow sorting by model name or created at timestamp, ascending (+) or the default descending (-)',
      },
      source: {
        type: 'object',
        description: 'substring and full match on model source',
        properties: {
          contains: {
            type: 'string',
          },
          eq: {
            type: 'string',
          },
        },
        required: [],
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
  return asTextContentResult(await maybeFilter(args, await client.models.cards.list(body)));
};

export default { metadata, tool, handler };
