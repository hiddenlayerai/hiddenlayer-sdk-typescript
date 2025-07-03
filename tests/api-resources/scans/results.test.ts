// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource results', () => {
  // skipped: tests are disabled for the time being
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.scans.results.retrieve('00000000-0000-0000-0000-000000000000', {
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
    const response = await client.scans.results.retrieve('00000000-0000-0000-0000-000000000000', {
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
      has_detections: true,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('list: only required params', async () => {
    const responsePromise = client.scans.results.list({
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
  test.skip('list: required and optional params', async () => {
    const response = await client.scans.results.list({
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
      detection_category: 'detection_category',
      end_time: '2019-12-27T18:11:19.117Z',
      latest_per_model_version_only: true,
      limit: 1,
      model_ids: ['string'],
      model_name: { contains: 'contains', eq: 'eq' },
      model_version_ids: ['string'],
      offset: 0,
      scanner_version: 'scanner_version',
      severity: ['string'],
      sort: 'sort',
      source: { eq: 'adhoc' },
      start_time: '2019-12-27T18:11:19.117Z',
      status: ['string'],
    });
  });
});
