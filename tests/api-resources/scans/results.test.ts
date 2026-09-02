// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource results', () => {
  // Mock server tests are disabled
  test.skip('listFiles', async () => {
    const responsePromise = client.scans.results.listFiles('00000000-0000-0000-0000-000000000000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listFiles: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scans.results.listFiles(
        '00000000-0000-0000-0000-000000000000',
        {
          cursor: 'cursor',
          has_detections: true,
          page_size: 50,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenLayer.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveSummary', async () => {
    const responsePromise = client.scans.results.retrieveSummary('00000000-0000-0000-0000-000000000000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('sarif', async () => {
    const responsePromise = client.scans.results.sarif('00000000-0000-0000-0000-000000000000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
