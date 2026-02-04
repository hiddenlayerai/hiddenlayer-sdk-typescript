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

- <code title="get /models/v4/cards">client.models.cards.<a href="./src/resources/models/cards.ts">list</a>({ ...params }) -> CardListResponsesOffsetPage</code>

# Evaluations

## RedTeam

Types:

- <code><a href="./src/resources/evaluations/red-team.ts">RedTeamCreateResponse</a></code>
- <code><a href="./src/resources/evaluations/red-team.ts">RedTeamRetrieveEvaluationResultsResponse</a></code>
- <code><a href="./src/resources/evaluations/red-team.ts">RedTeamRetrieveNextActionResponse</a></code>
- <code><a href="./src/resources/evaluations/red-team.ts">RedTeamRetrieveStatusResponse</a></code>
- <code><a href="./src/resources/evaluations/red-team.ts">RedTeamSubmitTargetResponseResponse</a></code>

Methods:

- <code title="post /evaluations/v1-beta/red-team">client.evaluations.redTeam.<a href="./src/resources/evaluations/red-team.ts">create</a>({ ...params }) -> RedTeamCreateResponse</code>
- <code title="get /evaluations/v1-beta/red-team/{workflow_id}">client.evaluations.redTeam.<a href="./src/resources/evaluations/red-team.ts">retrieveEvaluationResults</a>(workflowID) -> RedTeamRetrieveEvaluationResultsResponse</code>
- <code title="get /evaluations/v1-beta/red-team/{workflow_id}/next-action">client.evaluations.redTeam.<a href="./src/resources/evaluations/red-team.ts">retrieveNextAction</a>(workflowID) -> RedTeamRetrieveNextActionResponse</code>
- <code title="get /evaluations/v1-beta/red-team/{workflow_id}/status">client.evaluations.redTeam.<a href="./src/resources/evaluations/red-team.ts">retrieveStatus</a>(workflowID) -> RedTeamRetrieveStatusResponse</code>
- <code title="post /evaluations/v1-beta/red-team/{workflow_id}/target-response">client.evaluations.redTeam.<a href="./src/resources/evaluations/red-team.ts">submitTargetResponse</a>(workflowID, { ...params }) -> RedTeamSubmitTargetResponseResponse</code>
- <code title="post /evaluations/v1-beta/red-team/terminations/{workflow_id}">client.evaluations.redTeam.<a href="./src/resources/evaluations/red-team.ts">terminate</a>(workflowID) -> void</code>

# PromptAnalyzer

Types:

- <code><a href="./src/resources/prompt-analyzer.ts">PromptAnalyzerCreateResponse</a></code>

Methods:

- <code title="post /api/v1/submit/prompt-analyzer">client.promptAnalyzer.<a href="./src/resources/prompt-analyzer.ts">create</a>({ ...params }) -> PromptAnalyzerCreateResponse</code>

# Interactions

Types:

- <code><a href="./src/resources/interactions.ts">InteractionAnalyzeResponse</a></code>

Methods:

- <code title="post /detection/v1/interactions">client.interactions.<a href="./src/resources/interactions.ts">analyze</a>({ ...params }) -> InteractionAnalyzeResponse</code>

# Sensors

Types:

- <code><a href="./src/resources/sensors.ts">SensorCreateResponse</a></code>
- <code><a href="./src/resources/sensors.ts">SensorRetrieveResponse</a></code>
- <code><a href="./src/resources/sensors.ts">SensorUpdateResponse</a></code>
- <code><a href="./src/resources/sensors.ts">SensorQueryResponse</a></code>

Methods:

- <code title="post /api/v2/sensors/create">client.sensors.<a href="./src/resources/sensors.ts">create</a>({ ...params }) -> SensorCreateResponse</code>
- <code title="get /api/v2/sensors/{sensor_id}">client.sensors.<a href="./src/resources/sensors.ts">retrieve</a>(sensorID) -> SensorRetrieveResponse</code>
- <code title="put /api/v2/sensors/{sensor_id}">client.sensors.<a href="./src/resources/sensors.ts">update</a>(sensorID, { ...params }) -> SensorUpdateResponse</code>
- <code title="delete /api/v2/sensors/{sensor_id}">client.sensors.<a href="./src/resources/sensors.ts">delete</a>(sensorID) -> void</code>
- <code title="post /api/v2/sensors/query">client.sensors.<a href="./src/resources/sensors.ts">query</a>({ ...params }) -> SensorQueryResponse</code>

# Scans

## Results

Types:

- <code><a href="./src/resources/scans/results.ts">FileScanReport</a></code>
- <code><a href="./src/resources/scans/results.ts">ScanReport</a></code>
- <code><a href="./src/resources/scans/results.ts">ResultSarifResponse</a></code>

Methods:

- <code title="get /scan/v3/results/{scan_id}/sarif">client.scans.results.<a href="./src/resources/scans/results.ts">sarif</a>(scanID) -> string</code>

## Jobs

Types:

- <code><a href="./src/resources/scans/jobs.ts">ScanJob</a></code>
- <code><a href="./src/resources/scans/jobs.ts">JobListResponse</a></code>

Methods:

- <code title="get /scan/v3/results/{scan_id}">client.scans.jobs.<a href="./src/resources/scans/jobs.ts">retrieve</a>(scanID, { ...params }) -> ScanReport</code>
- <code title="get /scan/v3/results">client.scans.jobs.<a href="./src/resources/scans/jobs.ts">list</a>({ ...params }) -> JobListResponse</code>
- <code title="post /scan/v3/jobs">client.scans.jobs.<a href="./src/resources/scans/jobs.ts">request</a>({ ...params }) -> ScanJob</code>

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
