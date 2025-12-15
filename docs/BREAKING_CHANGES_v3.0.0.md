# HiddenLayer SDK TypeScript Update - December 2025

Release notes for HiddenLayer's SDK TypeScript released in December 2025.

## Overview

HiddenLayer is pleased to announce an upcoming update to the HiddenLayer SDK TypeScript. This SDK is being updated and renamed to the **HiddenLayer TypeScript API library**. It will also no longer be in beta and will have official support.

The HiddenLayer TypeScript API library provides convenient access to the HiddenLayer REST API from any Node.js or TypeScript application. The library includes type definitions for all request params and response fields, and offers a modern resource-based API design.

This document outlines the breaking API changes between the previous version (v2.x) and the new version (v0.1.x) of the HiddenLayer TypeScript SDK. The new version represents a complete rewrite of the SDK using [Stainless](https://www.stainless.com/) code generation from the OpenAPI spec, resulting in a more consistent, type-safe API.

---

## Table of Contents

1. [Client Initialization](#client-initialization)
2. [Authentication](#authentication)
3. [Model Scanning](#model-scanning)
4. [Community Scanning](#community-scanning)
5. [Sensor Management](#sensor-management)
6. [Model Management](#model-management)
7. [Error Handling](#error-handling)
8. [Import Changes](#import-changes)
9. [Removed APIs](#removed-apis)
10. [New APIs](#new-apis)
11. [Action Required](#action-required)

---

## Client Initialization

### Previous Version

```typescript
import { HiddenLayerServiceClient } from 'hiddenlayer-sdk-typescript';

// SaaS Client
const client = HiddenLayerServiceClient.createSaaSClient(
  'your-client-id',
  'your-client-secret',
  'https://api.us.hiddenlayer.ai' // optional
);

// Enterprise Client
const client = HiddenLayerServiceClient.createEnterpriseClient(
  'https://your-enterprise-host.com'
);
```

### New Version

```typescript
import HiddenLayer from 'hiddenlayer';

// Using environment variables (recommended)
const client = new HiddenLayer();

// Explicit configuration with client credentials (SaaS)
const client = new HiddenLayer({
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
  environment: 'prod-us', // 'prod-us' or 'prod-eu'
});

// Using bearer token
const client = new HiddenLayer({
  bearerToken: 'your-token',
});

// Custom base URL (Enterprise)
const client = new HiddenLayer({
  baseURL: 'https://your-enterprise-host.com',
});
```

### Key Changes

| Aspect | Previous | New |
|--------|----------|-----|
| Class name | `HiddenLayerServiceClient` | `HiddenLayer` |
| Factory methods | `createSaaSClient()`, `createEnterpriseClient()` | Constructor with options |
| Environment selection | Manual host URL | `environment: 'prod-us' \| 'prod-eu'` |
| Auth URL | Separate `authUrl` parameter | Handled internally |

### Environment Configuration

The new SDK supports environment-based configuration:
- `prod-us` → `https://api.hiddenlayer.ai`
- `prod-eu` → `https://api.eu.hiddenlayer.ai`

Environment variables supported:
- `HIDDENLAYER_TOKEN` - Bearer token for authentication
- `HIDDENLAYER_CLIENT_ID` - Client ID for OAuth
- `HIDDENLAYER_CLIENT_SECRET` - Client secret for OAuth
- `HIDDENLAYER_BASE_URL` - Custom base URL override

---

## Authentication

### Previous Version

Authentication was handled internally with a separate `authUrl` parameter and manual JWT fetching.

### New Version

- Supports `clientID`/`clientSecret` (OAuth2 client credentials flow)
- Supports `bearerToken` for direct token authentication
- Automatic token refresh with caching
- Environment variables: `HIDDENLAYER_CLIENT_ID`, `HIDDENLAYER_CLIENT_SECRET`, `HIDDENLAYER_TOKEN`

---

## Model Scanning

### Scanning a File

**Previous:**
```typescript
const result = await client.modelScanner.scanFile(
  'model-name',      // modelName
  '/path/to/model',  // modelPath
  'v1.0',            // modelVersion (optional)
  true               // waitForResults (optional, default: true)
);
```

**New:**
```typescript
const result = await client.modelScanner.scanFile({
  modelName: 'model-name',
  modelPath: '/path/to/model',
  modelVersion: 'v1.0',           // optional, default: '1'
  waitForResults: true,            // optional, default: true
  requestSource: 'API Upload',     // optional
  origin: '',                      // optional
});
```

### Scanning a Folder

**Previous:**
```typescript
const result = await client.modelScanner.scanFolder(
  'model-name',
  '/path/to/folder',
  'v1.0',                          // modelVersion
  ['*.bin', '*.safetensors'],      // allowFilePatterns
  ['*.txt', '*.md'],               // ignoreFilePatterns
  true                             // waitForResults
);
```

**New:**
```typescript
const result = await client.modelScanner.scanFolder({
  modelName: 'model-name',
  path: '/path/to/folder',
  modelVersion: 'v1.0',
  allowFilePatterns: ['*.bin', '*.safetensors'],
  ignoreFilePatterns: ['*.txt', '*.md'],
  waitForResults: true,
});
```

### Scanning S3 Models

**Previous:**
```typescript
const result = await client.modelScanner.scanS3Model(
  'model-name',
  'bucket-name',
  'path/to/model.bin',
  'v1.0',
  true
);
```

**New:**
```typescript
const result = await client.modelScanner.scanS3Model({
  modelName: 'model-name',
  bucket: 'bucket-name',
  key: 'path/to/model.bin',
  modelVersion: 'v1.0',
  s3Client: myS3Client,     // optional, will create default if not provided
  waitForResults: true,
});
```

### Scanning Azure Blob Models

**Previous:**
```typescript
const result = await client.modelScanner.scanAzureBlobModel(
  'model-name',
  'https://account.blob.core.windows.net',
  'container-name',
  'blob-name',
  'v1.0',
  'sas-key',
  true
);
```

**New:**
```typescript
const result = await client.modelScanner.scanAzureBlobModel({
  modelName: 'model-name',
  accountUrl: 'https://account.blob.core.windows.net',
  container: 'container-name',
  blob: 'blob-name',
  modelVersion: 'v1.0',
  credential: '?<sas_key>',           // optional
  blobServiceClient: myBlobClient,    // optional
  waitForResults: true,
});
```

### Scanning HuggingFace Models (NEW)

```typescript
const result = await client.modelScanner.scanHuggingFaceModel({
  repoId: 'owner/repo-name',
  modelName: 'my-model',              // optional, defaults to repoId
  revision: 'main',                   // optional
  localDir: '/tmp/model',             // optional
  allowFilePatterns: ['*.safetensors'],
  ignoreFilePatterns: ['*.md'],
  hfToken: 'your-hf-token',           // optional
  waitForResults: true,
});
```

### Getting Scan Results

**Previous:**
```typescript
const results = await client.modelScanner.getScanResults(scanId, true);
const sarif = await client.modelScanner.getSarifResults(scanId);
```

**New:**
```typescript
import { getScanResults, waitForScanResults, ScanStatus } from 'hiddenlayer';

// Get current status (with retry for 404s)
const results = await getScanResults(client, scanId);

// Wait for completion
const results = await waitForScanResults(client, scanId);

// Get SARIF report
const sarif = await client.scans.results.sarif(scanId);
```

---

## Community Scanning

**Previous:**
```typescript
import { ScanJobAccessSourceEnum } from 'hiddenlayer';

const result = await client.modelScanner.communityScan(
  'model-name',
  'https://example.com/model.bin',
  ScanJobAccessSourceEnum.AwsPresigned,
  'v1.0',
  true
);
```

**New:**
```typescript
import { CommunityScanSource } from 'hiddenlayer';

const result = await client.communityScanner.communityScan({
  modelName: 'model-name',
  modelPath: 'https://example.com/model.bin',
  modelSource: CommunityScanSource.AWS_PRESIGNED,
  modelVersion: 'v1.0',
  waitForResults: true,
});
```

### Source Type Constants

| Previous | New |
|----------|-----|
| `ScanJobAccessSourceEnum.Local` | `CommunityScanSource.LOCAL` |
| `ScanJobAccessSourceEnum.AwsPresigned` | `CommunityScanSource.AWS_PRESIGNED` |
| `ScanJobAccessSourceEnum.AwsIamRole` | `CommunityScanSource.AWS_IAM_ROLE` |
| `ScanJobAccessSourceEnum.AzureBlobSas` | `CommunityScanSource.AZURE_BLOB_SAS` |
| `ScanJobAccessSourceEnum.AzureBlobAd` | `CommunityScanSource.AZURE_BLOB_AD` |
| `ScanJobAccessSourceEnum.GoogleSigned` | `CommunityScanSource.GOOGLE_SIGNED` |
| `ScanJobAccessSourceEnum.GoogleOauth` | `CommunityScanSource.GOOGLE_OAUTH` |
| `ScanJobAccessSourceEnum.HuggingFace` | `CommunityScanSource.HUGGING_FACE` |

---

## Sensor Management

### Creating a Sensor

**Previous:**
```typescript
const sensor = await client.model.createSensor('model-name', 1);

// Or create/get if exists
const sensor = await client.model.createOrGetSensor('model-name', 1);
```

**New:**
```typescript
const sensor = await client.sensors.create({
  plaintext_name: 'model-name',
  adhoc: true,
  version: 1,
});
```

### Querying Sensors

**Previous:**
```typescript
const sensor = await client.model.getSensor('model-name', 1);
```

**New:**
```typescript
const response = await client.sensors.query({
  filter: {
    plaintext_name: 'model-name',
    version: 1,
  },
});
const sensor = response.results?.[0];
```

### Deleting a Sensor

**Previous:**
```typescript
await client.model.deleteSensor(sensorId);
```

**New:**
```typescript
await client.sensors.delete(sensorId);
```

### Property Name Changes

| Previous | New |
|----------|-----|
| `sensor.sensorId` | `sensor.sensor_id` |
| `sensor.modelId` | `sensor.model_id` |
| `sensor.plaintextName` | `sensor.plaintext_name` |
| `sensor.tenantId` | `sensor.tenant_id` |
| `sensor.createdAt` | `sensor.created_at` |

---

## Model Management

**Previous:**
```typescript
const model = await client.model.getModel(modelId);
await client.model.deleteModel(modelId);
```

**New:**
```typescript
const model = await client.models.retrieve(modelId);
await client.models.delete(modelId);
```

---

## Error Handling

### Previous Version

```typescript
import { ResponseError } from 'hiddenlayer';

try {
  await client.model.createSensor('name');
} catch (error) {
  if (error instanceof ResponseError) {
    console.log(error.response.status);
    const body = await error.response.text();
  }
}
```

### New Version

```typescript
import HiddenLayer, {
  HiddenLayerError,
  APIError,
  BadRequestError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
} from 'hiddenlayer';

try {
  await client.sensors.create({ plaintext_name: 'name' });
} catch (error) {
  if (error instanceof HiddenLayer.APIError) {
    console.log(error.status);      // HTTP status code
    console.log(error.message);     // Error message
    console.log(error.headers);     // Response headers
    console.log(error.error);       // JSON error body
  }

  // Specific error types
  if (error instanceof HiddenLayer.BadRequestError) { /* 400 */ }
  if (error instanceof HiddenLayer.AuthenticationError) { /* 401 */ }
  if (error instanceof HiddenLayer.NotFoundError) { /* 404 */ }
  if (error instanceof HiddenLayer.RateLimitError) { /* 429 */ }
}
```

### Error Class Mapping

| Previous | New |
|----------|-----|
| `ResponseError` | `APIError` |
| N/A | `BadRequestError` (400) |
| N/A | `AuthenticationError` (401) |
| N/A | `PermissionDeniedError` (403) |
| N/A | `NotFoundError` (404) |
| N/A | `ConflictError` (409) |
| N/A | `UnprocessableEntityError` (422) |
| N/A | `RateLimitError` (429) |
| N/A | `InternalServerError` (>=500) |
| N/A | `APIConnectionError` |
| N/A | `APIConnectionTimeoutError` |

---

## Import Changes

### Previous Version

```typescript
import {
  HiddenLayerServiceClient,
  Configuration,
  SensorApi,
  ModelApi,
  ModelSupplyChainApi,
  ScanReportV3,
  ScanReportV3StatusEnum,
  Sarif210,
  ScanJob,
  ScanJobAccessSourceEnum,
  Sensor,
  Model,
  ResponseError,
} from 'hiddenlayer';
```

### New Version

```typescript
import HiddenLayer, {
  // Client and core
  type ClientOptions,
  APIPromise,

  // Error types
  HiddenLayerError,
  APIError,
  BadRequestError,
  NotFoundError,
  // ... etc

  // Utilities
  toFile,
  type Uploadable,

  // Scanning helpers
  CommunityScanner,
  CommunityScanSource,
  type CommunityScanOptions,
  ModelScanner,
  type ScanFileOptions,
  type ScanFolderOptions,
  getScanResults,
  waitForScanResults,
  ScanStatus,
} from 'hiddenlayer';

// Response types are available as namespaced types
type SensorResponse = HiddenLayer.SensorCreateResponse;
type ModelResponse = HiddenLayer.ModelRetrieveResponse;
```

---

## Removed APIs

The following APIs from the previous SDK have been removed or reorganized:

| Previous API | Status in New Version |
|--------------|----------------------|
| `AidrPredictiveApi` | Replaced by `client.interactions` |
| `HealthApi` | Removed |
| `ReadinessApi` | Removed |
| `ModelSupplyChainApi` | Reorganized into `client.scans.*` |
| `client.model.createOrGetSensor()` | Removed (implement manually) |
| `client.model.getSensorWithRetry()` | Removed (implement manually) |
| `Configuration` class | Removed (use constructor options) |
| `submitVectors()` | Removed |
| All generated model classes | Replaced with TypeScript interfaces |

---

## New APIs

### Interaction Analysis (LLM Security)

Performs detailed security analysis of LLM inputs and outputs:

```typescript
const result = await client.interactions.analyze({
  metadata: { model: 'gpt-4', requester_id: 'user-1234' },
  input: { messages: [{ role: 'user', content: 'Hello' }] },
});
```

### Prompt Analyzer

Analyzes prompts for injection attacks, PII, unsafe content, and more:

```typescript
const result = await client.promptAnalyzer.create({
  prompt: 'Your prompt here',
});
```

### Model Cards

```typescript
const cards = await client.models.cards.list({
  limit: 10,
  offset: 0,
});
```

### Scan Jobs (Low-level API)

```typescript
// Create a scan job
const job = await client.scans.jobs.request({
  access: { source: 'HUGGING_FACE' },
  inventory: {
    model_name: 'model-name',
    model_version: '1.0',
    requested_scan_location: 'owner/repo',
    requesting_entity: 'your-entity',
  },
});

// Get scan results
const results = await client.scans.jobs.retrieve(scanId);

// List scan jobs
const jobs = await client.scans.jobs.list({ limit: 10 });
```

### Upload API (Low-level)

```typescript
// Start upload
const upload = await client.scans.upload.start({
  model_name: 'model-name',
  model_version: '1.0',
  requesting_entity: 'your-entity',
});

// Add file
const file = await client.scans.upload.file.add(scanId, {
  'file-name': 'model.bin',
  'file-content-length': fileSize,
});

// Complete file upload
await client.scans.upload.file.complete(fileId, { scan_id: scanId });

// Complete all uploads
await client.scans.upload.completeAll(scanId);
```

---

## New Features Summary

1. **LLM Security Analysis**
   - `interactions.analyze()` - Security analysis of LLM inputs and outputs
   - `promptAnalyzer.create()` - Analyzes prompts for injection attacks, PII, unsafe content

2. **Enhanced Type Safety**
   - Full TypeScript type definitions for all API requests and responses
   - Improved IDE autocomplete and type checking

3. **Resource-Based API Design**
   - APIs organized by resource: `models`, `scans`, `sensors`, `interactions`, `promptAnalyzer`
   - More intuitive and discoverable API structure

4. **Improved Error Handling**
   - Typed error classes: `HiddenLayerError`, `APIError`, `AuthenticationError`, etc.
   - Better error messages and debugging information

5. **Pagination Support**
   - Built-in pagination helpers with `CursorPagination` and `OffsetPage`

6. **Environment Support**
   - Easy switching between US and EU regions
   - Configurable base URL for enterprise deployments

---

## Quick Migration Checklist

- [ ] Update import statements
- [ ] Replace `HiddenLayerServiceClient` with `HiddenLayer`
- [ ] Update client initialization to use constructor
- [ ] Convert positional arguments to options objects for scanning methods
- [ ] Update property names from camelCase to snake_case
- [ ] Update error handling to use new error classes
- [ ] Replace `ScanJobAccessSourceEnum` with `CommunityScanSource`
- [ ] Replace `ResponseError` with `APIError`
- [ ] Update sensor/model management calls
- [ ] Test authentication flow

---

## Action Required

For users of the TypeScript SDK that wish to update to the latest version, be aware that:

1. **Breaking Changes**: Calls made with the previous version will not be compatible with the new methods mentioned above as the signatures and return types have changed.

2. **Import Changes**: The package export structure has changed. Update your imports accordingly.

3. **Configuration**: The client initialization pattern has changed from factory methods to a constructor-based approach.

4. **Removed Methods**: `submitVectors()` and other legacy methods are no longer available.

5. **Version Pinning**: Users that wish to stay on older versions will need to ensure the version is pinned in their `package.json`.

---

## Getting Help

If you encounter issues during migration, please:

1. Check the [API documentation](https://dev.hiddenlayer.ai)
2. Review the [api.md](./api.md) file for complete API reference
3. Open an issue on GitHub
4. Contact HiddenLayer support
