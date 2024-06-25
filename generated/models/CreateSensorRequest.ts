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
 * @interface CreateSensorRequest
 */
export interface CreateSensorRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateSensorRequest
     */
    plaintextName: string;
    /**
     * 
     * @type {number}
     * @memberof CreateSensorRequest
     */
    version?: number;
    /**
     * 
     * @type {boolean}
     * @memberof CreateSensorRequest
     */
    active?: boolean;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof CreateSensorRequest
     */
    tags?: { [key: string]: any; };
}

/**
 * Check if a given object implements the CreateSensorRequest interface.
 */
export function instanceOfCreateSensorRequest(value: object): value is CreateSensorRequest {
    if (!('plaintextName' in value) || value['plaintextName'] === undefined) return false;
    return true;
}

export function CreateSensorRequestFromJSON(json: any): CreateSensorRequest {
    return CreateSensorRequestFromJSONTyped(json, false);
}

export function CreateSensorRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateSensorRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'plaintextName': json['plaintext_name'],
        'version': json['version'] == null ? undefined : json['version'],
        'active': json['active'] == null ? undefined : json['active'],
        'tags': json['tags'] == null ? undefined : json['tags'],
    };
}

export function CreateSensorRequestToJSON(value?: CreateSensorRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'plaintext_name': value['plaintextName'],
        'version': value['version'],
        'active': value['active'],
        'tags': value['tags'],
    };
}

