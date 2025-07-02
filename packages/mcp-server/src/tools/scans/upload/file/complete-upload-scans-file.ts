// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
  description: 'Indicate that upload is completed for {file_id}',
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan Id to which the file belongs',
      },
      file_id: {
        type: 'string',
        title: 'file_id to which the file belongs',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { file_id, ...body } = args as any;
  return asTextContentResult(await client.scans.upload.file.complete(file_id, body));
};

export default { metadata, tool, handler };
