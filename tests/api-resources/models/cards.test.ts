// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource cards', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.models.cards.list();
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
      client.models.cards.list(
        {
          aidr_severity: ['SAFE'],
          aidr_status: 'ENABLED',
          limit: 50,
          model_created: { gte: '2019-12-27T18:11:19.117Z', lte: '2019-12-27T18:11:19.117Z' },
          model_name: { contains: 'contains', eq: 'eq' },
          modscan_severity: ['SAFE'],
          modscan_status: 'ENABLED',
          offset: 250,
          provider: ['AZURE'],
          sort: '-model_name',
          source: { contains: 'contains', eq: 'eq' },
          'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenLayer.NotFoundError);
  });
});
