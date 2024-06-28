/* tslint:disable */
/* eslint-disable */
/**
 * HiddenLayer ModelScan
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
  CreateSensorRequest,
  GetMultipartUploadResponse,
  Model,
  ModelQueryResponse,
  SensorSORQueryRequest,
  ValidationErrorModel,
} from '../models/index';
import {
    CreateSensorRequestFromJSON,
    CreateSensorRequestToJSON,
    GetMultipartUploadResponseFromJSON,
    GetMultipartUploadResponseToJSON,
    ModelFromJSON,
    ModelToJSON,
    ModelQueryResponseFromJSON,
    ModelQueryResponseToJSON,
    SensorSORQueryRequestFromJSON,
    SensorSORQueryRequestToJSON,
    ValidationErrorModelFromJSON,
    ValidationErrorModelToJSON,
} from '../models/index';

export interface BeginMultipartUploadRequest {
    xContentLength: number;
    sensorId: string;
}

export interface CompleteMultipartUploadRequest {
    sensorId: string;
    uploadId: string;
}

export interface CreateSensorOperationRequest {
    createSensorRequest: CreateSensorRequest;
}

export interface DeleteModelRequest {
    sensorId: string;
}

export interface GetModelRequest {
    sensorId: string;
}

export interface QuerySensorRequest {
    sensorSORQueryRequest?: SensorSORQueryRequest;
}

export interface UploadModelPartRequest {
    sensorId: string;
    uploadId: string;
    part: number;
    body: any | null;
}

/**
 * 
 */
export class SensorApi extends runtime.BaseAPI {

    /**
     * Begin Multipart Upload
     */
    async beginMultipartUploadRaw(requestParameters: BeginMultipartUploadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetMultipartUploadResponse>> {
        if (requestParameters['xContentLength'] == null) {
            throw new runtime.RequiredError(
                'xContentLength',
                'Required parameter "xContentLength" was null or undefined when calling beginMultipartUpload().'
            );
        }

        if (requestParameters['sensorId'] == null) {
            throw new runtime.RequiredError(
                'sensorId',
                'Required parameter "sensorId" was null or undefined when calling beginMultipartUpload().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['xContentLength'] != null) {
            headerParameters['X-Content-Length'] = String(requestParameters['xContentLength']);
        }

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v2/sensors/{sensor_id}/upload/begin`.replace(`{${"sensor_id"}}`, encodeURIComponent(String(requestParameters['sensorId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetMultipartUploadResponseFromJSON(jsonValue));
    }

    /**
     * Begin Multipart Upload
     */
    async beginMultipartUpload(requestParameters: BeginMultipartUploadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetMultipartUploadResponse> {
        const response = await this.beginMultipartUploadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Complete Multipart Upload
     */
    async completeMultipartUploadRaw(requestParameters: CompleteMultipartUploadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['sensorId'] == null) {
            throw new runtime.RequiredError(
                'sensorId',
                'Required parameter "sensorId" was null or undefined when calling completeMultipartUpload().'
            );
        }

        if (requestParameters['uploadId'] == null) {
            throw new runtime.RequiredError(
                'uploadId',
                'Required parameter "uploadId" was null or undefined when calling completeMultipartUpload().'
            );
        }

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
            path: `/api/v2/sensors/{sensor_id}/upload/{upload_id}/complete`.replace(`{${"sensor_id"}}`, encodeURIComponent(String(requestParameters['sensorId']))).replace(`{${"upload_id"}}`, encodeURIComponent(String(requestParameters['uploadId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Complete Multipart Upload
     */
    async completeMultipartUpload(requestParameters: CompleteMultipartUploadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.completeMultipartUploadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a Sensor
     */
    async createSensorRaw(requestParameters: CreateSensorOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Model>> {
        if (requestParameters['createSensorRequest'] == null) {
            throw new runtime.RequiredError(
                'createSensorRequest',
                'Required parameter "createSensorRequest" was null or undefined when calling createSensor().'
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
            path: `/api/v2/sensors/create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateSensorRequestToJSON(requestParameters['createSensorRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelFromJSON(jsonValue));
    }

    /**
     * Create a Sensor
     */
    async createSensor(requestParameters: CreateSensorOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Model> {
        const response = await this.createSensorRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove an Adhoc Sensor
     */
    async deleteModelRaw(requestParameters: DeleteModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['sensorId'] == null) {
            throw new runtime.RequiredError(
                'sensorId',
                'Required parameter "sensorId" was null or undefined when calling deleteModel().'
            );
        }

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
            path: `/api/v2/sensors/{sensor_id}`.replace(`{${"sensor_id"}}`, encodeURIComponent(String(requestParameters['sensorId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove an Adhoc Sensor
     */
    async deleteModel(requestParameters: DeleteModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteModelRaw(requestParameters, initOverrides);
    }

    /**
     * Get Model
     */
    async getModelRaw(requestParameters: GetModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Model>> {
        if (requestParameters['sensorId'] == null) {
            throw new runtime.RequiredError(
                'sensorId',
                'Required parameter "sensorId" was null or undefined when calling getModel().'
            );
        }

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
            path: `/api/v2/sensors/{sensor_id}`.replace(`{${"sensor_id"}}`, encodeURIComponent(String(requestParameters['sensorId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelFromJSON(jsonValue));
    }

    /**
     * Get Model
     */
    async getModel(requestParameters: GetModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Model> {
        const response = await this.getModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Query a Sensor
     */
    async querySensorRaw(requestParameters: QuerySensorRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelQueryResponse>> {
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
            path: `/api/v2/sensors/query`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SensorSORQueryRequestToJSON(requestParameters['sensorSORQueryRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelQueryResponseFromJSON(jsonValue));
    }

    /**
     * Query a Sensor
     */
    async querySensor(requestParameters: QuerySensorRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelQueryResponse> {
        const response = await this.querySensorRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Upload part
     */
    async uploadModelPartRaw(requestParameters: UploadModelPartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['sensorId'] == null) {
            throw new runtime.RequiredError(
                'sensorId',
                'Required parameter "sensorId" was null or undefined when calling uploadModelPart().'
            );
        }

        if (requestParameters['uploadId'] == null) {
            throw new runtime.RequiredError(
                'uploadId',
                'Required parameter "uploadId" was null or undefined when calling uploadModelPart().'
            );
        }

        if (requestParameters['part'] == null) {
            throw new runtime.RequiredError(
                'part',
                'Required parameter "part" was null or undefined when calling uploadModelPart().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling uploadModelPart().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/octet-stream';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v2/sensors/{sensor_id}/upload/{upload_id}/part/{part}`.replace(`{${"sensor_id"}}`, encodeURIComponent(String(requestParameters['sensorId']))).replace(`{${"upload_id"}}`, encodeURIComponent(String(requestParameters['uploadId']))).replace(`{${"part"}}`, encodeURIComponent(String(requestParameters['part']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'] as any,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Upload part
     */
    async uploadModelPart(requestParameters: UploadModelPartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.uploadModelPartRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
