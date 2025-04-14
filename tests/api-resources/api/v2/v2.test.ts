// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenlayerSDK from 'hiddenlayer-sdk';

const client = new HiddenlayerSDK({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v2', () => {
  // skipped: tests are disabled for the time being
  test.skip('submitVectors: only required params', async () => {
    const responsePromise = client.api.v2.submitVectors({
      input_layer: 'input_layer',
      input_layer_dtype: 'input_layer_dtype',
      input_layer_shape: [0],
      output_layer: 'output_layer',
      output_layer_dtype: 'output_layer_dtype',
      output_layer_shape: [0],
      sensor_id: 'sensor_id',
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
  test.skip('submitVectors: required and optional params', async () => {
    const response = await client.api.v2.submitVectors({
      input_layer: 'input_layer',
      input_layer_dtype: 'input_layer_dtype',
      input_layer_shape: [0],
      output_layer: 'output_layer',
      output_layer_dtype: 'output_layer_dtype',
      output_layer_shape: [0],
      sensor_id: 'sensor_id',
      event_time: 'event_time',
      metadata: {},
      predictions: [0],
      requester_id: 'requester_id',
      tags: ['string'],
    });
  });
});
