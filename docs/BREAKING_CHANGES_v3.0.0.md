# Breaking API Changes: v2.x → v3.0.0

This document outlines the breaking API changes between the previous SDK (v2.x) and the new SDK (v3.0.0) of the HiddenLayer TypeScript SDK.

The new version is a complete rewrite using [Stainless](https://www.stainless.com/) code generation from the OpenAPI spec, resulting in improved type safety, better error handling, and a more consistent API design.

---

## Table of Contents

1. [Package Changes](#package-changes)
2. [Client Initialization](#client-initialization)
3. [Environment Variables](#environment-variables)
4. [Model Scanning](#model-scanning)
5. [Community Scanning](#community-scanning)
6. [Sensor Management](#sensor-management)
7. [Model Management](#model-management)
8. [Error Handling](#error-handling)
9. [Type Changes](#type-changes)
10. [New APIs](#new-apis)
11. [Removed APIs](#removed-apis)
12. [Configuration Options](#configuration-options)
13. [Migration Checklist](#migration-checklist)

---

## Package Changes

| Aspect | v2.x (Previous) | v3.0.0 (New) |
|--------|---------------|--------------|
| Package name | `@hiddenlayerai/hiddenlayer-sdk` | `hiddenlayer` |
| Generated with | OpenAPI Generator | Stainless |

### Import Changes

```typescript
// v2.x (Previous)
import { HiddenLayerServiceClient } from '@hiddenlayerai/hiddenlayer-sdk';

// v3.0.0 (New)
import HiddenLayer from 'hiddenlayer';
```

---

## Client Initialization

### v2.x (Previous)

```typescript
import { HiddenLayerServiceClient } from '@hiddenlayerai/hiddenlayer-sdk';

// SaaS Client
const client = HiddenLayerServiceClient.createSaaSClient(
  'your-client-id',
  'your-client-secret'
);

// Enterprise Client (on-premise)
const client = HiddenLayerServiceClient.createEnterpriseClient(
  'https://your-enterprise-host.com'
);
```

### v3.0.0 (New)

```typescript
import HiddenLayer from 'hiddenlayer';

// Using client credentials (SaaS)
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
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
});
```

### Key Changes

| Aspect | v2.x (Previous) | v3.0.0 (New) |
|--------|---------------|--------------|
| Class name | `HiddenLayerServiceClient` | `HiddenLayer` |
| Creation | Factory methods | Constructor with options |
| Default host | `https://api.us.hiddenlayer.ai` | `https://api.hiddenlayer.ai` |
| Environment selection | Via host URL | `environment` option |
| Bearer token auth | Not supported | Supported |
| Timeout config | Not configurable | `timeout` option |
| Retry config | Not built-in | `maxRetries` option |

### Environment Configuration

The new SDK supports environment-based configuration:
- `prod-us` → `https://api.hiddenlayer.ai`
- `prod-eu` → `https://api.eu.hiddenlayer.ai`

---

## Environment Variables

| v2.x (Previous) | v3.0.0 (New) |
|---------------|--------------|
| `HL_CLIENT_ID` | `HIDDENLAYER_CLIENT_ID` |
| `HL_CLIENT_SECRET` | `HIDDENLAYER_CLIENT_SECRET` |
| N/A | `HIDDENLAYER_TOKEN` |
| N/A | `HIDDENLAYER_BASE_URL` |
| N/A | `HIDDENLAYER_LOG` |

---

## Model Scanning

### Scanning a File

**v2.x (Previous):**
```typescript
const result = await client.modelScanner.scanFile(
  'model-name',          // modelName
  '/path/to/model.pkl',  // modelPath
  'v1',                  // modelVersion (optional)
  true                   // waitForResults (optional)
);
```

**v3.0.0 (New):**
```typescript
const result = await client.modelScanner.scanFile({
  modelName: 'model-name',
  modelPath: '/path/to/model.pkl',
  modelVersion: 'v1',
  waitForResults: true,
  requestSource: 'API Upload',
  origin: '',
});
```

### Scanning a Folder

**v2.x (Previous):**
```typescript
const result = await client.modelScanner.scanFolder(
  'model-name',
  '/path/to/folder',
  'v1',
  ['*.safetensors'],  // allowFilePatterns
  ['*.txt'],          // ignoreFilePatterns
  true
);
```

**v3.0.0 (New):**
```typescript
const result = await client.modelScanner.scanFolder({
  modelName: 'model-name',
  path: '/path/to/folder',
  modelVersion: 'v1',
  allowFilePatterns: ['*.safetensors'],
  ignoreFilePatterns: ['*.txt'],
  waitForResults: true,
});
```

### Scanning S3 Models

**v2.x (Previous):**
```typescript
const result = await client.modelScanner.scanS3Model(
  'model-name',
  'bucket-name',
  'path/to/model',
  'v1',
  true
);
```

**v3.0.0 (New):**
```typescript
const result = await client.modelScanner.scanS3Model({
  modelName: 'model-name',
  bucket: 'bucket-name',
  key: 'path/to/model',
  modelVersion: 'v1',
  s3Client: customS3Client,  // optional
  waitForResults: true,
});
```

### Scanning Azure Blob Models

**v2.x (Previous):**
```typescript
const result = await client.modelScanner.scanAzureBlobModel(
  'model-name',
  'https://account.blob.core.windows.net',
  'container',
  'blob-path',
  'v1',
  'sas-key',
  true
);
```

**v3.0.0 (New):**
```typescript
const result = await client.modelScanner.scanAzureBlobModel({
  modelName: 'model-name',
  accountUrl: 'https://account.blob.core.windows.net',
  container: 'container',
  blob: 'blob-path',
  modelVersion: 'v1',
  credential: '?<sas_key>',
  blobServiceClient: customClient,  // optional
  waitForResults: true,
});
```

### Scanning HuggingFace Models (New in v3.0.0)

```typescript
const result = await client.modelScanner.scanHuggingFaceModel({
  repoId: 'owner/repo',
  modelName: 'my-model',
  revision: 'main',
  localDir: '/tmp/models',
  allowFilePatterns: ['*.safetensors'],
  ignoreFilePatterns: ['*.md'],
  hfToken: 'hf_xxx',
  waitForResults: true,
});
```

### Getting Scan Results

**v2.x (Previous):**
```typescript
const results = await client.modelScanner.getScanResults(scanId, true);
const sarif = await client.modelScanner.getSarifResults(scanId);
```

**v3.0.0 (New):**
```typescript
import { getScanResults, waitForScanResults } from 'hiddenlayer';

const results = await getScanResults(client, scanId);
const results = await waitForScanResults(client, scanId);
const sarif = await client.scans.results.sarif(scanId);
```

---

## Community Scanning

**v2.x (Previous):**
```typescript
import { ScanJobAccessSourceEnum } from '@hiddenlayerai/hiddenlayer-sdk';

const result = await client.modelScanner.communityScan(
  'model-name',
  'https://presigned-url',
  ScanJobAccessSourceEnum.AwsPresigned,
  'v1',
  true
);
```

**v3.0.0 (New):**
```typescript
import { CommunityScanSource } from 'hiddenlayer';

const result = await client.communityScanner.communityScan({
  modelName: 'model-name',
  modelPath: 'https://presigned-url',
  modelSource: CommunityScanSource.AWS_PRESIGNED,
  modelVersion: 'v1',
  waitForResults: true,
});
```

### Source Type Constants

| v2.x (`ScanJobAccessSourceEnum`) | v3.0.0 (`CommunityScanSource`) |
|----------------------------------|--------------------------------|
| `AwsPresigned` | `AWS_PRESIGNED` |
| `AwsIamRole` | `AWS_IAM_ROLE` |
| `AzureBlobSas` | `AZURE_BLOB_SAS` |
| `AzureBlobAd` | `AZURE_BLOB_AD` |
| `GoogleSigned` | `GOOGLE_SIGNED` |
| `GoogleOauth` | `GOOGLE_OAUTH` |
| `HuggingFace` | `HUGGING_FACE` |
| `Local` | `LOCAL` |

---

## Sensor Management

### Creating a Sensor

**v2.x (Previous):**
```typescript
const sensor = await client.model.createSensor('model-name', 1);
const sensor = await client.model.createOrGetSensor('model-name', 1);
```

**v3.0.0 (New):**
```typescript
const sensor = await client.sensors.create({
  plaintext_name: 'model-name',
  version: 1,
  adhoc: true,
});
```

### Querying Sensors

**v2.x (Previous):**
```typescript
const sensor = await client.model.getSensor('model-name', 1);
```

**v3.0.0 (New):**
```typescript
const response = await client.sensors.query({
  filter: {
    plaintext_name: 'model-name',
    version: 1,
  },
});
const sensor = response.results[0];
```

### Getting a Sensor by ID

**v2.x (Previous):** Not available directly

**v3.0.0 (New):**
```typescript
const sensor = await client.sensors.retrieve('sensor-id');
```

### Updating a Sensor

**v2.x (Previous):** Not available

**v3.0.0 (New):**
```typescript
await client.sensors.update('sensor-id', {
  plaintext_name: 'new-name',
  active: false,
});
```

### Deleting a Sensor

**v2.x (Previous):**
```typescript
await client.model.deleteSensor('sensor-id');
```

**v3.0.0 (New):**
```typescript
await client.sensors.delete('sensor-id');
```

---

## Model Management

**v2.x (Previous):**
```typescript
const model = await client.model.getModel('model-id');
await client.model.deleteModel('model-id');
```

**v3.0.0 (New):**
```typescript
const model = await client.models.retrieve('model-id');
await client.models.delete('model-id');
```

---

## Error Handling

### v2.x (Previous)

```typescript
import { ResponseError } from '@hiddenlayerai/hiddenlayer-sdk';

try {
  await client.model.getSensor('name');
} catch (error) {
  if (error instanceof ResponseError && error.response.status === 400) {
    // handle error
  }
}
```

### v3.0.0 (New)

```typescript
import HiddenLayer, {
  HiddenLayerError,
  APIError,
  BadRequestError,
  AuthenticationError,
  PermissionDeniedError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  InternalServerError,
  APIConnectionError,
  APIConnectionTimeoutError,
} from 'hiddenlayer';

try {
  await client.sensors.retrieve('sensor-id');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(error.status);  // 404
    console.log(error.message);
    console.log(error.headers);
    console.log(error.error);   // JSON body
  }
}
```

### Error Classes

| HTTP Status | v3.0.0 Error Class |
|-------------|-------------------|
| 400 | `BadRequestError` |
| 401 | `AuthenticationError` |
| 403 | `PermissionDeniedError` |
| 404 | `NotFoundError` |
| 409 | `ConflictError` |
| 422 | `UnprocessableEntityError` |
| 429 | `RateLimitError` |
| 5xx | `InternalServerError` |
| Network failure | `APIConnectionError` |
| Timeout | `APIConnectionTimeoutError` |

---

## Type Changes

### Property Naming Convention

Properties changed from camelCase to snake_case:

| v2.x (Previous) | v3.0.0 (New) |
|---------------|--------------|
| `sensorId` | `sensor_id` |
| `modelId` | `model_id` |
| `plaintextName` | `plaintext_name` |
| `tenantId` | `tenant_id` |
| `createdAt` | `created_at` |
| `scanId` | `scan_id` |
| `detectionCount` | `detection_count` |
| `fileCount` | `file_count` |

### Scan Status

| v2.x (Previous) | v3.0.0 (New) |
|---------------|--------------|
| `ScanReportV3StatusEnum.Done` | `'done'` or `ScanStatus.DONE` |
| `ScanReportV3StatusEnum.Failed` | `'failed'` or `ScanStatus.FAILED` |
| `ScanReportV3StatusEnum.Pending` | `'pending'` or `ScanStatus.PENDING` |
| `ScanReportV3StatusEnum.Running` | `'running'` or `ScanStatus.RUNNING` |

### Type Imports

**v2.x (Previous):**
```typescript
import {
  ScanReportV3,
  ScanReportV3StatusEnum,
  Sarif210,
  Sensor,
  Model,
} from '@hiddenlayerai/hiddenlayer-sdk';
```

**v3.0.0 (New):**
```typescript
import type { ScanReport } from 'hiddenlayer/resources/scans/results';
import type { SensorCreateResponse } from 'hiddenlayer/resources/sensors';
import type { ModelRetrieveResponse } from 'hiddenlayer/resources/models/models';
import { ScanStatus, CommunityScanSource } from 'hiddenlayer';
```

---

## New APIs

### Interactions API

Analyzes LLM inputs and outputs for security threats:

```typescript
const response = await client.interactions.analyze({
  metadata: {
    model: 'gpt-4',
    requester_id: 'user-123',
  },
  input: {
    messages: [{ role: 'user', content: 'Hello' }],
  },
  output: {
    messages: [{ role: 'assistant', content: 'Hi there!' }],
  },
});

// Response includes:
// - analysis: detection results
// - analyzed_data: the data that was analyzed
// - modified_data: data with redactions applied
// - evaluation: { action, threat_level, has_detections }
```

### Prompt Analyzer API

Analyzes prompts for injection attacks, PII, and unsafe content:

```typescript
const result = await client.promptAnalyzer.create({
  prompt: 'Your prompt here',
  output: 'LLM response',  // optional
  model: 'gpt-4',          // optional
});

// Response includes:
// - verdict: boolean
// - categories: { prompt_injection, input_pii, unsafe_input, ... }
// - frameworks: { mitre, owasp }
// - results: detailed classifier results
```

### Model Cards API

```typescript
const cards = await client.models.cards.list({
  limit: 10,
  offset: 0,
});
```

### Scan Jobs API

```typescript
// List scans with filtering
const scans = await client.scans.jobs.list({
  status: ['done', 'failed'],
  severity: 'high',
  model_name: { contains: 'prod' },
  limit: 50,
});

// Request a remote scan
const job = await client.scans.jobs.request({
  access: { source: 'HUGGING_FACE' },
  inventory: {
    model_name: 'model-name',
    model_version: 'v1',
    requested_scan_location: 'owner/repo',
    requesting_entity: 'user@example.com',
  },
});
```

---

## Removed APIs

| v2.x API | Status in v3.0.0 |
|----------|------------------|
| `HiddenLayerServiceClient.createSaaSClient()` | Use `new HiddenLayer()` |
| `HiddenLayerServiceClient.createEnterpriseClient()` | Use `new HiddenLayer({ baseURL })` |
| `client.model.createOrGetSensor()` | Removed - query then create |
| `client.model.getSensorWithRetry()` | Built-in retry in v3.0.0 |
| `client.modelScanner.getScanResults()` | Use `getScanResults()` helper |
| `client.modelScanner.getSarifResults()` | Use `client.scans.results.sarif()` |
| `AidrPredictiveApi` | Replaced by `client.interactions` |
| `HealthApi` | Removed |
| `ReadinessApi` | Removed |
| `SensorApi` (direct access) | Use `client.sensors.*` |
| `ModelApi` (direct access) | Use `client.models.*` |
| `ModelSupplyChainApi` (direct access) | Use `client.scans.*` |
| `Configuration` class | Use constructor options |

---

## Configuration Options

| Option | v2.x (Previous) | v3.0.0 (New) |
|--------|---------------|--------------|
| Client ID | Constructor param | `clientID` |
| Client Secret | Constructor param | `clientSecret` |
| Bearer Token | Not supported | `bearerToken` |
| Base URL | Constructor param | `baseURL` |
| Environment | N/A | `environment` (`prod-us`, `prod-eu`) |
| Timeout | Not configurable | `timeout` (default: 60s) |
| Retries | Not configurable | `maxRetries` (default: 2) |
| Logging | Not supported | `logLevel`, `logger` |
| Custom Fetch | Not supported | `fetch`, `fetchOptions` |

---

## Migration Checklist

- [ ] Update package name from `@hiddenlayerai/hiddenlayer-sdk` to `hiddenlayer`
- [ ] Update import statements
- [ ] Replace `HiddenLayerServiceClient` with `HiddenLayer`
- [ ] Update client initialization to use constructor
- [ ] Update environment variables (`HL_*` → `HIDDENLAYER_*`)
- [ ] Convert positional arguments to options objects for scanning methods
- [ ] Update property names from camelCase to snake_case
- [ ] Update error handling to use new error classes
- [ ] Replace `ScanJobAccessSourceEnum` with `CommunityScanSource`
- [ ] Replace `ResponseError` with `APIError`
- [ ] Update sensor/model management calls
- [ ] Test authentication flow
