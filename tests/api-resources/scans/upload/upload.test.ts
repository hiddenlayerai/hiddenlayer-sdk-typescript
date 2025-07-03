// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource upload', () => {
  // skipped: tests are disabled for the time being
  test.skip('completeAll: only required params', async () => {
    const responsePromise = client.scans.upload.completeAll('00000000-0000-0000-0000-000000000000', {
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
  test.skip('completeAll: required and optional params', async () => {
    const response = await client.scans.upload.completeAll('00000000-0000-0000-0000-000000000000', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('start: only required params', async () => {
    const responsePromise = client.scans.upload.start({
      model_name: 'model_name',
      model_version: 'model_version',
      requesting_entity: 'requesting_entity',
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
  test.skip('start: required and optional params', async () => {
    const response = await client.scans.upload.start({
      model_name: 'model_name',
      model_version: 'model_version',
      requesting_entity: 'requesting_entity',
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
      location_alias: 'location_alias',
      origin: 'Hugging Face',
      request_source: 'API Upload',
    });
  });
});
