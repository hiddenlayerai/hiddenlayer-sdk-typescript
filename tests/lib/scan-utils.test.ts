// Tests for scan utility functions

import HiddenLayer from 'hiddenlayer';
import { APIError } from 'hiddenlayer/core/error';
import { getScanResults, waitForScanResults, ScanStatus } from 'hiddenlayer/lib/scan-utils';
import type { ScanReport } from 'hiddenlayer/resources/scans/results';

describe('scan-utils', () => {
  let client: HiddenLayer;
  let mockRetrieve: jest.Mock;

  beforeEach(() => {
    client = new HiddenLayer({ bearerToken: 'test-token' });
    mockRetrieve = jest.fn();
    client.scans.jobs.retrieve = mockRetrieve;

    // Mock console methods to avoid noise in tests
    jest.spyOn(console, 'info').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();

    // Mock sleep to speed up tests
    jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
      callback();
      return {} as NodeJS.Timeout;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('ScanStatus constants', () => {
    test('has all expected status constants', () => {
      expect(ScanStatus.DONE).toBe('done');
      expect(ScanStatus.FAILED).toBe('failed');
      expect(ScanStatus.PENDING).toBe('pending');
      expect(ScanStatus.RUNNING).toBe('running');
      expect(ScanStatus.CANCELED).toBe('canceled');
    });
  });

  describe('getScanResults', () => {
    const mockScanReport: ScanReport = {
      scan_id: 'test-scan-123',
      status: 'pending',
      detection_count: 0,
      file_count: 0,
      files_with_detections_count: 0,
      inventory: { model_name: 'test-model', requested_scan_location: 'test.pkl' },
      start_time: '2024-01-01T00:00:00Z',
      version: '1.0.0',
    };

    test('returns scan results on first try', async () => {
      mockRetrieve.mockResolvedValue(mockScanReport);

      const result = await getScanResults(client, 'test-scan-123');

      expect(mockRetrieve).toHaveBeenCalledTimes(1);
      expect(mockRetrieve).toHaveBeenCalledWith('test-scan-123');
      expect(result).toBe(mockScanReport);
    });

    test('retries on 404 error', async () => {
      const notFoundError = new APIError(
        404,
        { error: { message: 'Not found' } },
        'Not found',
        new Headers(),
      );

      mockRetrieve
        .mockRejectedValueOnce(notFoundError)
        .mockRejectedValueOnce(notFoundError)
        .mockResolvedValueOnce(mockScanReport);

      const result = await getScanResults(client, 'test-scan-123');

      expect(mockRetrieve).toHaveBeenCalledTimes(3);
      expect(result).toBe(mockScanReport);
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('Scan not yet available'));
    });

    test('throws error after max retries', async () => {
      const notFoundError = new APIError(
        404,
        { error: { message: 'Not found' } },
        'Not found',
        new Headers(),
      );

      mockRetrieve.mockRejectedValue(notFoundError);

      await expect(getScanResults(client, 'test-scan-123')).rejects.toThrow(notFoundError);

      expect(mockRetrieve).toHaveBeenCalledTimes(5); // max retries
      expect(console.error).toHaveBeenCalledWith('Scan test-scan-123 not found after 5 attempts');
    });

    test('throws non-404 errors immediately', async () => {
      const serverError = new APIError(
        500,
        { error: { message: 'Server error' } },
        'Server error',
        new Headers(),
      );

      mockRetrieve.mockRejectedValue(serverError);

      await expect(getScanResults(client, 'test-scan-123')).rejects.toThrow(serverError);

      expect(mockRetrieve).toHaveBeenCalledTimes(1);
    });
  });

  describe('waitForScanResults', () => {
    test('polls until scan is done', async () => {
      const pendingReport = { ...createMockReport(), status: 'pending' };
      const runningReport = { ...createMockReport(), status: 'running' };
      const doneReport = { ...createMockReport(), status: 'done' };

      mockRetrieve
        .mockResolvedValueOnce(pendingReport)
        .mockResolvedValueOnce(runningReport)
        .mockResolvedValueOnce(doneReport);

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieve).toHaveBeenCalledTimes(3);
      expect(result).toBe(doneReport);
      expect(console.info).toHaveBeenCalledWith('scan status: pending');
      expect(console.info).toHaveBeenCalledWith('scan status: running');
    });

    test('handles initial 404 errors gracefully', async () => {
      const notFoundError = new APIError(
        404,
        { error: { message: 'Not found' } },
        'Not found',
        new Headers(),
      );
      const pendingReport = { ...createMockReport(), status: 'pending' };
      const doneReport = { ...createMockReport(), status: 'done' };

      mockRetrieve
        .mockRejectedValueOnce(notFoundError)
        .mockRejectedValueOnce(notFoundError)
        .mockResolvedValueOnce(pendingReport)
        .mockResolvedValueOnce(doneReport);

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieve).toHaveBeenCalledTimes(4);
      expect(result).toBe(doneReport);
      expect(console.info).toHaveBeenCalledWith('scan not found yet, retrying...');
    });

    test('returns immediately on failed status', async () => {
      const failedReport = { ...createMockReport(), status: 'failed' };

      mockRetrieve.mockResolvedValueOnce(failedReport);

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieve).toHaveBeenCalledTimes(1);
      expect(result).toBe(failedReport);
    });

    test('returns immediately on canceled status', async () => {
      const canceledReport = { ...createMockReport(), status: 'canceled' };

      mockRetrieve.mockResolvedValueOnce(canceledReport);

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieve).toHaveBeenCalledTimes(1);
      expect(result).toBe(canceledReport);
    });

    test('throws non-404 errors', async () => {
      const serverError = new APIError(
        500,
        { error: { message: 'Server error' } },
        'Server error',
        new Headers(),
      );

      mockRetrieve.mockRejectedValue(serverError);

      await expect(waitForScanResults(client, 'test-scan-123')).rejects.toThrow(serverError);

      expect(mockRetrieve).toHaveBeenCalledTimes(1);
    });

    test('exponential backoff works correctly', async () => {
      // Mock Math.random to return consistent values
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);

      const pendingReport = { ...createMockReport(), status: 'pending' };
      const doneReport = { ...createMockReport(), status: 'done' };

      // Need many pending responses to test backoff
      mockRetrieve
        .mockResolvedValueOnce(pendingReport)
        .mockResolvedValueOnce(pendingReport)
        .mockResolvedValueOnce(pendingReport)
        .mockResolvedValueOnce(pendingReport)
        .mockResolvedValueOnce(doneReport);

      let delays: number[] = [];
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any, delay?: number) => {
        if (delay) delays.push(delay);
        callback();
        return {} as NodeJS.Timeout;
      });

      await waitForScanResults(client, 'test-scan-123');

      // Check that delays increase exponentially but are capped
      expect(delays.length).toBeGreaterThanOrEqual(3);
      if (delays[0] !== undefined && delays[1] !== undefined) {
        expect(delays[0]).toBeLessThan(delays[1]);
      }
      if (delays[1] !== undefined && delays[2] !== undefined) {
        expect(delays[1]).toBeLessThan(delays[2]);
      }
      // All delays should be capped at 30 seconds (30000 ms)
      delays.forEach((delay) => {
        expect(delay).toBeLessThanOrEqual(30000);
      });

      mockRandom.mockRestore();
    });
  });

  // Helper function to create a mock scan report
  function createMockReport(): ScanReport {
    return {
      scan_id: 'test-scan-123',
      status: 'pending',
      detection_count: 0,
      file_count: 0,
      files_with_detections_count: 0,
      inventory: { model_name: 'test-model', requested_scan_location: 'test.pkl' },
      start_time: '2024-01-01T00:00:00Z',
      version: '1.0.0',
    };
  }
});
