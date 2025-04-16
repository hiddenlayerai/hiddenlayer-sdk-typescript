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
  name: 'start_scans_upload',
  description: 'Start V3 Upload',
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
      location_alias: {
        type: 'string',
        title: 'Requested Location Alias',
        description: 'Requested location alias',
      },
    },
  },
};

export const handler = (client: HiddenLayer, args: any) => {
  const { ...body } = args;
  return client.scans.upload.start(body);
};

export default { metadata, tool, handler };
