/* tslint:disable */
/* eslint-disable */
/**
 * HiddenLayer-API
 * HiddenLayer-API
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
 * @interface SubmissionV2
 */
export interface SubmissionV2 {
    /**
     * 
     * @type {object}
     * @memberof SubmissionV2
     */
    metadata?: object;
    /**
     * 
     * @type {Array<string>}
     * @memberof SubmissionV2
     */
    tags?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof SubmissionV2
     */
    sensorId: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionV2
     */
    requesterId?: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionV2
     */
    inputLayer: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionV2
     */
    inputLayerDtype: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof SubmissionV2
     */
    inputLayerShape: Array<number>;
    /**
     * 
     * @type {string}
     * @memberof SubmissionV2
     */
    outputLayer: string;
    /**
     * 
     * @type {string}
     * @memberof SubmissionV2
     */
    outputLayerDtype: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof SubmissionV2
     */
    outputLayerShape: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof SubmissionV2
     */
    predictions?: Array<number>;
    /**
     * 
     * @type {string}
     * @memberof SubmissionV2
     */
    eventTime?: string;
}

/**
 * Check if a given object implements the SubmissionV2 interface.
 */
export function instanceOfSubmissionV2(value: object): value is SubmissionV2 {
    if (!('sensorId' in value) || value['sensorId'] === undefined) return false;
    if (!('inputLayer' in value) || value['inputLayer'] === undefined) return false;
    if (!('inputLayerDtype' in value) || value['inputLayerDtype'] === undefined) return false;
    if (!('inputLayerShape' in value) || value['inputLayerShape'] === undefined) return false;
    if (!('outputLayer' in value) || value['outputLayer'] === undefined) return false;
    if (!('outputLayerDtype' in value) || value['outputLayerDtype'] === undefined) return false;
    if (!('outputLayerShape' in value) || value['outputLayerShape'] === undefined) return false;
    return true;
}

export function SubmissionV2FromJSON(json: any): SubmissionV2 {
    return SubmissionV2FromJSONTyped(json, false);
}

export function SubmissionV2FromJSONTyped(json: any, ignoreDiscriminator: boolean): SubmissionV2 {
    if (json == null) {
        return json;
    }
    return {
        
        'metadata': json['metadata'] == null ? undefined : json['metadata'],
        'tags': json['tags'] == null ? undefined : json['tags'],
        'sensorId': json['sensor_id'],
        'requesterId': json['requester_id'] == null ? undefined : json['requester_id'],
        'inputLayer': json['input_layer'],
        'inputLayerDtype': json['input_layer_dtype'],
        'inputLayerShape': json['input_layer_shape'],
        'outputLayer': json['output_layer'],
        'outputLayerDtype': json['output_layer_dtype'],
        'outputLayerShape': json['output_layer_shape'],
        'predictions': json['predictions'] == null ? undefined : json['predictions'],
        'eventTime': json['event_time'] == null ? undefined : json['event_time'],
    };
}

export function SubmissionV2ToJSON(value?: SubmissionV2 | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'metadata': value['metadata'],
        'tags': value['tags'],
        'sensor_id': value['sensorId'],
        'requester_id': value['requesterId'],
        'input_layer': value['inputLayer'],
        'input_layer_dtype': value['inputLayerDtype'],
        'input_layer_shape': value['inputLayerShape'],
        'output_layer': value['outputLayer'],
        'output_layer_dtype': value['outputLayerDtype'],
        'output_layer_shape': value['outputLayerShape'],
        'predictions': value['predictions'],
        'event_time': value['eventTime'],
    };
}

