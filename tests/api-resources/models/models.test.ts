// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource models', () => {
  // skipped: tests are disabled for the time being
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.models.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.models.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('delete: only required params', async () => {
    const responsePromise = client.models.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete: required and optional params', async () => {
    const response = await client.models.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });
});
