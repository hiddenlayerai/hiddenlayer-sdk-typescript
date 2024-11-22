/* tslint:disable */
/* eslint-disable */
/**
 * HiddenLayer ModelScan V2
 * HiddenLayer ModelScan API for scanning of models
 *
 * The version of the OpenAPI document: 1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ModelScanApiV3ScanModelVersionIdPatch200Response,
  ModelScanApiV3ScanQuery200Response,
  Sarif210,
  ScanCreateRequest,
  ScanJob,
  ScanReportV3,
  ScanResultsV2,
  ValidationErrorModel,
} from '../models/index';
import {
    ModelScanApiV3ScanModelVersionIdPatch200ResponseFromJSON,
    ModelScanApiV3ScanModelVersionIdPatch200ResponseToJSON,
    ModelScanApiV3ScanQuery200ResponseFromJSON,
    ModelScanApiV3ScanQuery200ResponseToJSON,
    Sarif210FromJSON,
    Sarif210ToJSON,
    ScanCreateRequestFromJSON,
    ScanCreateRequestToJSON,
    ScanJobFromJSON,
    ScanJobToJSON,
    ScanReportV3FromJSON,
    ScanReportV3ToJSON,
    ScanResultsV2FromJSON,
    ScanResultsV2ToJSON,
    ValidationErrorModelFromJSON,
    ValidationErrorModelToJSON,
} from '../models/index';

export interface ModelScanApiV3ScanModelVersionIdGetRequest {
    scanId: string;
    hasDetections?: boolean;
}

export interface ModelScanApiV3ScanModelVersionIdPatchRequest {
    scanId: string;
    scanReportV3: ScanReportV3;
    hasDetections?: boolean;
}

export interface ModelScanApiV3ScanModelVersionIdPostRequest {
    scanId: string;
    scanReportV3: ScanReportV3;
    hasDetections?: boolean;
}

export interface ModelScanApiV3ScanQueryRequest {
    modelVersionIds?: Array<string>;
    modelIds?: Array<string>;
    startTime?: Date;
    endTime?: Date;
    severity?: Array<string>;
    status?: Array<string>;
    limit?: number;
    offset?: number;
    sort?: string;
    latestPerModelVersionOnly?: boolean;
}

export interface ModelscanApiV3GetScanResultsRequest {
    scanId?: string;
}

export interface ModelscanApiV3PostScanResultsRequest {
    scanId: string;
    scanCreateRequest: ScanCreateRequest;
}

export interface ModelscannerApiV3PostRequestRequest {
    scanJob: Omit<ScanJob, 'scan_id'|'status'>;
}

/**
 * 
 */
export class ModelSupplyChainApi extends runtime.BaseAPI {

    /**
     * Get Result of a Model Scan
     */
    async modelScanApiV3ScanModelVersionIdGetRaw(requestParameters: ModelScanApiV3ScanModelVersionIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ScanReportV3>> {
        if (requestParameters['scanId'] == null) {
            throw new runtime.RequiredError(
                'scanId',
                'Required parameter "scanId" was null or undefined when calling modelScanApiV3ScanModelVersionIdGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['hasDetections'] != null) {
            queryParameters['has_detections'] = requestParameters['hasDetections'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scan/v3/results/{scan_id}`.replace(`{${"scan_id"}}`, encodeURIComponent(String(requestParameters['scanId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ScanReportV3FromJSON(jsonValue));
    }

    /**
     * Get Result of a Model Scan
     */
    async modelScanApiV3ScanModelVersionIdGet(requestParameters: ModelScanApiV3ScanModelVersionIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ScanReportV3> {
        const response = await this.modelScanApiV3ScanModelVersionIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Indicate part (file or files) of a model scan has completed
     */
    async modelScanApiV3ScanModelVersionIdPatchRaw(requestParameters: ModelScanApiV3ScanModelVersionIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelScanApiV3ScanModelVersionIdPatch200Response>> {
        if (requestParameters['scanId'] == null) {
            throw new runtime.RequiredError(
                'scanId',
                'Required parameter "scanId" was null or undefined when calling modelScanApiV3ScanModelVersionIdPatch().'
            );
        }

        if (requestParameters['scanReportV3'] == null) {
            throw new runtime.RequiredError(
                'scanReportV3',
                'Required parameter "scanReportV3" was null or undefined when calling modelScanApiV3ScanModelVersionIdPatch().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['hasDetections'] != null) {
            queryParameters['has_detections'] = requestParameters['hasDetections'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scan/v3/results/{scan_id}`.replace(`{${"scan_id"}}`, encodeURIComponent(String(requestParameters['scanId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ScanReportV3ToJSON(requestParameters['scanReportV3']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelScanApiV3ScanModelVersionIdPatch200ResponseFromJSON(jsonValue));
    }

    /**
     * Indicate part (file or files) of a model scan has completed
     */
    async modelScanApiV3ScanModelVersionIdPatch(requestParameters: ModelScanApiV3ScanModelVersionIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelScanApiV3ScanModelVersionIdPatch200Response> {
        const response = await this.modelScanApiV3ScanModelVersionIdPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Indicate model scan has started
     */
    async modelScanApiV3ScanModelVersionIdPostRaw(requestParameters: ModelScanApiV3ScanModelVersionIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['scanId'] == null) {
            throw new runtime.RequiredError(
                'scanId',
                'Required parameter "scanId" was null or undefined when calling modelScanApiV3ScanModelVersionIdPost().'
            );
        }

        if (requestParameters['scanReportV3'] == null) {
            throw new runtime.RequiredError(
                'scanReportV3',
                'Required parameter "scanReportV3" was null or undefined when calling modelScanApiV3ScanModelVersionIdPost().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['hasDetections'] != null) {
            queryParameters['has_detections'] = requestParameters['hasDetections'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scan/v3/results/{scan_id}`.replace(`{${"scan_id"}}`, encodeURIComponent(String(requestParameters['scanId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ScanReportV3ToJSON(requestParameters['scanReportV3']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Indicate model scan has started
     */
    async modelScanApiV3ScanModelVersionIdPost(requestParameters: ModelScanApiV3ScanModelVersionIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.modelScanApiV3ScanModelVersionIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * Get condensed reports for a Model Scan
     */
    async modelScanApiV3ScanQueryRaw(requestParameters: ModelScanApiV3ScanQueryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelScanApiV3ScanQuery200Response>> {
        const queryParameters: any = {};

        if (requestParameters['modelVersionIds'] != null) {
            queryParameters['model_version_ids'] = requestParameters['modelVersionIds']!.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters['modelIds'] != null) {
            queryParameters['model_ids'] = requestParameters['modelIds']!.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters['startTime'] != null) {
            queryParameters['start_time'] = (requestParameters['startTime'] as any).toISOString();
        }

        if (requestParameters['endTime'] != null) {
            queryParameters['end_time'] = (requestParameters['endTime'] as any).toISOString();
        }

        if (requestParameters['severity'] != null) {
            queryParameters['severity'] = requestParameters['severity']!.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters['status'] != null) {
            queryParameters['status'] = requestParameters['status']!.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['sort'] != null) {
            queryParameters['sort'] = requestParameters['sort'];
        }

        if (requestParameters['latestPerModelVersionOnly'] != null) {
            queryParameters['latest_per_model_version_only'] = requestParameters['latestPerModelVersionOnly'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scan/v3/results`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelScanApiV3ScanQuery200ResponseFromJSON(jsonValue));
    }

    /**
     * Get condensed reports for a Model Scan
     */
    async modelScanApiV3ScanQuery(requestParameters: ModelScanApiV3ScanQueryRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelScanApiV3ScanQuery200Response> {
        const response = await this.modelScanApiV3ScanQueryRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve Model Scan Results
     */
    async modelscanApiV3GetScanResultsRaw(requestParameters: ModelscanApiV3GetScanResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ScanResultsV2>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scans/v3/results/{scan_id}`.replace(`{${"scan_id"}}`, encodeURIComponent(String(requestParameters['scanId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ScanResultsV2FromJSON));
    }

    /**
     * Retrieve Model Scan Results
     */
    async modelscanApiV3GetScanResults(requestParameters: ModelscanApiV3GetScanResultsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ScanResultsV2>> {
        const response = await this.modelscanApiV3GetScanResultsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Engine Report Endpoint of Model Scan Results
     */
    async modelscanApiV3PostScanResultsRaw(requestParameters: ModelscanApiV3PostScanResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['scanId'] == null) {
            throw new runtime.RequiredError(
                'scanId',
                'Required parameter "scanId" was null or undefined when calling modelscanApiV3PostScanResults().'
            );
        }

        if (requestParameters['scanCreateRequest'] == null) {
            throw new runtime.RequiredError(
                'scanCreateRequest',
                'Required parameter "scanCreateRequest" was null or undefined when calling modelscanApiV3PostScanResults().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scans/v3/reports/{scan_id}`.replace(`{${"scan_id"}}`, encodeURIComponent(String(requestParameters['scanId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ScanCreateRequestToJSON(requestParameters['scanCreateRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Engine Report Endpoint of Model Scan Results
     */
    async modelscanApiV3PostScanResults(requestParameters: ModelscanApiV3PostScanResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.modelscanApiV3PostScanResultsRaw(requestParameters, initOverrides);
    }

    /**
     * List all Model Scan Jobs
     */
    async modelscannerApiV3GetJobsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ScanJob>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scans/v3/jobs`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ScanJobFromJSON));
    }

    /**
     * List all Model Scan Jobs
     */
    async modelscannerApiV3GetJobs(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ScanJob>> {
        const response = await this.modelscannerApiV3GetJobsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Health check endpoint for Model Supply Chain Services
     */
    async modelscannerApiV3HealthCheckRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scans/v3/health`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Health check endpoint for Model Supply Chain Services
     */
    async modelscannerApiV3HealthCheck(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.modelscannerApiV3HealthCheckRaw(initOverrides);
    }

    /**
     * Request a Model Scan Job
     */
    async modelscannerApiV3PostRequestRaw(requestParameters: ModelscannerApiV3PostRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['scanJob'] == null) {
            throw new runtime.RequiredError(
                'scanJob',
                'Required parameter "scanJob" was null or undefined when calling modelscannerApiV3PostRequest().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json; charset=utf-8';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scans/v3/jobs`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ScanJobToJSON(requestParameters['scanJob']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Request a Model Scan Job
     */
    async modelscannerApiV3PostRequest(requestParameters: ModelscannerApiV3PostRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.modelscannerApiV3PostRequestRaw(requestParameters, initOverrides);
    }

    /**
     * Readiness check endpoint for Model Supply Chain Services
     */
    async modelscannerApiV3ReadinessCheckRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/scans/v3/readiness`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Readiness check endpoint for Model Supply Chain Services
     */
    async modelscannerApiV3ReadinessCheck(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.modelscannerApiV3ReadinessCheckRaw(initOverrides);
    }

}