// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.jobs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/scan/v3/jobs',
  operationId: 'get_scan_jobs',
};

export const tool: Tool = {
  name: 'list_scans_jobs',
  description: 'List all Model Scan Jobs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.scans.jobs.list());
};

export default { metadata, tool, handler };
