# API

## V2

Types:

- <code><a href="./src/resources/api/v2/v2.ts">V2SubmitVectorsResponse</a></code>

Methods:

- <code title="post /api/v2/submit">client.api.v2.<a href="./src/resources/api/v2/v2.ts">submitVectors</a>({ ...params }) -> V2SubmitVectorsResponse</code>

### Sensors

Types:

- <code><a href="./src/resources/api/v2/sensors.ts">Sensor</a></code>
- <code><a href="./src/resources/api/v2/sensors.ts">SensorQueryResponse</a></code>

Methods:

- <code title="post /api/v2/sensors/create">client.api.v2.sensors.<a href="./src/resources/api/v2/sensors.ts">create</a>({ ...params }) -> Sensor</code>
- <code title="get /api/v2/sensors/{sensor_id}">client.api.v2.sensors.<a href="./src/resources/api/v2/sensors.ts">retrieve</a>(sensorID) -> Sensor</code>
- <code title="delete /api/v2/sensors/{sensor_id}">client.api.v2.sensors.<a href="./src/resources/api/v2/sensors.ts">delete</a>(sensorID) -> void</code>
- <code title="post /api/v2/sensors/query">client.api.v2.sensors.<a href="./src/resources/api/v2/sensors.ts">query</a>({ ...params }) -> SensorQueryResponse</code>

### Models

Types:

- <code><a href="./src/resources/api/v2/models.ts">ModelRetrieveResponse</a></code>

Methods:

- <code title="get /api/v2/models/{model_id}">client.api.v2.models.<a href="./src/resources/api/v2/models.ts">retrieve</a>(modelID) -> ModelRetrieveResponse</code>
- <code title="delete /api/v2/models/{model_id}">client.api.v2.models.<a href="./src/resources/api/v2/models.ts">delete</a>(modelID) -> void</code>

# Models

## V3

Types:

- <code><a href="./src/resources/models/v3.ts">V3ListCardsResponse</a></code>

Methods:

- <code title="get /models/v3/cards">client.models.v3.<a href="./src/resources/models/v3.ts">listCards</a>({ ...params }) -> V3ListCardsResponse</code>

# Scan

## V3

Types:

- <code><a href="./src/resources/scan/v3/v3.ts">V3RetrieveResultsResponse</a></code>

Methods:

- <code title="get /scans/v3/health">client.scan.v3.<a href="./src/resources/scan/v3/v3.ts">checkHealth</a>() -> void</code>
- <code title="get /scans/v3/readiness">client.scan.v3.<a href="./src/resources/scan/v3/v3.ts">checkReadiness</a>() -> void</code>
- <code title="post /scans/v3/reports/{scan_id}">client.scan.v3.<a href="./src/resources/scan/v3/v3.ts">createReport</a>(scanID, { ...params }) -> void</code>
- <code title="get /scans/v3/results/{scan_id}">client.scan.v3.<a href="./src/resources/scan/v3/v3.ts">retrieveResults</a>(scanID, { ...params }) -> unknown</code>

### Results

Types:

- <code><a href="./src/resources/scan/v3/results.ts">FileScanReport</a></code>
- <code><a href="./src/resources/scan/v3/results.ts">ScanReport</a></code>
- <code><a href="./src/resources/scan/v3/results.ts">ResultListResponse</a></code>
- <code><a href="./src/resources/scan/v3/results.ts">ResultCompletePartResponse</a></code>

Methods:

- <code title="get /scan/v3/results/{scan_id}">client.scan.v3.results.<a href="./src/resources/scan/v3/results.ts">retrieve</a>(scanID, { ...params }) -> ScanReport</code>
- <code title="get /scan/v3/results">client.scan.v3.results.<a href="./src/resources/scan/v3/results.ts">list</a>({ ...params }) -> ResultListResponse</code>
- <code title="patch /scan/v3/results/{scan_id}">client.scan.v3.results.<a href="./src/resources/scan/v3/results.ts">completePart</a>(scanID, { ...params }) -> ResultCompletePartResponse</code>
- <code title="post /scan/v3/results/{scan_id}">client.scan.v3.results.<a href="./src/resources/scan/v3/results.ts">start</a>(scanID, { ...params }) -> void</code>

### Jobs

Types:

- <code><a href="./src/resources/scan/v3/jobs.ts">ScanJob</a></code>

Methods:

- <code title="get /scan/v3/jobs">client.scan.v3.jobs.<a href="./src/resources/scan/v3/jobs.ts">list</a>() -> ScanJob</code>
- <code title="post /scan/v3/jobs">client.scan.v3.jobs.<a href="./src/resources/scan/v3/jobs.ts">request</a>({ ...params }) -> ScanReport</code>

### Upload

Types:

- <code><a href="./src/resources/scan/v3/upload/upload.ts">UploadCompleteAllResponse</a></code>
- <code><a href="./src/resources/scan/v3/upload/upload.ts">UploadStartResponse</a></code>

Methods:

- <code title="patch /scan/v3/upload/{scan_id}">client.scan.v3.upload.<a href="./src/resources/scan/v3/upload/upload.ts">completeAll</a>(scanID) -> UploadCompleteAllResponse</code>
- <code title="post /scan/v3/upload">client.scan.v3.upload.<a href="./src/resources/scan/v3/upload/upload.ts">start</a>({ ...params }) -> UploadStartResponse</code>

#### File

Types:

- <code><a href="./src/resources/scan/v3/upload/file.ts">FileAddResponse</a></code>
- <code><a href="./src/resources/scan/v3/upload/file.ts">FileCompleteResponse</a></code>

Methods:

- <code title="post /scan/v3/upload/{scan_id}/file">client.scan.v3.upload.file.<a href="./src/resources/scan/v3/upload/file.ts">add</a>(scanID, { ...params }) -> FileAddResponse</code>
- <code title="patch /scan/v3/upload/{scan_id}/file/{file_id}">client.scan.v3.upload.file.<a href="./src/resources/scan/v3/upload/file.ts">complete</a>(fileID, { ...params }) -> FileCompleteResponse</code>

# Scans
