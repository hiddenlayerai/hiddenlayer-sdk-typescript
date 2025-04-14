// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenlayerSDK from 'hiddenlayer-sdk';

const client = new HiddenlayerSDK({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource results', () => {
  // skipped: tests are disabled for the time being
  test.skip('retrieve', async () => {
    const responsePromise = client.scan.v3.results.retrieve('00000000-0000-0000-0000-000000000000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scan.v3.results.retrieve(
        '00000000-0000-0000-0000-000000000000',
        { has_detections: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenlayerSDK.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.scan.v3.results.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.scan.v3.results.list(
        {
          end_time: '2019-12-27T18:11:19.117Z',
          latest_per_model_version_only: true,
          limit: 1,
          model_ids: ['string'],
          model_version_ids: ['string'],
          offset: 0,
          severity: ['string'],
          sort: 'sort',
          start_time: '2019-12-27T18:11:19.117Z',
          status: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(HiddenlayerSDK.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('completePart: only required params', async () => {
    const responsePromise = client.scan.v3.results.completePart('00000000-0000-0000-0000-000000000000', {
      detection_count: 0,
      file_count: 0,
      files_with_detections_count: 0,
      inventory: {
        model_id: '00000000-0000-0000-0000-000000000000',
        model_name: 'keras-tf-2025-05-27',
        model_version: '1.0.0',
        model_version_id: '00000000-0000-0000-0000-000000000000',
        requested_scan_location: '/files-to-scan',
      },
      body_scan_id: 'scan_id',
      start_time: '2019-12-27T18:11:19.117Z',
      status: 'pending',
      version: 'version',
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
  test.skip('completePart: required and optional params', async () => {
    const response = await client.scan.v3.results.completePart('00000000-0000-0000-0000-000000000000', {
      detection_count: 0,
      file_count: 0,
      files_with_detections_count: 0,
      inventory: {
        model_id: '00000000-0000-0000-0000-000000000000',
        model_name: 'keras-tf-2025-05-27',
        model_version: '1.0.0',
        model_version_id: '00000000-0000-0000-0000-000000000000',
        requested_scan_location: '/files-to-scan',
        model_source: 'adhoc',
        requesting_entity: 'requesting_entity',
      },
      body_scan_id: 'scan_id',
      start_time: '2019-12-27T18:11:19.117Z',
      status: 'pending',
      version: 'version',
      has_detections: true,
      detection_categories: ['string'],
      end_time: '2019-12-27T18:11:19.117Z',
      file_results: [
        {
          details: {
            estimated_time: 'estimated_time',
            file_type: 'safetensors',
            sha256: 'a54d88e06612d820bc3be72877c74f257b561b19',
            file_size: '9 GB',
            file_size_bytes: 9663676416,
            file_type_details: { foo: 'bar' },
            md5: 'ce114e4501d2f4e2dcea3e17b546f339',
            tlsh: 'T1C50757F93C74D00C05B70C0793A1D5A9DF3F6D3A2F7AD940F3BFBF07B3BDF5A1D293',
          },
          end_time: '2024-10-16T23:38:32.354Z',
          file_instance_id: 'file_instance_id',
          file_location: 'file_location',
          seen: '2024-10-22T17:59:12.431Z',
          start_time: '2024-10-16T23:38:32.278Z',
          status: 'skipped',
          detections: [
            {
              category: 'Arbitrary Code Execution',
              description:
                'Found lambda embedded in keras model allowing custom layers that support  arbitrary expression execution',
              detection_id: '00000000-0000-0000-0000-000000000000',
              mitre_atlas: [{ tactic: 'AML.TA0001', technique: 'AML.T0003.45' }],
              owasp: ['LLM21'],
              rule_id: 'PICKLE_0055_202408',
              severity: 'low',
              cve: ['CVE-7321-910225'],
              cwe: '',
              cwe_href: 'cwe_href',
              impact: 'critical',
              likelihood: 'medium',
              risk: 'MALICIOUS',
              rule_details: [
                { description: 'description', status: 'created', status_at: '2019-12-27T18:11:19.117Z' },
              ],
              technical_blog_href: 'technical_blog_href',
            },
          ],
          file_results: [],
        },
      ],
      severity: 'low',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('start: only required params', async () => {
    const responsePromise = client.scan.v3.results.start('00000000-0000-0000-0000-000000000000', {
      detection_count: 0,
      file_count: 0,
      files_with_detections_count: 0,
      inventory: {
        model_id: '00000000-0000-0000-0000-000000000000',
        model_name: 'keras-tf-2025-05-27',
        model_version: '1.0.0',
        model_version_id: '00000000-0000-0000-0000-000000000000',
        requested_scan_location: '/files-to-scan',
      },
      body_scan_id: 'scan_id',
      start_time: '2019-12-27T18:11:19.117Z',
      status: 'pending',
      version: 'version',
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
    const response = await client.scan.v3.results.start('00000000-0000-0000-0000-000000000000', {
      detection_count: 0,
      file_count: 0,
      files_with_detections_count: 0,
      inventory: {
        model_id: '00000000-0000-0000-0000-000000000000',
        model_name: 'keras-tf-2025-05-27',
        model_version: '1.0.0',
        model_version_id: '00000000-0000-0000-0000-000000000000',
        requested_scan_location: '/files-to-scan',
        model_source: 'adhoc',
        requesting_entity: 'requesting_entity',
      },
      body_scan_id: 'scan_id',
      start_time: '2019-12-27T18:11:19.117Z',
      status: 'pending',
      version: 'version',
      has_detections: true,
      detection_categories: ['string'],
      end_time: '2019-12-27T18:11:19.117Z',
      file_results: [
        {
          details: {
            estimated_time: 'estimated_time',
            file_type: 'safetensors',
            sha256: 'a54d88e06612d820bc3be72877c74f257b561b19',
            file_size: '9 GB',
            file_size_bytes: 9663676416,
            file_type_details: { foo: 'bar' },
            md5: 'ce114e4501d2f4e2dcea3e17b546f339',
            tlsh: 'T1C50757F93C74D00C05B70C0793A1D5A9DF3F6D3A2F7AD940F3BFBF07B3BDF5A1D293',
          },
          end_time: '2024-10-16T23:38:32.354Z',
          file_instance_id: 'file_instance_id',
          file_location: 'file_location',
          seen: '2024-10-22T17:59:12.431Z',
          start_time: '2024-10-16T23:38:32.278Z',
          status: 'skipped',
          detections: [
            {
              category: 'Arbitrary Code Execution',
              description:
                'Found lambda embedded in keras model allowing custom layers that support  arbitrary expression execution',
              detection_id: '00000000-0000-0000-0000-000000000000',
              mitre_atlas: [{ tactic: 'AML.TA0001', technique: 'AML.T0003.45' }],
              owasp: ['LLM21'],
              rule_id: 'PICKLE_0055_202408',
              severity: 'low',
              cve: ['CVE-7321-910225'],
              cwe: '',
              cwe_href: 'cwe_href',
              impact: 'critical',
              likelihood: 'medium',
              risk: 'MALICIOUS',
              rule_details: [
                { description: 'description', status: 'created', status_at: '2019-12-27T18:11:19.117Z' },
              ],
              technical_blog_href: 'technical_blog_href',
            },
          ],
          file_results: [],
        },
      ],
      severity: 'low',
    });
  });
});
