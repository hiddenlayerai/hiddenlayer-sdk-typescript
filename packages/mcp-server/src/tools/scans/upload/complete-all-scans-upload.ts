// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.upload',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/scan/v3/upload/{scan_id}',
  operationId: 'complete_multi_file_upload',
};

export const tool: Tool = {
  name: 'complete_all_scans_upload',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nScan uploaded files\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    scan_id: {\n      type: 'string',\n      description: 'Request to resource is successful'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan ID',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['scan_id'],
  },
  annotations: {},
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { scan_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.scans.upload.completeAll(scan_id)));
};

export default { metadata, tool, handler };
