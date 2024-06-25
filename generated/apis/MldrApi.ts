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
  SubmissionResponse,
  SubmissionV2,
  ValidationErrorModel,
} from '../models/index';
import {
    SubmissionResponseFromJSON,
    SubmissionResponseToJSON,
    SubmissionV2FromJSON,
    SubmissionV2ToJSON,
    ValidationErrorModelFromJSON,
    ValidationErrorModelToJSON,
} from '../models/index';

export interface SubmitVectorsRequest {
    submissionV2: SubmissionV2;
}

/**
 * 
 */
export class MldrApi extends runtime.BaseAPI {

    /**
     * Submit vectors
     */
    async submitVectorsRaw(requestParameters: SubmitVectorsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubmissionResponse>> {
        if (requestParameters['submissionV2'] == null) {
            throw new runtime.RequiredError(
                'submissionV2',
                'Required parameter "submissionV2" was null or undefined when calling submitVectors().'
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
            path: `/api/v2/submit`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SubmissionV2ToJSON(requestParameters['submissionV2']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubmissionResponseFromJSON(jsonValue));
    }

    /**
     * Submit vectors
     */
    async submitVectors(requestParameters: SubmitVectorsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubmissionResponse> {
        const response = await this.submitVectorsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
