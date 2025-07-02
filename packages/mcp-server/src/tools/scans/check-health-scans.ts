// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/scans/v3/health',
  operationId: 'modelscanner_api_v3_health_check',
};

export const tool: Tool = {
  name: 'check_health_scans',
  description: 'Health check endpoint for Model Supply Chain Services',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const response = await client.scans.checkHealth().asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
