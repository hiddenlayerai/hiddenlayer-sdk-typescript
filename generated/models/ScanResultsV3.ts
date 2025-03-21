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
import type { InventoryV3 } from './InventoryV3';
import {
    InventoryV3FromJSON,
    InventoryV3FromJSONTyped,
    InventoryV3ToJSON,
} from './InventoryV3';
import type { FileResultV3 } from './FileResultV3';
import {
    FileResultV3FromJSON,
    FileResultV3FromJSONTyped,
    FileResultV3ToJSON,
} from './FileResultV3';

/**
 * 
 * @export
 * @interface ScanResultsV3
 */
export interface ScanResultsV3 {
    /**
     * 
     * @type {string}
     * @memberof ScanResultsV3
     */
    scanId?: string;
    /**
     * 
     * @type {number}
     * @memberof ScanResultsV3
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof ScanResultsV3
     */
    endTime?: number;
    /**
     * 
     * @type {string}
     * @memberof ScanResultsV3
     */
    status?: ScanResultsV3StatusEnum;
    /**
     * 
     * @type {string}
     * @memberof ScanResultsV3
     */
    version?: string;
    /**
     * 
     * @type {InventoryV3}
     * @memberof ScanResultsV3
     */
    inventory?: InventoryV3;
    /**
     * 
     * @type {Array<FileResultV3>}
     * @memberof ScanResultsV3
     */
    fileResults: Array<FileResultV3>;
}


/**
 * @export
 */
export const ScanResultsV3StatusEnum = {
    Done: 'done',
    Running: 'running',
    Failed: 'failed',
    Pending: 'pending',
    Canceled: 'canceled',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type ScanResultsV3StatusEnum = typeof ScanResultsV3StatusEnum[keyof typeof ScanResultsV3StatusEnum];


/**
 * Check if a given object implements the ScanResultsV3 interface.
 */
export function instanceOfScanResultsV3(value: object): value is ScanResultsV3 {
    if (!('fileResults' in value) || value['fileResults'] === undefined) return false;
    return true;
}

export function ScanResultsV3FromJSON(json: any): ScanResultsV3 {
    return ScanResultsV3FromJSONTyped(json, false);
}

export function ScanResultsV3FromJSONTyped(json: any, ignoreDiscriminator: boolean): ScanResultsV3 {
    if (json == null) {
        return json;
    }
    return {
        
        'scanId': json['scan_id'] == null ? undefined : json['scan_id'],
        'startTime': json['start_time'] == null ? undefined : json['start_time'],
        'endTime': json['end_time'] == null ? undefined : json['end_time'],
        'status': json['status'] == null ? undefined : json['status'],
        'version': json['version'] == null ? undefined : json['version'],
        'inventory': json['inventory'] == null ? undefined : json['inventory'],
        'fileResults': ((json['file_results'] as Array<any>).map(FileResultV3FromJSON)),
    };
}

export function ScanResultsV3ToJSON(value?: ScanResultsV3 | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'scan_id': value['scanId'],
        'start_time': value['startTime'],
        'end_time': value['endTime'],
        'status': value['status'],
        'version': value['version'],
        'inventory': value['inventory'],
        'file_results': ((value['fileResults'] as Array<any>).map(FileResultV3ToJSON)),
    };
}

