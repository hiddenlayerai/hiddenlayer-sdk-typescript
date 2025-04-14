// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenlayerSDK from 'hiddenlayer-sdk';

const client = new HiddenlayerSDK({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource upload', () => {
  // skipped: tests are disabled for the time being
  test.skip('completeAll', async () => {
    const responsePromise = client.scan.v3.upload.completeAll('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('start: only required params', async () => {
    const responsePromise = client.scan.v3.upload.start({
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

  // skipped: tests are disabled for the time being
  test.skip('start: required and optional params', async () => {
    const response = await client.scan.v3.upload.start({
      model_name: 'model_name',
      model_version: 'model_version',
      requesting_entity: 'requesting_entity',
      location_alias: 'location_alias',
    });
  });
});
