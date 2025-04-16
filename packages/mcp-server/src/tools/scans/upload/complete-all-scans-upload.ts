// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.upload',
  operation: 'write',
  tags: [],
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

export const handler = (client: HiddenLayer, args: any) => {
  const { scan_id } = args;
  return client.scans.upload.completeAll(scan_id);
};

export default { metadata, tool, handler };
