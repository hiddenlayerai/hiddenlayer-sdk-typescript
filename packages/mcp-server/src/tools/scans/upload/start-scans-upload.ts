// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.upload',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/scan/v3/upload',
  operationId: 'begin_multi_file_upload',
};

export const tool: Tool = {
  name: 'start_scans_upload',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nStart a model upload\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    scan_id: {\n      type: 'string',\n      description: 'Request to resource is successful'\n    }\n  },\n  required: []\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      model_name: {
        type: 'string',
        title: 'Model Name',
        description: 'Model name',
      },
      model_version: {
        type: 'string',
        title: 'Model Version',
        description: 'Model version',
      },
      requesting_entity: {
        type: 'string',
        title: 'Requesting Entity',
        description: 'Requesting entity',
      },
      'X-Correlation-Id': {
        type: 'string',
      },
      location_alias: {
        type: 'string',
        title: 'Requested Location Alias',
        description: 'Requested location alias',
      },
      origin: {
        type: 'string',
        title: 'Origin',
        description: 'Specifies the platform or service where the model originated before being scanned',
      },
      request_source: {
        type: 'string',
        title: 'Request Source',
        description: 'Identifies the system that requested the scan',
        enum: ['Hybrid Upload', 'API Upload', 'Integration', 'UI Upload'],
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
  return asTextContentResult(await maybeFilter(args, await client.scans.upload.start(body)));
};

export default { metadata, tool, handler };
