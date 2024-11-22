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
 * @interface ScanCreateRequest
 */
export interface ScanCreateRequest {
    /**
     * 
     * @type {string}
     * @memberof ScanCreateRequest
     */
    location: string;
}

/**
 * Check if a given object implements the ScanCreateRequest interface.
 */
export function instanceOfScanCreateRequest(value: object): value is ScanCreateRequest {
    if (!('location' in value) || value['location'] === undefined) return false;
    return true;
}

export function ScanCreateRequestFromJSON(json: any): ScanCreateRequest {
    return ScanCreateRequestFromJSONTyped(json, false);
}

export function ScanCreateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScanCreateRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'location': json['location'],
    };
}

export function ScanCreateRequestToJSON(value?: ScanCreateRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'location': value['location'],
    };
}
