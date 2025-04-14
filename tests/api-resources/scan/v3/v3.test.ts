// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenlayerSDK from 'hiddenlayer-sdk';

const client = new HiddenlayerSDK({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v3', () => {
  // skipped: tests are disabled for the time being
  test.skip('checkHealth', async () => {
    const responsePromise = client.scan.v3.checkHealth();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('checkReadiness', async () => {
    const responsePromise = client.scan.v3.checkReadiness();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('createReport: only required params', async () => {
    const responsePromise = client.scan.v3.createReport('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      location: 'location',
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
  test.skip('createReport: required and optional params', async () => {
    const response = await client.scan.v3.createReport('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      location: 'location',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveResults', async () => {
    const responsePromise = client.scan.v3.retrieveResults('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveResults: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scan.v3.retrieveResults(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { cursor: 'cursor', page_size: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenlayerSDK.NotFoundError);
  });
});
