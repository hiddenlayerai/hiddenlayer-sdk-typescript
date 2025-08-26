// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource jobs', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.scans.jobs.retrieve('00000000-0000-0000-0000-000000000000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scans.jobs.retrieve(
        '00000000-0000-0000-0000-000000000000',
        { has_detections: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenLayer.NotFoundError);
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scans.jobs.list(
        {
          compliance_status: ['COMPLIANT'],
          detection_category: 'detection_category',
          end_time: '2019-12-27T18:11:19.117Z',
          latest_per_model_version_only: true,
          limit: 1,
          model_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
          model_name: { contains: 'contains', eq: 'eq' },
          model_version_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
          offset: 0,
          scanner_version: '891.0.97194',
          severity: ['string'],
          sort: '-start_time',
          source: { eq: 'adhoc' },
          start_time: '2019-12-27T18:11:19.117Z',
          status: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenLayer.NotFoundError);
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
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
