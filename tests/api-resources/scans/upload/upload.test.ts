// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource upload', () => {
  // Prism tests are disabled
  test.skip('completeAll', async () => {
    const responsePromise = client.scans.upload.completeAll('00000000-0000-0000-0000-000000000000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('completeAll: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scans.upload.completeAll(
        '00000000-0000-0000-0000-000000000000',
        { 'X-Correlation-Id': '00000000-0000-0000-0000-000000000000' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenLayer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('start: only required params', async () => {
    const responsePromise = client.scans.upload.start({
      model_name: 'model_name',
      model_version: 'model_version',
      requesting_entity: 'requesting_entity',
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
  test.skip('start: required and optional params', async () => {
    const response = await client.scans.upload.start({
      model_name: 'model_name',
      model_version: 'model_version',
      requesting_entity: 'requesting_entity',
      location_alias: 'location_alias',
      origin: 'Hugging Face',
      request_source: 'Hybrid Upload',
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });
});
