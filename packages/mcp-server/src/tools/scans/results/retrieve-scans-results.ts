// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.results',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_scans_results',
  description: 'Get Result of a Model Scan',
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan ID',
      },
      has_detections: {
        type: 'boolean',
        description: 'Filter file_results to only those that have detections (and parents)',
      },
    },
  },
};

export const handler = (client: HiddenLayer, args: any) => {
  const { scan_id, ...body } = args;
  return client.scans.results.retrieve(scan_id, body);
};

export default { metadata, tool, handler };
