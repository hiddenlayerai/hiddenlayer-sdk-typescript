// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource cards', () => {
  // skipped: tests are disabled for the time being
  test.skip('list: only required params', async () => {
    const responsePromise = client.models.cards.list({
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
    const response = await client.models.cards.list({
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
      aidr_severity: ['SAFE'],
      aidr_status: 'ENABLED',
      limit: 1,
      model_created: { gte: '2019-12-27T18:11:19.117Z', lte: '2019-12-27T18:11:19.117Z' },
      model_name: { contains: 'contains', eq: 'eq' },
      modscan_severity: ['SAFE'],
      modscan_status: 'ENABLED',
      offset: 0,
      provider: ['AZURE'],
      sort: '-model_name',
      source: { contains: 'contains', eq: 'eq' },
    });
  });
});
