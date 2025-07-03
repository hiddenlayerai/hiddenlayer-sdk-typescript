// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'scans.jobs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/scan/v3/jobs',
  operationId: 'create_scan_job',
};

export const tool: Tool = {
  name: 'request_scans_jobs',
  description: 'Scan a remote model',
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
        title: 'ScanJobInventory',
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
        required: ['model_name', 'model_version', 'requested_scan_location', 'requesting_entity'],
      },
    },
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.scans.jobs.request(body));
};

export default { metadata, tool, handler };
