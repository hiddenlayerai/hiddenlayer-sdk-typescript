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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SubmissionResponse
 */
export interface SubmissionResponse {
    /**
     * 
     * @type {string}
     * @memberof SubmissionResponse
     */
    tenantId: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionResponse
     */
    sensorId: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionResponse
     */
    requesterId: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionResponse
     */
    groupId: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionResponse
     */
    eventTime: string;
}

/**
 * Check if a given object implements the SubmissionResponse interface.
 */
export function instanceOfSubmissionResponse(value: object): value is SubmissionResponse {
    if (!('tenantId' in value) || value['tenantId'] === undefined) return false;
    if (!('sensorId' in value) || value['sensorId'] === undefined) return false;
    if (!('requesterId' in value) || value['requesterId'] === undefined) return false;
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    if (!('eventTime' in value) || value['eventTime'] === undefined) return false;
    return true;
}

export function SubmissionResponseFromJSON(json: any): SubmissionResponse {
    return SubmissionResponseFromJSONTyped(json, false);
}

export function SubmissionResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubmissionResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'tenantId': json['tenant_id'],
        'sensorId': json['sensor_id'],
        'requesterId': json['requester_id'],
        'groupId': json['group_id'],
        'eventTime': json['event_time'],
    };
}

export function SubmissionResponseToJSON(value?: SubmissionResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'tenant_id': value['tenantId'],
        'sensor_id': value['sensorId'],
        'requester_id': value['requesterId'],
        'group_id': value['groupId'],
        'event_time': value['eventTime'],
    };
}
