// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource runtime', () => {
  // Mock server tests are disabled
  test.skip('evaluateInteraction: only required params', async () => {
    const responsePromise = client.runtime.evaluateInteraction({
      interaction: {
        messages: [
          { content: [{ text: 'What is the capital of France?', type: 'text' }], role: 'user' },
          { content: [{ text: 'The capital of France is Paris.', type: 'text' }], role: 'assistant' },
        ],
      },
      metadata: {
        model: 'gpt-4-turbo',
        provider: 'openai',
        requester_id: 'user-12345',
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('evaluateInteraction: required and optional params', async () => {
    const response = await client.runtime.evaluateInteraction({
      interaction: {
        messages: [
          {
            content: [{ text: 'What is the capital of France?', type: 'text' }],
            role: 'user',
            timestamp: { value: '2024-02-10T12:00:00Z' },
          },
          {
            content: [{ text: 'The capital of France is Paris.', type: 'text' }],
            role: 'assistant',
            timestamp: { value: '2024-02-10T12:00:00Z' },
          },
        ],
        tools_available: [
          {
            name: 'web_search',
            description: 'Search the web for current information',
            parameters: { foo: 'bar' },
          },
        ],
      },
      metadata: {
        model: 'gpt-4-turbo',
        provider: 'openai',
        requester_id: 'user-12345',
        external_session_id: 'sess_4b8cde94604f4c389406a0b2f806069a',
        external_session_ids: [{ id: 'id', source: 'source' }],
      },
      'HL-Project-Id': 'internal-search-chatbot',
    });
  });

  // Mock server tests are disabled
  test.skip('evaluateRequest: only required params', async () => {
    const responsePromise = client.runtime.evaluateRequest({
      body: {
        model: 'bar',
        messages: 'bar',
        max_tokens: 'bar',
        temperature: 'bar',
      },
    });
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
    const responsePromise = client.runtime.evaluateResponse({
      body: {
        id: 'bar',
        object: 'bar',
        created: 'bar',
        model: 'bar',
        choices: 'bar',
        usage: 'bar',
      },
    });
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
