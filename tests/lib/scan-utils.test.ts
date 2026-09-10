// Tests for scan utility functions

import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';
import { APIError } from '@hiddenlayerai/hiddenlayer-sdk/core/error';
import {
  FILE_RESULTS_PAGE_DELAY_MS,
  FILE_RESULTS_PAGE_SIZE,
  buildScanReport,
  collectFileResults,
  getScanResults,
  waitForScanResults,
  ScanStatus,
} from '@hiddenlayerai/hiddenlayer-sdk/lib/scan-utils';
import type {
  ScanFileResult,
  ScanReportSummary,
} from '@hiddenlayerai/hiddenlayer-sdk/resources/scans/results';

describe('scan-utils', () => {
  let client: HiddenLayer;
  let mockRetrieve: jest.Mock;
  let mockRetrieveSummary: jest.Mock;
  let mockListFiles: jest.Mock;

  beforeEach(() => {
    client = new HiddenLayer({ bearerToken: 'test-token' });
    mockRetrieve = jest.fn();
    client.scans.jobs.retrieve = mockRetrieve;
    mockRetrieveSummary = jest.fn();
    client.scans.results.retrieveSummary = mockRetrieveSummary;
    mockListFiles = jest.fn();
    client.scans.results.listFiles = mockListFiles;

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

  // Helper function to create a mock scan summary
  function createMockSummary(status: string = 'pending'): ScanReportSummary {
    return {
      scan_id: 'test-scan-123',
      status,
      summary: {
        detection_count: 1,
        file_count: 2,
        files_with_detections_count: 1,
      },
      inventory: {
        model_id: 'test-model-id',
        model_version_id: 'test-model-version-id',
        model_name: 'test-model',
        requested_scan_location: 'test.pkl',
      },
      start_time: '2024-01-01T00:00:00Z',
      version: '1.0.0',
    } as unknown as ScanReportSummary;
  }

  function mockFileResult(fileId: string): ScanFileResult {
    return { file_instance_id: fileId, file_location: `${fileId}.pkl` } as unknown as ScanFileResult;
  }

  // Helper to create a mock page of file results
  function mockPage(items: ScanFileResult[], nextPage?: unknown) {
    return {
      items,
      hasNextPage: () => nextPage !== undefined,
      getNextPage: jest.fn().mockResolvedValue(nextPage),
    };
  }

  function mockSinglePageOfFiles(items: ScanFileResult[] = [mockFileResult('file-1')]) {
    mockListFiles.mockResolvedValue(mockPage(items));
    return items;
  }

  describe('ScanStatus constants', () => {
    test('has all expected status constants', () => {
      expect(ScanStatus.DONE).toBe('done');
      expect(ScanStatus.FAILED).toBe('failed');
      expect(ScanStatus.PENDING).toBe('pending');
      expect(ScanStatus.RUNNING).toBe('running');
      expect(ScanStatus.CANCELED).toBe('canceled');
    });
  });

  describe('collectFileResults', () => {
    test('collects a single page without throttling', async () => {
      const items = mockSinglePageOfFiles();

      const results = await collectFileResults(client, 'test-scan-123');

      expect(results).toEqual(items);
      expect(mockListFiles).toHaveBeenCalledWith('test-scan-123', {
        page_size: FILE_RESULTS_PAGE_SIZE,
      });
    });

    test('collects every page in order, throttled between page reads', async () => {
      const page3 = mockPage([mockFileResult('file-3')]);
      const page2 = mockPage([mockFileResult('file-2')], page3);
      const page1 = mockPage([mockFileResult('file-1')], page2);
      mockListFiles.mockResolvedValue(page1);

      const delays: number[] = [];
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any, delay?: number) => {
        if (delay) delays.push(delay);
        callback();
        return {} as NodeJS.Timeout;
      });

      const results = await collectFileResults(client, 'test-scan-123');

      expect(results.map((r: any) => r.file_instance_id)).toEqual(['file-1', 'file-2', 'file-3']);
      // One throttle sleep before each subsequent page fetch
      expect(delays).toEqual([FILE_RESULTS_PAGE_DELAY_MS, FILE_RESULTS_PAGE_DELAY_MS]);
    });
  });

  describe('buildScanReport', () => {
    test('maps summary, file results, and deprecated mirror fields', () => {
      const summary = createMockSummary('done');
      const fileResults = [mockFileResult('file-1'), mockFileResult('file-2')];

      const report = buildScanReport(summary, fileResults);

      expect(report.scan_id).toBe('test-scan-123');
      expect(report.status).toBe('done');
      expect(report.file_results).toEqual(fileResults);
      // Deprecated top-level fields are mirrored from the nested summary
      expect(report.detection_count).toBe(1);
      expect(report.file_count).toBe(2);
      expect(report.files_with_detections_count).toBe(1);
    });

    test('does not overwrite top-level fields already on the summary', () => {
      const summary = { ...createMockSummary('done'), detection_count: 7 } as ScanReportSummary;

      const report = buildScanReport(summary, []);

      expect(report.detection_count).toBe(7);
    });
  });

  describe('getScanResults', () => {
    test('assembles the report from the summary and file results on first try', async () => {
      mockRetrieveSummary.mockResolvedValue(createMockSummary('pending'));
      const items = mockSinglePageOfFiles();

      const result = await getScanResults(client, 'test-scan-123');

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
      expect(mockRetrieveSummary).toHaveBeenCalledWith('test-scan-123');
      expect(mockRetrieve).not.toHaveBeenCalled();
      expect(result.scan_id).toBe('test-scan-123');
      expect(result.status).toBe('pending');
      expect(result.file_results).toEqual(items);
    });

    test('retries on 404 error', async () => {
      const notFoundError = new APIError(
        404,
        { error: { message: 'Not found' } },
        'Not found',
        new Headers(),
      );

      mockRetrieveSummary
        .mockRejectedValueOnce(notFoundError)
        .mockRejectedValueOnce(notFoundError)
        .mockResolvedValueOnce(createMockSummary('pending'));
      mockSinglePageOfFiles();

      const result = await getScanResults(client, 'test-scan-123');

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(3);
      expect(result.scan_id).toBe('test-scan-123');
      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('Scan not yet available'));
    });

    test('throws error after max retries', async () => {
      const notFoundError = new APIError(
        404,
        { error: { message: 'Not found' } },
        'Not found',
        new Headers(),
      );

      mockRetrieveSummary.mockRejectedValue(notFoundError);

      await expect(getScanResults(client, 'test-scan-123')).rejects.toThrow(notFoundError);

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(5); // max retries
      expect(console.error).toHaveBeenCalledWith('Scan test-scan-123 not found after 5 attempts');
    });

    test('throws non-404 errors immediately', async () => {
      const serverError = new APIError(
        500,
        { error: { message: 'Server error' } },
        'Server error',
        new Headers(),
      );

      mockRetrieveSummary.mockRejectedValue(serverError);

      await expect(getScanResults(client, 'test-scan-123')).rejects.toThrow(serverError);

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
    });
  });

  describe('waitForScanResults', () => {
    test('polls the summary until scan is done, then assembles the report', async () => {
      mockRetrieveSummary
        .mockResolvedValueOnce(createMockSummary('pending'))
        .mockResolvedValueOnce(createMockSummary('running'))
        .mockResolvedValueOnce(createMockSummary('done'));
      const items = mockSinglePageOfFiles();

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(3);
      expect(mockListFiles).toHaveBeenCalledTimes(1);
      expect(mockRetrieve).not.toHaveBeenCalled();
      expect(result.status).toBe('done');
      expect(result.file_results).toEqual(items);
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

      mockRetrieveSummary
        .mockRejectedValueOnce(notFoundError)
        .mockRejectedValueOnce(notFoundError)
        .mockResolvedValueOnce(createMockSummary('pending'))
        .mockResolvedValueOnce(createMockSummary('done'));
      mockSinglePageOfFiles();

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(4);
      expect(result.status).toBe('done');
      expect(console.info).toHaveBeenCalledWith('scan not found yet, retrying...');
    });

    test('returns immediately on failed status', async () => {
      mockRetrieveSummary.mockResolvedValueOnce(createMockSummary('failed'));
      mockSinglePageOfFiles();

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
      expect(result.status).toBe('failed');
    });

    test('returns immediately on canceled status', async () => {
      mockRetrieveSummary.mockResolvedValueOnce(createMockSummary('canceled'));
      mockSinglePageOfFiles();

      const result = await waitForScanResults(client, 'test-scan-123');

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
      expect(result.status).toBe('canceled');
    });

    test('throws non-404 errors', async () => {
      const serverError = new APIError(
        500,
        { error: { message: 'Server error' } },
        'Server error',
        new Headers(),
      );

      mockRetrieveSummary.mockRejectedValue(serverError);

      await expect(waitForScanResults(client, 'test-scan-123')).rejects.toThrow(serverError);

      expect(mockRetrieveSummary).toHaveBeenCalledTimes(1);
      expect(mockListFiles).not.toHaveBeenCalled();
    });

    test('exponential backoff works correctly', async () => {
      // Mock Math.random to return consistent values
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);

      // Need many pending responses to test backoff
      mockRetrieveSummary
        .mockResolvedValueOnce(createMockSummary('pending'))
        .mockResolvedValueOnce(createMockSummary('pending'))
        .mockResolvedValueOnce(createMockSummary('pending'))
        .mockResolvedValueOnce(createMockSummary('pending'))
        .mockResolvedValueOnce(createMockSummary('done'));
      mockSinglePageOfFiles();

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
});
