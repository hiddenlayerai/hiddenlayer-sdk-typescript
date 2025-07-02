// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../../';
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
  description: 'Add file to V3 Upload',
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan Id to which the file belongs',
      },
      'file-content-length': {
        type: 'integer',
      },
      'file-name': {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { scan_id, ...body } = args as any;
  return asTextContentResult(await client.scans.upload.file.add(scan_id, body));
};

export default { metadata, tool, handler };
