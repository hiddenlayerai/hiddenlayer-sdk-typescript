// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'model-intel.files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/model-intel/v1/file/{sha256}',
  operationId: 'getFile',
};

export const tool: Tool = {
  name: 'retrieve_model_intel_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve detailed file information including all associated instances, repositories, and metadata",
  inputSchema: {
    type: 'object',
    properties: {
      sha256: {
        type: 'string',
      },
      cursor: {
        type: 'string',
        description: 'Cursor for pagination, used to navigate through pages of results',
      },
      page_size: {
        type: 'integer',
        description: 'Number of items to return per page',
      },
    },
    required: ['sha256'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { sha256, ...body } = args as any;
  return asTextContentResult(await client.modelIntel.files.retrieve(sha256, body));
};

export default { metadata, tool, handler };
