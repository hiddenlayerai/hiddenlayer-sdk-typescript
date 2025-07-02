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
  httpPath: '/scans/v3/results/{scan_id}',
  operationId: 'get_scan_results1',
};

export const tool: Tool = {
  name: 'retrieve_results_scans',
  description: 'Retrieve Model Scan Results',
  inputSchema: {
    type: 'object',
    properties: {
      scan_id: {
        type: 'string',
        title: 'Scan Id to which the report belongs',
      },
      cursor: {
        type: 'string',
        title: 'Results Cursor Value',
        description: 'Cursor value returned from a previous request. Used to fetch the next page of results.',
      },
      page_size: {
        type: 'integer',
        title: 'Page Size',
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const { scan_id, ...body } = args as any;
  return asTextContentResult((await client.scans.retrieveResults(scan_id, body)) as object);
};

export default { metadata, tool, handler };
