// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource promptAnalyzer', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.promptAnalyzer.create({ prompt: 'Hello World' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.promptAnalyzer.create({
      prompt: 'Hello World',
      model: 'mistral-tiny',
      output: 'Hello, how can I help you today?',
      'X-LLM-Block-Guardrail-Detection': true,
      'X-LLM-Block-Input-Code-Detection': true,
      'X-LLM-Block-Input-DOS-Detection': true,
      'X-LLM-Block-Input-PII': true,
      'X-LLM-Block-Output-Code-Detection': true,
      'X-LLM-Block-Output-PII': true,
      'X-LLM-Block-Prompt-Injection': true,
      'X-LLM-Block-Unsafe': true,
      'X-LLM-Block-Unsafe-Input': true,
      'X-LLM-Block-Unsafe-Output': true,
      'X-LLM-Entity-Type': 'strict',
      'X-LLM-Input-DOS-Detection-Threshold': 'X-LLM-Input-DOS-Detection-Threshold',
      'X-LLM-Prompt-Injection-Scan-Type': 'quick',
      'X-LLM-Redact-Input-PII': true,
      'X-LLM-Redact-Output-PII': true,
      'X-LLM-Redact-Type': 'entity',
      'X-LLM-Skip-Guardrail-Detection': true,
      'X-LLM-Skip-Input-Code-Detection': true,
      'X-LLM-Skip-Input-DOS-Detection': true,
      'X-LLM-Skip-Input-PII-Detection': true,
      'X-LLM-Skip-Input-URL-Detection': true,
      'X-LLM-Skip-Output-Code-Detection': true,
      'X-LLM-Skip-Output-PII-Detection': true,
      'X-LLM-Skip-Output-URL-Detection': true,
      'X-LLM-Skip-Prompt-Injection-Detection': true,
      'X-Requester-Id': 'X-Requester-Id',
    });
  });
});
