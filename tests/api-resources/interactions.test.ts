// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource interactions', () => {
  // Prism tests are disabled
  test.skip('analyze: only required params', async () => {
    const responsePromise = client.interactions.analyze({
      metadata: { model: 'gpt-5', requester_id: 'user-1234' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('analyze: required and optional params', async () => {
    const response = await client.interactions.analyze({
      metadata: { model: 'gpt-5', requester_id: 'user-1234', provider: 'openai' },
      input: { messages: [{ content: 'What the largest moon of jupiter?', role: 'user' }] },
      output: { messages: [{ content: 'The largest moon of Jupiter is Ganymede.', role: 'assistant' }] },
      'HL-Project-Id': 'internal-search-chatbot',
      'X-Correlation-Id': '6f22d397-6ca2-4359-8074-3318ab471fdf',
    });
  });
});
