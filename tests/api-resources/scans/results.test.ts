// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource results', () => {
  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('sarif: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scans.results.sarif(
        '00000000-0000-0000-0000-000000000000',
        { 'X-Correlation-Id': '6f22d397-6ca2-4359-8074-3318ab471fdf' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenLayer.NotFoundError);
  });
});
