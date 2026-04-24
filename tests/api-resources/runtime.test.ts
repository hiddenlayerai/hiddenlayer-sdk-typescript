// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';

const client = new HiddenLayer({ bearerToken: 'My Bearer Token', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource runtime', () => {
  // Mock server tests are disabled
  test.skip('evaluateRequest: only required params', async () => {
    const responsePromise = client.runtime.evaluateRequest({ body: {
    model: 'bar',
    messages: 'bar',
    max_tokens: 'bar',
    temperature: 'bar',
  } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('evaluateRequest: required and optional params', async () => {
    const response = await client.runtime.evaluateRequest({
    body: {
    model: 'bar',
    messages: 'bar',
    max_tokens: 'bar',
    temperature: 'bar',
  },
    'HL-Project-Id': 'internal-search-chatbot',
    'HL-Runtime-Session-Id': 'sess_4b8cde94604f4c389406a0b2f806069a',
  });
  });

  // Mock server tests are disabled
  test.skip('evaluateResponse: only required params', async () => {
    const responsePromise = client.runtime.evaluateResponse({ body: {
    id: 'bar',
    object: 'bar',
    created: 'bar',
    model: 'bar',
    choices: 'bar',
    usage: 'bar',
  } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('evaluateResponse: required and optional params', async () => {
    const response = await client.runtime.evaluateResponse({
    body: {
    id: 'bar',
    object: 'bar',
    created: 'bar',
    model: 'bar',
    choices: 'bar',
    usage: 'bar',
  },
    'HL-Project-Id': 'internal-search-chatbot',
    'HL-Runtime-Session-Id': 'sess_4b8cde94604f4c389406a0b2f806069a',
  });
  });
});
