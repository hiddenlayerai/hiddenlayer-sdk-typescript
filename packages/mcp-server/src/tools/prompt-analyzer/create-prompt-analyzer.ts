// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hiddenlayer-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import HiddenLayer from 'hiddenlayer';

export const metadata: Metadata = {
  resource: 'prompt-analyzer',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v1/submit/prompt-analyzer',
  operationId: 'promptAnalyzer',
};

export const tool: Tool = {
  name: 'create_prompt_analyzer',
  description: 'Analyze LLM Prompt and Response',
  inputSchema: {
    type: 'object',
    properties: {
      prompt: {
        type: 'string',
      },
      model: {
        type: 'string',
      },
      output: {
        type: 'string',
      },
      'X-LLM-Block-Guardrail-Detection': {
        type: 'boolean',
      },
      'X-LLM-Block-Input-Code-Detection': {
        type: 'boolean',
      },
      'X-LLM-Block-Input-DOS-Detection': {
        type: 'boolean',
      },
      'X-LLM-Block-Input-PII': {
        type: 'boolean',
      },
      'X-LLM-Block-Output-Code-Detection': {
        type: 'boolean',
      },
      'X-LLM-Block-Output-PII': {
        type: 'boolean',
      },
      'X-LLM-Block-Prompt-Injection': {
        type: 'boolean',
      },
      'X-LLM-Block-Unsafe': {
        type: 'boolean',
      },
      'X-LLM-Block-Unsafe-Input': {
        type: 'boolean',
      },
      'X-LLM-Block-Unsafe-Output': {
        type: 'boolean',
      },
      'X-LLM-Entity-Type': {
        type: 'string',
        description: 'The type of entity to redact',
        enum: ['strict', 'all'],
      },
      'X-LLM-Input-DOS-Detection-Threshold': {
        type: 'string',
      },
      'X-LLM-Prompt-Injection-Scan-Type': {
        type: 'string',
        description: 'The type of prompt injection scan to use',
        enum: ['quick', 'full'],
      },
      'X-LLM-Redact-Input-PII': {
        type: 'boolean',
      },
      'X-LLM-Redact-Output-PII': {
        type: 'boolean',
      },
      'X-LLM-Redact-Type': {
        type: 'string',
        description: 'The type of redaction to use',
        enum: ['entity', 'strict'],
      },
      'X-LLM-Skip-Guardrail-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Input-Code-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Input-DOS-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Input-PII-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Input-URL-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Output-Code-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Output-PII-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Output-URL-Detection': {
        type: 'boolean',
      },
      'X-LLM-Skip-Prompt-Injection-Detection': {
        type: 'boolean',
      },
      'X-Requester-Id': {
        type: 'string',
      },
    },
    required: ['prompt'],
  },
  annotations: {},
};

export const handler = async (client: HiddenLayer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.promptAnalyzer.create(body));
};

export default { metadata, tool, handler };
