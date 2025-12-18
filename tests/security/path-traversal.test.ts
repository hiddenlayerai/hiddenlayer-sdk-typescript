// Security tests for path traversal mitigation and temp cleanup

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';
import { ModelScanner } from 'hiddenlayer/lib/model-scan';
import { PathValidator } from 'hiddenlayer/internal/utils/path-validator';

// Mock external SDKs are provided via jest moduleNameMapper to tests/__mocks__

// Mock fs for controlled testing
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
  readdirSync: jest.fn(),
  existsSync: jest.fn(),
  unlinkSync: jest.fn(),
  rmdirSync: jest.fn(),
  createWriteStream: jest.fn(),
  promises: {
    open: jest.fn(),
  },
}));

describe('Path traversal and temp handling', () => {
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

    mockStart = jest.fn().mockResolvedValue({ scan_id: 'scan-123' });
    mockFileAdd = jest.fn().mockResolvedValue({ upload_id: 'upload-123', parts: [] });
    mockFileComplete = jest.fn().mockResolvedValue({});
    mockCompleteAll = jest.fn().mockResolvedValue({});
    mockRetrieve = jest.fn().mockResolvedValue({ status: 'done' });

    client.scans.upload.start = mockStart;
    client.scans.upload.file.add = mockFileAdd;
    client.scans.upload.file.complete = mockFileComplete;
    client.scans.upload.completeAll = mockCompleteAll;
    client.scans.jobs.retrieve = mockRetrieve;

    (fs.statSync as jest.Mock).mockReturnValue({ size: 1234, isFile: () => true });

    // Provide a minimal file handle for scanFileInternal
    (fs.promises.open as jest.Mock).mockResolvedValue({
      read: jest.fn().mockResolvedValue({ bytesRead: 0 }),
      close: jest.fn().mockResolvedValue(undefined),
    });

    // Avoid actual network upload of parts by returning no parts
    global.fetch = jest.fn().mockResolvedValue({ ok: true, statusText: 'OK' } as any);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('PathValidator.createSafeTempPath', () => {
    test('creates path under os.tmpdir with sanitized basename', () => {
      const malicious = '../../../etc/passwd';
      const p = PathValidator.createSafeTempPath(malicious);
      expect(p.startsWith(os.tmpdir())).toBe(true);
      const base = path.basename(p);
      expect(base).not.toContain('..');
      expect(base).not.toContain('/');
      expect(base).not.toContain('\\');
      expect(base).toMatch(/^hiddenlayer-\d+-[a-z0-9]+-/);
    });

    test('preserves file extension', () => {
      const p = PathValidator.createSafeTempPath('model.onnx');
      expect(p.endsWith('.onnx')).toBe(true);
    });
  });

  describe('scanS3Model safe temp path and cleanup', () => {
    test('sanitizes key and cleans up temp file', async () => {
      // Mock write stream and S3 body piping
      const writeStream = {
        on: jest.fn().mockImplementation((event: string, cb: () => void) => {
          if (event === 'finish') {
            setImmediate(cb);
          }
          return writeStream as any;
        }),
      } as any;
      (fs.createWriteStream as jest.Mock).mockReturnValue(writeStream);
      const body = { pipe: jest.fn().mockReturnValue(writeStream) } as any;

      const mockS3Client = {
        send: jest.fn().mockResolvedValue({ Body: body }),
      } as unknown as import('@aws-sdk/client-s3').S3Client;

      // Ensure cleanup path exists
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      await scanner.scanS3Model({
        modelName: 'm',
        bucket: 'b',
        key: '../../../etc/passwd',
        s3Client: mockS3Client,
        waitForResults: false,
      });

      // Temp path used for write should be safe
      const tempPathArg = (fs.createWriteStream as jest.Mock).mock.calls[0][0];
      expect(tempPathArg.startsWith(os.tmpdir())).toBe(true);
      expect(tempPathArg).not.toContain('..');

      // Cleanup invoked
      expect(fs.unlinkSync).toHaveBeenCalledWith(tempPathArg);
    });
  });

  describe('scanAzureBlobModel safe temp path and cleanup', () => {
    test('sanitizes blob name and cleans up temp file', async () => {
      // Mock container/blob client
      const downloadToFile = jest.fn().mockResolvedValue(undefined);
      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlobClient: jest.fn().mockReturnValue({ downloadToFile }),
        }),
      } as unknown as import('@azure/storage-blob').BlobServiceClient;

      (fs.existsSync as jest.Mock).mockReturnValue(true);

      await scanner.scanAzureBlobModel({
        modelName: 'm',
        accountUrl: 'https://example.com',
        container: 'c',
        blob: '..\\..\\windows\\system32',
        blobServiceClient: mockBlobServiceClient,
        waitForResults: false,
      });

      const tempPathArg = downloadToFile.mock.calls[0][0];
      expect(tempPathArg.startsWith(os.tmpdir())).toBe(true);
      expect(tempPathArg).not.toContain('..');
      expect(fs.unlinkSync).toHaveBeenCalledWith(tempPathArg);
    });
  });
});
