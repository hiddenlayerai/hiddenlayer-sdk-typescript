// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource jobs', () => {
  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.scans.jobs.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('request: only required params', async () => {
    const responsePromise = client.scans.jobs.request({
      access: {},
      inventory: {
        model_name: 'some-model',
        model_version: '',
        requested_scan_location: 'owner/repo',
        requesting_entity: 'some-user@example.com',
      },
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
  test.skip('request: required and optional params', async () => {
    const response = await client.scans.jobs.request({
      access: { source: 'HUGGING_FACE' },
      inventory: {
        model_name: 'some-model',
        model_version: '',
        requested_scan_location: 'owner/repo',
        requesting_entity: 'some-user@example.com',
        origin: 'Hugging Face',
        request_source: 'API Upload',
      },
    });
  });
});
