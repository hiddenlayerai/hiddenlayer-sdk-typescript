// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hiddenlayer-mcp/filtering';
import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nScan a remote model\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/scan_job',\n  $defs: {\n    scan_job: {\n      type: 'object',\n      title: 'ScanJob',\n      properties: {\n        inventory: {\n          type: 'object',\n          title: 'ScanJobInventory',\n          properties: {\n            model_name: {\n              type: 'string',\n              title: 'Model Name',\n              description: 'Name of the model'\n            },\n            model_version: {\n              type: 'string',\n              title: 'Model Version',\n              description: 'If you do not provide a version, one will be generated for you.'\n            },\n            requested_scan_location: {\n              type: 'string',\n              title: 'Requested Scan Location',\n              description: 'Location to be scanned'\n            },\n            requesting_entity: {\n              type: 'string',\n              title: 'Requesting Entity',\n              description: 'Entity that requested the scan'\n            },\n            origin: {\n              type: 'string',\n              title: 'Origin',\n              description: 'Specifies the platform or service where the model originated before being scanned'\n            },\n            request_source: {\n              type: 'string',\n              title: 'Request Source',\n              description: 'Identifies the system that requested the scan',\n              enum: [                'Hybrid Upload',\n                'API Upload',\n                'Integration',\n                'UI Upload'\n              ]\n            }\n          },\n          required: [            'model_name',\n            'model_version',\n            'requested_scan_location',\n            'requesting_entity'\n          ]\n        },\n        scan_id: {\n          type: 'string',\n          title: 'Scan ID',\n          description: 'unique identifier for the scan'\n        },\n        status: {\n          type: 'string',\n          title: 'Status',\n          description: 'Status of the scan',\n          enum: [            'pending',\n            'running',\n            'done',\n            'failed',\n            'canceled'\n          ]\n        }\n      },\n      required: [        'inventory'\n      ]\n    }\n  }\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['access', 'inventory'],
  },
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.scans.jobs.request(body)));
};

export default { metadata, tool, handler };
