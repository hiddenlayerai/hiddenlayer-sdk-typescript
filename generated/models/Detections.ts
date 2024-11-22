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
 * @interface Detections
 */
export interface Detections {
    /**
     * 
     * @type {string}
     * @memberof Detections
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Detections
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof Detections
     */
    severity?: DetectionsSeverityEnum;
}


/**
 * @export
 */
export const DetectionsSeverityEnum = {
    Miss: 'MISS',
    Safe: 'SAFE',
    Suspicious: 'SUSPICIOUS',
    Unsafe: 'UNSAFE',
    Malicious: 'MALICIOUS',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type DetectionsSeverityEnum = typeof DetectionsSeverityEnum[keyof typeof DetectionsSeverityEnum];


/**
 * Check if a given object implements the Detections interface.
 */
export function instanceOfDetections(value: object): value is Detections {
    return true;
}

export function DetectionsFromJSON(json: any): Detections {
    return DetectionsFromJSONTyped(json, false);
}

export function DetectionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Detections {
    if (json == null) {
        return json;
    }
    return {
        
        'description': json['description'] == null ? undefined : json['description'],
        'message': json['message'] == null ? undefined : json['message'],
        'severity': json['severity'] == null ? undefined : json['severity'],
    };
}

export function DetectionsToJSON(value?: Detections | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'description': value['description'],
        'message': value['message'],
        'severity': value['severity'],
    };
}
