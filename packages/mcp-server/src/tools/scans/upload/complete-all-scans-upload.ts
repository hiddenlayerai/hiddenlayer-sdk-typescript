// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
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
  description: 'Indicate All files are uploaded and start the scan',
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan Id to which the call belongs',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { scan_id, ...body } = args as any;
  return asTextContentResult(await client.scans.upload.completeAll(scan_id));
};

export default { metadata, tool, handler };
