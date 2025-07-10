// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.upload.file',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/scan/v3/upload/{scan_id}/file/{file_id}',
  operationId: 'complete_multipart_file_upload',
};

export const tool: Tool = {
  name: 'complete_upload_scans_file',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nComplete a file upload\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    scan_id: {\n      type: 'string',\n      description: 'Request to resource is successful'\n    }\n  },\n  required: []\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan ID',
      },
      file_id: {
        type: 'string',
        title: 'file_id to which the file belongs',
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
  const { file_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.scans.upload.file.complete(file_id, body)));
};

export default { metadata, tool, handler };
