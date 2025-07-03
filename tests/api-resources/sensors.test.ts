// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sensors', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.sensors.create({
      plaintext_name: 'plaintext_name',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.sensors.create({
      plaintext_name: 'plaintext_name',
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
      active: true,
      adhoc: true,
      tags: { foo: 'bar' },
      version: 0,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.sensors.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.sensors.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('delete: only required params', async () => {
    const responsePromise = client.sensors.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.sensors.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('query: only required params', async () => {
    const responsePromise = client.sensors.query({
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
  test.skip('query: required and optional params', async () => {
    const response = await client.sensors.query({
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
      filter: {
        active: true,
        created_at_start: '2019-12-27T18:11:19.117Z',
        created_at_stop: '2019-12-27T18:11:19.117Z',
        plaintext_name: 'plaintext_name',
        source: 'adhoc',
        version: 0,
      },
      order_by: 'order_by',
      order_dir: 'asc',
      page_number: 0,
      page_size: 0,
    });
  });
});
