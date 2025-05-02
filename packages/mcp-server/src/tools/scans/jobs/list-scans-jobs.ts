// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.jobs',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_scans_jobs',
  description: 'List all Model Scan Jobs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  return client.scans.jobs.list();
};

export default { metadata, tool, handler };
