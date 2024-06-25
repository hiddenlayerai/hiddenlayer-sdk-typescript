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
 * @interface SensorSORQueryFilter
 */
export interface SensorSORQueryFilter {
    /**
     * 
     * @type {string}
     * @memberof SensorSORQueryFilter
     */
    plaintextName?: string;
    /**
     * 
     * @type {boolean}
     * @memberof SensorSORQueryFilter
     */
    active?: boolean;
    /**
     * 
     * @type {number}
     * @memberof SensorSORQueryFilter
     */
    version?: number;
    /**
     * 
     * @type {Date}
     * @memberof SensorSORQueryFilter
     */
    createdAtStart?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SensorSORQueryFilter
     */
    createdAtStop?: Date;
}

/**
 * Check if a given object implements the SensorSORQueryFilter interface.
 */
export function instanceOfSensorSORQueryFilter(value: object): value is SensorSORQueryFilter {
    return true;
}

export function SensorSORQueryFilterFromJSON(json: any): SensorSORQueryFilter {
    return SensorSORQueryFilterFromJSONTyped(json, false);
}

export function SensorSORQueryFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): SensorSORQueryFilter {
    if (json == null) {
        return json;
    }
    return {
        
        'plaintextName': json['plaintext_name'] == null ? undefined : json['plaintext_name'],
        'active': json['active'] == null ? undefined : json['active'],
        'version': json['version'] == null ? undefined : json['version'],
        'createdAtStart': json['created_at_start'] == null ? undefined : (new Date(json['created_at_start'])),
        'createdAtStop': json['created_at_stop'] == null ? undefined : (new Date(json['created_at_stop'])),
    };
}

export function SensorSORQueryFilterToJSON(value?: SensorSORQueryFilter | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'plaintext_name': value['plaintextName'],
        'active': value['active'],
        'version': value['version'],
        'created_at_start': value['createdAtStart'] == null ? undefined : ((value['createdAtStart']).toISOString()),
        'created_at_stop': value['createdAtStop'] == null ? undefined : ((value['createdAtStop']).toISOString()),
    };
}

