// Tests for custom model scan functionality

import * as fs from 'fs';
import * as path from 'path';
import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';
import { ModelScanner } from 'hiddenlayer/lib/model-scan';
import type { ScanReport } from 'hiddenlayer/resources/scans/results';

// Mock fs module
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
  readdirSync: jest.fn(),
  createWriteStream: jest.fn(),
  promises: {
    open: jest.fn(),
  },
}));

describe('ModelScanner', () => {
  let client: HiddenLayer;
  let scanner: ModelScanner;
  let mockStart: jest.Mock;
  let mockFileAdd: jest.Mock;
  let mockFileComplete: jest.Mock;
  let mockCompleteAll: jest.Mock;
  let mockRetrieve: jest.Mock;

  beforeEach(() => {
    client = new HiddenLayer({ bearerToken: 'test-token' });
    scanner = new ModelScanner(client);

    // Mock the API methods
    mockStart = jest.fn();
    mockFileAdd = jest.fn();
    mockFileComplete = jest.fn();
    mockCompleteAll = jest.fn();
    mockRetrieve = jest.fn();

    client.scans.upload.start = mockStart;
    client.scans.upload.file.add = mockFileAdd;
    client.scans.upload.file.complete = mockFileComplete;
    client.scans.upload.completeAll = mockCompleteAll;
    client.scans.jobs.retrieve = mockRetrieve;

    // Mock fetch for file uploads
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      statusText: 'OK',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('integration', () => {
    test('client has modelScanner property', () => {
      const testClient = new HiddenLayer({ bearerToken: 'test-token' });
      expect(testClient.modelScanner).toBeInstanceOf(ModelScanner);
    });

    test('modelScanner property is cached', () => {
      const testClient = new HiddenLayer({ bearerToken: 'test-token' });
      const scanner1 = testClient.modelScanner;
      const scanner2 = testClient.modelScanner;
      expect(scanner1).toBe(scanner2);
    });
  });

  describe('scanFile', () => {
    const mockFileContent = Buffer.from('test model data');
    const mockFilePath = '/tmp/test-model.pkl';

    beforeEach(() => {
      // Mock file system operations
      (fs.statSync as jest.Mock).mockReturnValue({ size: mockFileContent.length });
      const mockFileHandle = {
        read: jest
          .fn()
          .mockImplementation((buffer: Buffer, offset: number, length: number, position: number) => {
            // Simulate reading the file content
            mockFileContent.copy(buffer, offset, 0, length);
            return Promise.resolve({ bytesRead: length });
          }),
        close: jest.fn().mockResolvedValue(undefined),
      };
      (fs.promises.open as jest.Mock).mockResolvedValue(mockFileHandle);
    });

    test('uploads file with multipart upload', async () => {
      const mockUploadResponse = { scan_id: 'test-scan-123' };
      const mockFileAddResponse = {
        upload_id: 'upload-123',
        parts: [
          {
            part_number: 1,
            start_offset: 0,
            end_offset: mockFileContent.length,
            upload_url: 'https://example.com/upload-url',
          },
        ],
      };
      const mockScanReport: ScanReport = {
        scan_id: 'test-scan-123',
        status: 'done',
        summary: {
          detection_count: 0,
          file_count: 1,
          files_with_detections_count: 0,
        },
        detection_count: 0,
        file_count: 1,
        files_with_detections_count: 0,
        inventory: {
          model_id: 'test-model-id',
          model_version_id: 'test-model-version-id',
          model_name: 'test-model',
          requested_scan_location: mockFilePath,
        },
        start_time: '2024-01-01T00:00:00Z',
        version: '1.0.0',
      };

      mockStart.mockResolvedValue(mockUploadResponse);
      mockFileAdd.mockResolvedValue(mockFileAddResponse);
      mockFileComplete.mockResolvedValue({});
      mockCompleteAll.mockResolvedValue({});
      mockRetrieve.mockResolvedValue(mockScanReport);

      const result = await scanner.scanFile({
        modelName: 'test-model',
        modelPath: mockFilePath,
        waitForResults: false,
      });

      expect(mockStart).toHaveBeenCalledWith({
        model_name: 'test-model',
        model_version: '1',
        requesting_entity: 'hiddenlayer-typescript-sdk',
        request_source: 'API Upload',
        origin: '',
      });

      expect(mockFileAdd).toHaveBeenCalledWith('test-scan-123', {
        'file-name': path
          .basename(mockFilePath)
          .replace(/[^A-Za-z0-9._-]/g, '_')
          .slice(0, 255),
        'file-content-length': mockFileContent.length,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/upload-url',
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/octet-stream' },
        }),
      );

      expect(mockFileComplete).toHaveBeenCalledWith('upload-123', { scan_id: 'test-scan-123' });
      expect(mockCompleteAll).toHaveBeenCalledWith('test-scan-123');
      expect(result).toBe(mockScanReport);
    });

    test('throws error when scan_id is missing', async () => {
      mockStart.mockResolvedValue({ scan_id: null });

      await expect(
        scanner.scanFile({
          modelName: 'test-model',
          modelPath: mockFilePath,
        }),
      ).rejects.toThrow('scan_id must have a value');
    });

    test('handles custom parameters', async () => {
      mockStart.mockResolvedValue({ scan_id: 'test-scan-123' });
      mockFileAdd.mockResolvedValue({ upload_id: 'upload-123', parts: [] });
      mockRetrieve.mockResolvedValue({ status: 'pending' });

      await scanner.scanFile({
        modelName: 'custom-model',
        modelPath: mockFilePath,
        modelVersion: 'v2.0',
        waitForResults: false,
        requestSource: 'Integration',
        origin: 'CustomOrigin',
      });

      expect(mockStart).toHaveBeenCalledWith({
        model_name: 'custom-model',
        model_version: 'v2.0',
        requesting_entity: 'hiddenlayer-typescript-sdk',
        request_source: 'Integration',
        origin: 'CustomOrigin',
      });
    });
  });

  describe('scanFolder', () => {
    const mockFolderPath = '/tmp/models';
    const mockFiles = [
      '/tmp/models/model1.pkl',
      '/tmp/models/model2.h5',
      '/tmp/models/subdir/model3.pt',
      '/tmp/models/readme.txt',
    ];

    beforeEach(() => {
      // Mock file handle for all files
      const mockFileHandle = {
        read: jest.fn().mockResolvedValue({ bytesRead: 1000 }),
        close: jest.fn().mockResolvedValue(undefined),
      };
      (fs.promises.open as jest.Mock).mockResolvedValue(mockFileHandle);
      // Mock file system operations
      const mockDirents = [
        { name: 'model1.pkl', isDirectory: () => false },
        { name: 'model2.h5', isDirectory: () => false },
        { name: 'subdir', isDirectory: () => true },
        { name: 'readme.txt', isDirectory: () => false },
      ];

      const mockSubdirDirents = [{ name: 'model3.pt', isDirectory: () => false }];

      (fs.readdirSync as jest.Mock).mockImplementation((dir: string) => {
        if (dir === mockFolderPath) return mockDirents;
        if (dir === path.join(mockFolderPath, 'subdir')) return mockSubdirDirents;
        return [];
      });

      (fs.statSync as jest.Mock).mockImplementation((filePath: string) => ({
        size: 1000,
        isDirectory: () => filePath.includes('subdir') && !filePath.endsWith('.pt'),
      }));
    });

    test('scans all files in folder recursively', async () => {
      mockStart.mockResolvedValue({ scan_id: 'test-scan-123' });
      mockFileAdd.mockResolvedValue({ upload_id: 'upload-123', parts: [] });
      mockCompleteAll.mockResolvedValue({});
      mockRetrieve.mockResolvedValue({ status: 'done' });

      await scanner.scanFolder({
        modelName: 'folder-models',
        path: mockFolderPath,
        waitForResults: false,
      });

      expect(mockStart).toHaveBeenCalledTimes(1);
      // Should skip .txt files by default
      expect(mockFileAdd).toHaveBeenCalledTimes(3);
    });

    test('applies file patterns correctly', async () => {
      mockStart.mockResolvedValue({ scan_id: 'test-scan-123' });
      mockFileAdd.mockResolvedValue({ upload_id: 'upload-123', parts: [] });
      mockCompleteAll.mockResolvedValue({});
      mockRetrieve.mockResolvedValue({ status: 'done' });

      await scanner.scanFolder({
        modelName: 'folder-models',
        path: mockFolderPath,
        allowFilePatterns: ['*.pkl', '*.h5'],
        waitForResults: false,
      });

      // Should only upload .pkl and .h5 files
      expect(mockFileAdd).toHaveBeenCalledTimes(2);
    });

    test('throws error when scan_id is missing', async () => {
      mockStart.mockResolvedValue({ scan_id: null });

      await expect(
        scanner.scanFolder({
          modelName: 'folder-models',
          path: mockFolderPath,
        }),
      ).rejects.toThrow('scan_id must have a value');
    });
  });

  describe('cloud storage methods', () => {
    test('scanS3Model uses S3 client to download and then scans', async () => {
      // Ensure file ops and API mocks are set
      (fs.statSync as jest.Mock).mockReturnValue({ size: 1000, isFile: () => true });
      (fs.promises.open as jest.Mock).mockResolvedValue({
        read: jest.fn().mockResolvedValue({ bytesRead: 0 }),
        close: jest.fn().mockResolvedValue(undefined),
      });
      mockStart.mockResolvedValue({ scan_id: 'scan-123' });
      mockFileAdd.mockResolvedValue({ upload_id: 'upload-123', parts: [] });
      mockFileComplete.mockResolvedValue({});
      mockCompleteAll.mockResolvedValue({});

      const mockS3Client = { send: jest.fn().mockResolvedValue({ Body: { pipe: jest.fn() } }) } as any;
      // Make createWriteStream usable in pipeline
      const writeStream = {
        on: jest.fn().mockImplementation((event: string, cb: () => void) => {
          if (event === 'finish') setImmediate(cb);
          return writeStream as any;
        }),
      } as any;
      (fs.createWriteStream as jest.Mock).mockReturnValue(writeStream);
      // Ensure Body.pipe returns writeStream
      (mockS3Client.send as jest.Mock).mockResolvedValueOnce({
        Body: { pipe: jest.fn().mockImplementation((ws: any) => ws) },
      });

      mockRetrieve.mockResolvedValue({ status: 'done' });
      await expect(
        scanner.scanS3Model({
          modelName: 's3-model',
          bucket: 'test-bucket',
          key: 'test.pkl',
          s3Client: mockS3Client,
          waitForResults: false,
        }),
      ).resolves.toBeDefined();

      expect(mockS3Client.send).toHaveBeenCalled();
    });

    test('scanAzureBlobModel uses BlobServiceClient to download and then scans', async () => {
      (fs.statSync as jest.Mock).mockReturnValue({ size: 1000, isFile: () => true });
      (fs.promises.open as jest.Mock).mockResolvedValue({
        read: jest.fn().mockResolvedValue({ bytesRead: 0 }),
        close: jest.fn().mockResolvedValue(undefined),
      });
      mockStart.mockResolvedValue({ scan_id: 'scan-123' });
      mockFileAdd.mockResolvedValue({ upload_id: 'upload-123', parts: [] });
      mockFileComplete.mockResolvedValue({});
      mockCompleteAll.mockResolvedValue({});

      const downloadToFile = jest.fn().mockResolvedValue(undefined);
      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlobClient: jest.fn().mockReturnValue({ downloadToFile }),
        }),
      } as any;

      mockRetrieve.mockResolvedValue({ status: 'done' });
      await expect(
        scanner.scanAzureBlobModel({
          modelName: 'azure-model',
          accountUrl: 'https://test.blob.core.windows.net',
          container: 'test-container',
          blob: 'test.pkl',
          blobServiceClient: mockBlobServiceClient,
          waitForResults: false,
        }),
      ).resolves.toBeDefined();

      expect(downloadToFile).toHaveBeenCalled();
    });

    test('scanHuggingFaceModel downloads snapshot and scans folder', async () => {
      (fs.statSync as jest.Mock).mockReturnValue({ size: 1000, isFile: () => true });
      (fs.promises.open as jest.Mock).mockResolvedValue({
        read: jest.fn().mockResolvedValue({ bytesRead: 0 }),
        close: jest.fn().mockResolvedValue(undefined),
      });
      (fs.promises as any).mkdir = jest.fn().mockResolvedValue(undefined);
      (fs.promises as any).writeFile = jest.fn().mockResolvedValue(undefined);
      mockStart.mockResolvedValue({ scan_id: 'scan-123' });
      mockFileAdd.mockResolvedValue({ upload_id: 'upload-123', parts: [] });
      mockFileComplete.mockResolvedValue({});
      mockCompleteAll.mockResolvedValue({});
      mockRetrieve.mockResolvedValue({ status: 'done' });

      await expect(
        scanner.scanHuggingFaceModel({ repoId: 'test/model', waitForResults: false }),
      ).resolves.toBeDefined();
    });
  });

  describe('file filtering', () => {
    test('default exclude patterns', async () => {
      // Mock file handle
      const mockFileHandle = {
        read: jest.fn().mockResolvedValue({ bytesRead: 1000 }),
        close: jest.fn().mockResolvedValue(undefined),
      };
      (fs.promises.open as jest.Mock).mockResolvedValue(mockFileHandle);

      const mockDirents = [
        { name: 'model.pkl', isDirectory: () => false },
        { name: 'readme.txt', isDirectory: () => false },
        { name: 'notes.md', isDirectory: () => false },
        { name: 'package.lock', isDirectory: () => false },
        { name: '.gitattributes', isDirectory: () => false },
        { name: '.git', isDirectory: () => true },
      ];

      (fs.readdirSync as jest.Mock).mockReturnValue(mockDirents);
      (fs.statSync as jest.Mock).mockReturnValue({
        size: 1000,
        isDirectory: () => false,
      });

      mockStart.mockResolvedValue({ scan_id: 'test-scan-123' });
      mockFileAdd.mockResolvedValue({ upload_id: 'upload-123', parts: [] });
      mockCompleteAll.mockResolvedValue({});
      mockRetrieve.mockResolvedValue({ status: 'done' });

      await scanner.scanFolder({
        modelName: 'test',
        path: '/tmp/test',
        waitForResults: false,
      });

      // Should only upload model.pkl, excluding all others
      expect(mockFileAdd).toHaveBeenCalledTimes(1);
      expect(mockFileAdd).toHaveBeenCalledWith(
        'test-scan-123',
        expect.objectContaining({
          'file-name': expect.stringContaining('model.pkl'),
        }),
      );
    });
  });
});
