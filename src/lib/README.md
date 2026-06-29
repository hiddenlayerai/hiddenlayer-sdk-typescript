# Custom SDK Extensions

This directory contains custom functionality that extends the generated HiddenLayer SDK to provide backward compatibility and convenience methods that were available in the previous SDK versions.

## Overview

The custom extensions provide two main scanner classes:

### 1. CommunityScanner

Provides the `communityScan` method for scanning models from remote locations (AWS S3, Azure Blob Storage, Google Cloud Storage, HuggingFace, etc.) with built-in polling functionality.

```typescript
const scanner = client.communityScanner;
const report = await scanner.communityScan({
  modelName: 'my-model',
  modelPath: 'https://example.com/model.pkl',
  modelSource: CommunityScanSource.AWS_PRESIGNED,
  waitForResults: true,
});
```

### 2. ModelScanner

Provides methods for scanning local files and folders, as well as cloud storage integrations:

- `scanFile()` - Scan a single local file
- `scanFolder()` - Scan all files in a directory recursively
- `scanS3Model()` - Download and scan a model from S3
- `scanAzureBlobModel()` - Download and scan a model from Azure Blob Storage
- `scanHuggingFaceModel()` - Download and scan a model from HuggingFace

```typescript
const scanner = client.modelScanner;

// Scan local file
const report = await scanner.scanFile({
  modelName: 'my-model',
  modelPath: './model.pkl',
  waitForResults: true,
});

// Scan folder
const report = await scanner.scanFolder({
  modelName: 'my-models',
  path: './models/',
  allowFilePatterns: ['*.pkl', '*.h5'],
  ignoreFilePatterns: ['*.txt'],
  waitForResults: true,
});
```

## Features

- **Automatic Polling**: When `waitForResults: true`, the scanners automatically poll for scan completion
- **Retry Logic**: Built-in retry logic for handling transient API errors
- **Multipart Upload**: Large files are automatically uploaded using multipart upload
- **File Filtering**: Support for include/exclude patterns when scanning folders
- **Cloud Storage Integration**: Native support for S3, Azure Blob Storage, and HuggingFace

## Implementation Details

The custom functionality is implemented in three main modules:

1. `scan-utils.ts` - Shared utilities for polling and retry logic
2. `community-scan.ts` - Remote model scanning functionality
3. `model-scan.ts` - Local file/folder scanning with cloud storage integrations

These are integrated into the main HiddenLayer client as cached getter properties, ensuring a single instance per client.

## Dependencies

The SDK includes `minimatch` for file pattern matching. Additional optional dependencies are required for cloud storage scanning:

- S3 scanning: `@aws-sdk/client-s3`
- Azure Blob scanning: `@azure/storage-blob` and `@azure/identity`
- HuggingFace scanning: `@huggingface/hub`

These cloud dependencies are not included by default to keep the SDK lightweight. They are dynamically imported when needed, so install them only if you need the specific functionality.
