// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.upload.file',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/scan/v3/upload/{scan_id}/file',
  operationId: 'begin_multipart_file_upload',
};

export const tool: Tool = {
  name: 'add_upload_scans_file',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpload a model file\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    parts: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          end_offset: {\n            type: 'integer'\n          },\n          part_number: {\n            type: 'integer'\n          },\n          start_offset: {\n            type: 'integer'\n          },\n          upload_url: {\n            type: 'string'\n          }\n        }\n      }\n    },\n    upload_id: {\n      type: 'string',\n      description: 'UploadId for the current file'\n    }\n  },\n  required: [    'parts',\n    'upload_id'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan ID',
      },
      'file-content-length': {
        type: 'integer',
      },
      'file-name': {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['scan_id', 'file-content-length', 'file-name'],
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { scan_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.scans.upload.file.add(scan_id, body)));
};

export default { metadata, tool, handler };
