// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer-sdk';

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
      'HL-Project-Id': 'internal-search-chatbot',
      'X-Requester-Id': 'X-Requester-Id',
    });
  });
});
