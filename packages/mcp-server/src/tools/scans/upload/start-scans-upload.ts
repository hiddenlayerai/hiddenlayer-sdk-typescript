// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.upload',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/scan/v3/upload',
  operationId: 'begin_multi_file_upload',
};

export const tool: Tool = {
  name: 'start_scans_upload',
  description: 'Start a model upload',
  inputSchema: {
    type: 'object',
    properties: {
      model_name: {
        type: 'string',
        title: 'Model Name',
        description: 'Model name',
      },
      model_version: {
        type: 'string',
        title: 'Model Version',
        description: 'Model version',
      },
      requesting_entity: {
        type: 'string',
        title: 'Requesting Entity',
        description: 'Requesting entity',
      },
      'X-Correlation-Id': {
        type: 'string',
      },
      location_alias: {
        type: 'string',
        title: 'Requested Location Alias',
        description: 'Requested location alias',
      },
      origin: {
        type: 'string',
        title: 'Origin',
        description: 'Specifies the platform or service where the model originated before being scanned',
      },
      request_source: {
        type: 'string',
        title: 'Request Source',
        description: 'Identifies the system that requested the scan',
        enum: ['Hybrid Upload', 'API Upload', 'Integration', 'UI Upload'],
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.scans.upload.start(body));
};

export default { metadata, tool, handler };
