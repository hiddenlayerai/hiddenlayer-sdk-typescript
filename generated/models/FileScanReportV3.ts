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
import type { FileResultsInner } from './FileResultsInner';
import {
    FileResultsInnerFromJSON,
    FileResultsInnerFromJSONTyped,
    FileResultsInnerToJSON,
} from './FileResultsInner';

/**
 * 
 * @export
 * @interface FileScanReportV3
 */
export interface FileScanReportV3 {
    /**
     * 
     * @type {Array<FileResultsInner>}
     * @memberof FileScanReportV3
     */
    fileResults?: Array<FileResultsInner>;
}

/**
 * Check if a given object implements the FileScanReportV3 interface.
 */
export function instanceOfFileScanReportV3(value: object): value is FileScanReportV3 {
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
        
        'fileResults': json['file_results'] == null ? undefined : ((json['file_results'] as Array<any>).map(FileResultsInnerFromJSON)),
    };
}

export function FileScanReportV3ToJSON(value?: FileScanReportV3 | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'file_results': value['fileResults'] == null ? undefined : ((value['fileResults'] as Array<any>).map(FileResultsInnerToJSON)),
    };
}
