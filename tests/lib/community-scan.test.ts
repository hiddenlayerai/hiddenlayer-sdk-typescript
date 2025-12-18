// Tests for custom community scan functionality

import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk ';
import { CommunityScanner, CommunityScanSource } from 'hiddenlayer/lib/community-scan';
import type { ScanReport } from 'hiddenlayer/resources/scans/results';

describe('CommunityScanner', () => {
  let client: HiddenLayer;
  let scanner: CommunityScanner;
  let mockRequest: jest.Mock;
  let mockRetrieve: jest.Mock;

  beforeEach(() => {
    client = new HiddenLayer({ bearerToken: 'test-token' });
    scanner = new CommunityScanner(client);

    // Mock the API methods
    mockRequest = jest.fn();
    mockRetrieve = jest.fn();
    client.scans.jobs.request = mockRequest;
    client.scans.jobs.retrieve = mockRetrieve;
  });

  describe('integration', () => {
    test('client has communityScanner property', () => {
      const testClient = new HiddenLayer({ bearerToken: 'test-token' });
      expect(testClient.communityScanner).toBeInstanceOf(CommunityScanner);
    });

    test('communityScanner property is cached', () => {
      const testClient = new HiddenLayer({ bearerToken: 'test-token' });
      const scanner1 = testClient.communityScanner;
      const scanner2 = testClient.communityScanner;
      expect(scanner1).toBe(scanner2);
    });
  });

  describe('communityScan', () => {
    test('creates scan job with correct parameters', async () => {
      const mockScanJob = { scan_id: 'test-scan-123' };
      const mockScanReport: ScanReport = {
        scan_id: 'test-scan-123',
        status: 'pending',
        summary: {
          detection_count: 0,
          file_count: 0,
          files_with_detections_count: 0,
        },
        detection_count: 0,
        file_count: 0,
        files_with_detections_count: 0,
        inventory: {
          model_id: 'test-model-id',
          model_version_id: 'test-model-version-id',
          model_name: 'test-model',
          requested_scan_location: 'https://example.com/model.pkl',
        },
        start_time: '2024-01-01T00:00:00Z',
        version: '1.0.0',
      };

      mockRequest.mockResolvedValue(mockScanJob);
      mockRetrieve.mockResolvedValue(mockScanReport);

      const result = await scanner.communityScan({
        modelName: 'test-model',
        modelPath: 'https://example.com/model.pkl',
        modelSource: CommunityScanSource.AWS_PRESIGNED,
        waitForResults: false,
      });

      expect(mockRequest).toHaveBeenCalledWith({
        access: { source: 'AWS_PRESIGNED' },
        inventory: {
          model_name: 'test-model',
          model_version: 'main',
          requested_scan_location: 'https://example.com/model.pkl',
          requesting_entity: 'hiddenlayer-typescript-sdk',
          request_source: 'API Upload',
          origin: '',
        },
      });

      expect(mockRetrieve).toHaveBeenCalledWith('test-scan-123');
      expect(result).toBe(mockScanReport);
    });

    test('handles custom parameters', async () => {
      const mockScanJob = { scan_id: 'test-scan-123' };
      mockRequest.mockResolvedValue(mockScanJob);
      mockRetrieve.mockResolvedValue({ status: 'pending' });

      await scanner.communityScan({
        modelName: 'custom-model',
        modelPath: 'https://custom.com/model.bin',
        modelSource: CommunityScanSource.HUGGING_FACE,
        modelVersion: 'v2.0',
        waitForResults: false,
        requestSource: 'Integration',
        origin: 'CustomOrigin',
      });

      expect(mockRequest).toHaveBeenCalledWith({
        access: { source: 'HUGGING_FACE' },
        inventory: {
          model_name: 'custom-model',
          model_version: 'v2.0',
          requested_scan_location: 'https://custom.com/model.bin',
          requesting_entity: 'hiddenlayer-typescript-sdk',
          request_source: 'Integration',
          origin: 'CustomOrigin',
        },
      });
    });

    test('throws error when scan_id is missing', async () => {
      const mockScanJob = { scan_id: null };
      mockRequest.mockResolvedValue(mockScanJob);

      await expect(
        scanner.communityScan({
          modelName: 'test-model',
          modelPath: 'https://example.com/model.pkl',
          modelSource: 'AWS_PRESIGNED',
        }),
      ).rejects.toThrow('scan_id must have a value');
    });

    test('waits for results when waitForResults is true', async () => {
      const mockScanJob = { scan_id: 'test-scan-123' };
      const pendingReport = { scan_id: 'test-scan-123', status: 'pending' };
      const runningReport = { scan_id: 'test-scan-123', status: 'running' };
      const doneReport: ScanReport = {
        scan_id: 'test-scan-123',
        status: 'done',
        summary: {
          detection_count: 2,
          file_count: 1,
          files_with_detections_count: 1,
        },
        detection_count: 2,
        file_count: 1,
        files_with_detections_count: 1,
        inventory: {
          model_id: 'test-model-id',
          model_version_id: 'test-model-version-id',
          model_name: 'test-model',
          requested_scan_location: 'https://example.com/model.pkl',
        },
        start_time: '2024-01-01T00:00:00Z',
        version: '1.0.0',
      };

      mockRequest.mockResolvedValue(mockScanJob);
      mockRetrieve
        .mockResolvedValueOnce(pendingReport)
        .mockResolvedValueOnce(runningReport)
        .mockResolvedValueOnce(doneReport);

      // Mock sleep to speed up test
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        callback();
        return {} as NodeJS.Timeout;
      });

      const result = await scanner.communityScan({
        modelName: 'test-model',
        modelPath: 'https://example.com/model.pkl',
        modelSource: 'AWS_PRESIGNED',
        waitForResults: true,
      });

      expect(mockRetrieve).toHaveBeenCalledTimes(3);
      expect(result).toBe(doneReport);
      expect(result.status).toBe('done');

      jest.restoreAllMocks();
    });
  });

  describe('CommunityScanSource constants', () => {
    test('has all expected source constants', () => {
      expect(CommunityScanSource.LOCAL).toBe('LOCAL');
      expect(CommunityScanSource.AWS_PRESIGNED).toBe('AWS_PRESIGNED');
      expect(CommunityScanSource.AWS_IAM_ROLE).toBe('AWS_IAM_ROLE');
      expect(CommunityScanSource.AZURE_BLOB_SAS).toBe('AZURE_BLOB_SAS');
      expect(CommunityScanSource.AZURE_BLOB_AD).toBe('AZURE_BLOB_AD');
      expect(CommunityScanSource.GOOGLE_SIGNED).toBe('GOOGLE_SIGNED');
      expect(CommunityScanSource.GOOGLE_OAUTH).toBe('GOOGLE_OAUTH');
      expect(CommunityScanSource.HUGGING_FACE).toBe('HUGGING_FACE');
    });
  });
});
