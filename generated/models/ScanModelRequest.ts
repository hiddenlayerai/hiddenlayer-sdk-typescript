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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ScanModelRequest
 */
export interface ScanModelRequest {
    /**
     * 
     * @type {string}
     * @memberof ScanModelRequest
     */
    location: string;
}

/**
 * Check if a given object implements the ScanModelRequest interface.
 */
export function instanceOfScanModelRequest(value: object): value is ScanModelRequest {
    if (!('location' in value) || value['location'] === undefined) return false;
    return true;
}

export function ScanModelRequestFromJSON(json: any): ScanModelRequest {
    return ScanModelRequestFromJSONTyped(json, false);
}

export function ScanModelRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScanModelRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'location': json['location'],
    };
}

export function ScanModelRequestToJSON(value?: ScanModelRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'location': value['location'],
    };
}

