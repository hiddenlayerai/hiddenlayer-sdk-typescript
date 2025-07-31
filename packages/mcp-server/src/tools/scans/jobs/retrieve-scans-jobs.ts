// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.jobs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/scan/v3/results/{scan_id}',
  operationId: 'get_scan_results',
};

export const tool: Tool = {
  name: 'retrieve_scans_jobs',
  description: 'Get scan results',
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
    required: ['scan_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { scan_id, ...body } = args as any;
  return asTextContentResult(await client.scans.jobs.retrieve(scan_id, body));
};

export default { metadata, tool, handler };
