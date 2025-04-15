# Shared

Types:

- <code><a href="./src/resources/shared.ts">Exception</a></code>
- <code><a href="./src/resources/shared.ts">Node</a></code>

# Models

Types:

- <code><a href="./src/resources/models/models.ts">ModelRetrieveResponse</a></code>

Methods:

- <code title="get /api/v2/models/{model_id}">client.models.<a href="./src/resources/models/models.ts">retrieve</a>(modelID) -> ModelRetrieveResponse</code>
- <code title="delete /api/v2/models/{model_id}">client.models.<a href="./src/resources/models/models.ts">delete</a>(modelID) -> void</code>

## Cards

Types:

- <code><a href="./src/resources/models/cards.ts">CardListResponse</a></code>

Methods:

- <code title="get /models/v3/cards">client.models.cards.<a href="./src/resources/models/cards.ts">list</a>({ ...params }) -> CardListResponse</code>

# Sensors

Types:

- <code><a href="./src/resources/sensors.ts">Sensor</a></code>
- <code><a href="./src/resources/sensors.ts">SensorQueryResponse</a></code>

Methods:

- <code title="post /api/v2/sensors/create">client.sensors.<a href="./src/resources/sensors.ts">create</a>({ ...params }) -> Sensor</code>
- <code title="get /api/v2/sensors/{sensor_id}">client.sensors.<a href="./src/resources/sensors.ts">retrieve</a>(sensorID) -> Sensor</code>
- <code title="delete /api/v2/sensors/{sensor_id}">client.sensors.<a href="./src/resources/sensors.ts">delete</a>(sensorID) -> void</code>
- <code title="post /api/v2/sensors/query">client.sensors.<a href="./src/resources/sensors.ts">query</a>({ ...params }) -> SensorQueryResponse</code>

# Vectors

Types:

- <code><a href="./src/resources/vectors.ts">VectorSubmitVectorsResponse</a></code>

Methods:

- <code title="post /api/v2/submit">client.vectors.<a href="./src/resources/vectors.ts">submitVectors</a>({ ...params }) -> VectorSubmitVectorsResponse</code>

# Scans

Types:

- <code><a href="./src/resources/scans/scans.ts">ScanRetrieveResultsResponse</a></code>

Methods:

- <code title="get /scans/v3/health">client.scans.<a href="./src/resources/scans/scans.ts">checkHealth</a>() -> void</code>
- <code title="get /scans/v3/readiness">client.scans.<a href="./src/resources/scans/scans.ts">checkReadiness</a>() -> void</code>
- <code title="post /scans/v3/reports/{scan_id}">client.scans.<a href="./src/resources/scans/scans.ts">createReport</a>(scanID, { ...params }) -> void</code>
- <code title="get /scans/v3/results/{scan_id}">client.scans.<a href="./src/resources/scans/scans.ts">retrieveResults</a>(scanID, { ...params }) -> unknown</code>

## Results

Types:

- <code><a href="./src/resources/scans/results.ts">FileScanReport</a></code>
- <code><a href="./src/resources/scans/results.ts">ScanReport</a></code>
- <code><a href="./src/resources/scans/results.ts">ResultListResponse</a></code>
- <code><a href="./src/resources/scans/results.ts">ResultPatchResponse</a></code>

Methods:

- <code title="get /scan/v3/results/{scan_id}">client.scans.results.<a href="./src/resources/scans/results.ts">retrieve</a>(scanID, { ...params }) -> ScanReport</code>
- <code title="get /scan/v3/results">client.scans.results.<a href="./src/resources/scans/results.ts">list</a>({ ...params }) -> ResultListResponse</code>
- <code title="patch /scan/v3/results/{scan_id}">client.scans.results.<a href="./src/resources/scans/results.ts">patch</a>(scanID, { ...params }) -> ResultPatchResponse</code>
- <code title="post /scan/v3/results/{scan_id}">client.scans.results.<a href="./src/resources/scans/results.ts">start</a>(scanID, { ...params }) -> void</code>

## Jobs

Types:

- <code><a href="./src/resources/scans/jobs.ts">ScanJob</a></code>

Methods:

- <code title="get /scan/v3/jobs">client.scans.jobs.<a href="./src/resources/scans/jobs.ts">list</a>() -> ScanJob</code>
- <code title="post /scan/v3/jobs">client.scans.jobs.<a href="./src/resources/scans/jobs.ts">request</a>({ ...params }) -> ScanReport</code>

## Upload

Types:

- <code><a href="./src/resources/scans/upload/upload.ts">UploadCompleteAllResponse</a></code>
- <code><a href="./src/resources/scans/upload/upload.ts">UploadStartResponse</a></code>

Methods:

- <code title="patch /scan/v3/upload/{scan_id}">client.scans.upload.<a href="./src/resources/scans/upload/upload.ts">completeAll</a>(scanID) -> UploadCompleteAllResponse</code>
- <code title="post /scan/v3/upload">client.scans.upload.<a href="./src/resources/scans/upload/upload.ts">start</a>({ ...params }) -> UploadStartResponse</code>

### File

Types:

- <code><a href="./src/resources/scans/upload/file.ts">FileAddResponse</a></code>
- <code><a href="./src/resources/scans/upload/file.ts">FileCompleteResponse</a></code>

Methods:

- <code title="post /scan/v3/upload/{scan_id}/file">client.scans.upload.file.<a href="./src/resources/scans/upload/file.ts">add</a>(scanID, { ...params }) -> FileAddResponse</code>
- <code title="patch /scan/v3/upload/{scan_id}/file/{file_id}">client.scans.upload.file.<a href="./src/resources/scans/upload/file.ts">complete</a>(fileID, { ...params }) -> FileCompleteResponse</code>
