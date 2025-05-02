// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.jobs',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'request_scans_jobs',
  description: 'Request a Model Scan Job',
  inputSchema: {
    type: 'object',
    properties: {
      access: {
        type: 'object',
        properties: {
          source: {
            type: 'string',
            title: 'Source',
            enum: [
              'LOCAL',
              'AWS_PRESIGNED',
              'AWS_IAM_ROLE',
              'AZURE_BLOB_SAS',
              'AZURE_BLOB_AD',
              'GOOGLE_SIGNED',
              'GOOGLE_OAUTH',
              'HUGGING_FACE',
            ],
          },
        },
        required: [],
      },
      inventory: {
        type: 'object',
        title: 'ScanModelDetails',
        properties: {
          model_name: {
            type: 'string',
            title: 'Model Name',
            description: 'Name of the model',
          },
          model_version: {
            type: 'string',
            title: 'Model Version',
            description: 'If you do not provide a version, one will be generated for you.',
          },
          requested_scan_location: {
            type: 'string',
            title: 'Requested Scan Location',
            description: 'Location to be scanned',
          },
          requesting_entity: {
            type: 'string',
            title: 'Requesting Entity',
            description: 'Entity that requested the scan',
          },
        },
        required: ['model_name', 'model_version', 'requested_scan_location', 'requesting_entity'],
      },
    },
  },
};

export const handler = (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.scans.jobs.request(body);
};

export default { metadata, tool, handler };
