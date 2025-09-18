// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource file', () => {
  // Prism tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.scans.upload.file.add('00000000-0000-0000-0000-000000000000', {
      'file-content-length': 12345,
      'file-name': 'exampleFile.txt',
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
  test.skip('add: required and optional params', async () => {
    const response = await client.scans.upload.file.add('00000000-0000-0000-0000-000000000000', {
      'file-content-length': 12345,
      'file-name': 'exampleFile.txt',
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });

  // Prism tests are disabled
  test.skip('complete: only required params', async () => {
    const responsePromise = client.scans.upload.file.complete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      scan_id: '00000000-0000-0000-0000-000000000000',
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
  test.skip('complete: required and optional params', async () => {
    const response = await client.scans.upload.file.complete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      scan_id: '00000000-0000-0000-0000-000000000000',
      'X-Correlation-Id': '00000000-0000-0000-0000-000000000000',
    });
  });
});
