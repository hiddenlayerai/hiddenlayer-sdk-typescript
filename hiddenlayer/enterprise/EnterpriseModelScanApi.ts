import fs from 'fs';

import * as runtime from '../../generated';
import { ModelScanApi, ScanModelOperationRequest, ScanModelRequest } from '../../generated/';
import { ScanResultsV2FromJSON } from '../../generated/models/index';

/**
 * This file is created because the Enterprise and SaaS APIs are not in sync.
 * 
 * When they are in sync, this file and related references can be deleted.
 */
export class EnterpriseModelScanApi extends ModelScanApi {
    constructor() {
        super();
    }

    async scanModelRaw(requestParameters: ScanModelOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['sensorId'] == null) {
            throw new runtime.RequiredError(
                'sensorId',
                'Required parameter "sensorId" was null or undefined when calling scanModel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'octet-binary';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        const response = await this.request({
            path: `/api/v2/create/{sensor_id}`.replace(`{${"sensor_id"}}`, encodeURIComponent(String(requestParameters['sensorId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: await this.ScanModelRequestToData(requestParameters['scanModelRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    async scanStatusRaw(requestParameters: runtime.ScanStatusRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<runtime.ScanResultsV2>> {
        if (requestParameters['sensorId'] == null) {
            throw new runtime.RequiredError(
                'sensorId',
                'Required parameter "sensorId" was null or undefined when calling scanStatus().'
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
            path: `/api/v2/status/{sensor_id}`.replace(`{${"sensor_id"}}`, encodeURIComponent(String(requestParameters['sensorId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ScanResultsV2FromJSON(jsonValue));
    }

    private async ScanModelRequestToData(value?: ScanModelRequest | null): Promise<any> {
        if (value == null) {
            return value;
        }
        let file: fs.promises.FileHandle;
        let data: Buffer;
        try {
            file = await fs.promises.open(value.location, 'r');
            data = await file.readFile();
        } finally {
            await file.close();
        }
        return data;
    }
}