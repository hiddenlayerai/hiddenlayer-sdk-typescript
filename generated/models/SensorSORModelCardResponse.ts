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
import type { SecurityPosture } from './SecurityPosture';
import {
    SecurityPostureFromJSON,
    SecurityPostureFromJSONTyped,
    SecurityPostureToJSON,
} from './SecurityPosture';

/**
 * 
 * @export
 * @interface SensorSORModelCardResponse
 */
export interface SensorSORModelCardResponse {
    /**
     * 
     * @type {string}
     * @memberof SensorSORModelCardResponse
     */
    modelId: string;
    /**
     * Unix Nano Epoch
     * @type {number}
     * @memberof SensorSORModelCardResponse
     */
    createdAt: number;
    /**
     * 
     * @type {string}
     * @memberof SensorSORModelCardResponse
     */
    plaintextName: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof SensorSORModelCardResponse
     */
    activeVersions: Array<number>;
    /**
     * 
     * @type {string}
     * @memberof SensorSORModelCardResponse
     */
    source: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof SensorSORModelCardResponse
     */
    tags?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof SensorSORModelCardResponse
     */
    modelScanThreatLevel?: SensorSORModelCardResponseModelScanThreatLevelEnum;
    /**
     * 
     * @type {string}
     * @memberof SensorSORModelCardResponse
     */
    attackMonitoringThreatLevel?: SensorSORModelCardResponseAttackMonitoringThreatLevelEnum;
    /**
     * 
     * @type {SecurityPosture}
     * @memberof SensorSORModelCardResponse
     */
    securityPosture?: SecurityPosture;
}


/**
 * @export
 */
export const SensorSORModelCardResponseModelScanThreatLevelEnum = {
    Safe: 'safe',
    Unsafe: 'unsafe',
    Suspicious: 'suspicious',
    NotAvailable: 'not available',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type SensorSORModelCardResponseModelScanThreatLevelEnum = typeof SensorSORModelCardResponseModelScanThreatLevelEnum[keyof typeof SensorSORModelCardResponseModelScanThreatLevelEnum];

/**
 * @export
 */
export const SensorSORModelCardResponseAttackMonitoringThreatLevelEnum = {
    Safe: 'safe',
    Unsafe: 'unsafe',
    Suspicious: 'suspicious',
    NotAvailable: 'not available',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type SensorSORModelCardResponseAttackMonitoringThreatLevelEnum = typeof SensorSORModelCardResponseAttackMonitoringThreatLevelEnum[keyof typeof SensorSORModelCardResponseAttackMonitoringThreatLevelEnum];


/**
 * Check if a given object implements the SensorSORModelCardResponse interface.
 */
export function instanceOfSensorSORModelCardResponse(value: object): value is SensorSORModelCardResponse {
    if (!('modelId' in value) || value['modelId'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('plaintextName' in value) || value['plaintextName'] === undefined) return false;
    if (!('activeVersions' in value) || value['activeVersions'] === undefined) return false;
    if (!('source' in value) || value['source'] === undefined) return false;
    return true;
}

export function SensorSORModelCardResponseFromJSON(json: any): SensorSORModelCardResponse {
    return SensorSORModelCardResponseFromJSONTyped(json, false);
}

export function SensorSORModelCardResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SensorSORModelCardResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'modelId': json['model_id'],
        'createdAt': json['created_at'],
        'plaintextName': json['plaintext_name'],
        'activeVersions': json['active_versions'],
        'source': json['source'],
        'tags': json['tags'] == null ? undefined : json['tags'],
        'modelScanThreatLevel': json['model_scan_threat_level'] == null ? undefined : json['model_scan_threat_level'],
        'attackMonitoringThreatLevel': json['attack_monitoring_threat_level'] == null ? undefined : json['attack_monitoring_threat_level'],
        'securityPosture': json['security_posture'] == null ? undefined : SecurityPostureFromJSON(json['security_posture']),
    };
}

export function SensorSORModelCardResponseToJSON(value?: SensorSORModelCardResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'model_id': value['modelId'],
        'created_at': value['createdAt'],
        'plaintext_name': value['plaintextName'],
        'active_versions': value['activeVersions'],
        'source': value['source'],
        'tags': value['tags'],
        'model_scan_threat_level': value['modelScanThreatLevel'],
        'attack_monitoring_threat_level': value['attackMonitoringThreatLevel'],
        'security_posture': SecurityPostureToJSON(value['securityPosture']),
    };
}

