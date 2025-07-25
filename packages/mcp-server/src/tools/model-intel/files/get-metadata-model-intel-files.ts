// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'model-intel.files',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/model-intel/v1/file/{sha256}/metadata',
  operationId: 'getFileMetadata',
};

export const tool: Tool = {
  name: 'get_metadata_model_intel_files',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve file information such as filetype, file size in bytes, and MIME type\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    created_at: {\n      type: 'string',\n      description: 'Timestamp when the file was created',\n      format: 'date-time'\n    },\n    sha256: {\n      type: 'string',\n      description: 'SHA256 hash of the file'\n    },\n    size_bytes: {\n      type: 'integer',\n      description: 'File size in bytes'\n    },\n    updated_at: {\n      type: 'string',\n      description: 'Timestamp when the file was last updated',\n      format: 'date-time'\n    },\n    extension: {\n      type: 'string',\n      description: 'File extension'\n    },\n    file_type: {\n      type: 'string',\n      description: 'Type of the file'\n    },\n    mime_type: {\n      type: 'string',\n      description: 'MIME type of the file'\n    }\n  },\n  required: [    'created_at',\n    'sha256',\n    'size_bytes',\n    'updated_at'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      sha256: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
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
  return asTextContentResult(await maybeFilter(args, await client.modelIntel.files.getMetadata(sha256)));
};

export default { metadata, tool, handler };
