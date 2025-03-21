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
import type { FileDetailsV3 } from './FileDetailsV3';
import {
    FileDetailsV3FromJSON,
    FileDetailsV3FromJSONTyped,
    FileDetailsV3ToJSON,
} from './FileDetailsV3';
import type { ScanDetectionV3 } from './ScanDetectionV3';
import {
    ScanDetectionV3FromJSON,
    ScanDetectionV3FromJSONTyped,
    ScanDetectionV3ToJSON,
} from './ScanDetectionV3';

/**
 * 
 * @export
 * @interface FileScanReportV3
 */
export interface FileScanReportV3 {
    /**
     * unique ID of the file
     * @type {string}
     * @memberof FileScanReportV3
     */
    fileInstanceId: string;
    /**
     * full file path
     * @type {string}
     * @memberof FileScanReportV3
     */
    fileLocation: string;
    /**
     * time the scan started
     * @type {Date}
     * @memberof FileScanReportV3
     */
    startTime: Date;
    /**
     * time the scan ended
     * @type {Date}
     * @memberof FileScanReportV3
     */
    endTime: Date;
    /**
     * 
     * @type {FileDetailsV3}
     * @memberof FileScanReportV3
     */
    details: FileDetailsV3;
    /**
     * status of the scan
     * @type {string}
     * @memberof FileScanReportV3
     */
    status: FileScanReportV3StatusEnum;
    /**
     * time the scan was seen at
     * @type {Date}
     * @memberof FileScanReportV3
     */
    seen: Date;
    /**
     * 
     * @type {Array<ScanDetectionV3>}
     * @memberof FileScanReportV3
     */
    detections?: Array<ScanDetectionV3>;
    /**
     * 
     * @type {Array<FileScanReportV3>}
     * @memberof FileScanReportV3
     */
    fileResults?: Array<FileScanReportV3>;
}


/**
 * @export
 */
export const FileScanReportV3StatusEnum = {
    Skipped: 'skipped',
    Pending: 'pending',
    Running: 'running',
    Done: 'done',
    Failed: 'failed',
    Canceled: 'canceled',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type FileScanReportV3StatusEnum = typeof FileScanReportV3StatusEnum[keyof typeof FileScanReportV3StatusEnum];


/**
 * Check if a given object implements the FileScanReportV3 interface.
 */
export function instanceOfFileScanReportV3(value: object): value is FileScanReportV3 {
    if (!('fileInstanceId' in value) || value['fileInstanceId'] === undefined) return false;
    if (!('fileLocation' in value) || value['fileLocation'] === undefined) return false;
    if (!('startTime' in value) || value['startTime'] === undefined) return false;
    if (!('endTime' in value) || value['endTime'] === undefined) return false;
    if (!('details' in value) || value['details'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('seen' in value) || value['seen'] === undefined) return false;
    return true;
}

export function FileScanReportV3FromJSON(json: any): FileScanReportV3 {
    return FileScanReportV3FromJSONTyped(json, false);
}

export function FileScanReportV3FromJSONTyped(json: any, ignoreDiscriminator: boolean): FileScanReportV3 {
    if (json == null) {
        return json;
    }
    return {
        
        'fileInstanceId': json['file_instance_id'],
        'fileLocation': json['file_location'],
        'startTime': (new Date(json['start_time'])),
        'endTime': (new Date(json['end_time'])),
        'details': FileDetailsV3FromJSON(json['details']),
        'status': json['status'],
        'seen': (new Date(json['seen'])),
        'detections': json['detections'] == null ? undefined : ((json['detections'] as Array<any>).map(ScanDetectionV3FromJSON)),
        'fileResults': json['file_results'] == null ? undefined : ((json['file_results'] as Array<any>).map(FileScanReportV3FromJSON)),
    };
}

export function FileScanReportV3ToJSON(value?: FileScanReportV3 | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'file_instance_id': value['fileInstanceId'],
        'file_location': value['fileLocation'],
        'start_time': ((value['startTime']).toISOString()),
        'end_time': ((value['endTime']).toISOString()),
        'details': FileDetailsV3ToJSON(value['details']),
        'status': value['status'],
        'seen': ((value['seen']).toISOString()),
        'detections': value['detections'] == null ? undefined : ((value['detections'] as Array<any>).map(ScanDetectionV3ToJSON)),
        'file_results': value['fileResults'] == null ? undefined : ((value['fileResults'] as Array<any>).map(FileScanReportV3ToJSON)),
    };
}

