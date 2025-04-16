// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'check_health_scans',
  description: 'Health check endpoint for Model Supply Chain Services',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: HiddenLayer, args: any) => {
  const {} = args;
  return client.scans.checkHealth();
};

export default { metadata, tool, handler };
