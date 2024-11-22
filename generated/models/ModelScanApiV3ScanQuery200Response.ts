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
import type { ScanReportV3 } from './ScanReportV3';
import {
    ScanReportV3FromJSON,
    ScanReportV3FromJSONTyped,
    ScanReportV3ToJSON,
} from './ScanReportV3';

/**
 * 
 * @export
 * @interface ModelScanApiV3ScanQuery200Response
 */
export interface ModelScanApiV3ScanQuery200Response {
    /**
     * 
     * @type {Array<ScanReportV3>}
     * @memberof ModelScanApiV3ScanQuery200Response
     */
    items?: Array<ScanReportV3>;
    /**
     * Total number of items available based on the query criteria.
     * @type {number}
     * @memberof ModelScanApiV3ScanQuery200Response
     */
    total: number;
    /**
     * Maximum number of items to return
     * @type {number}
     * @memberof ModelScanApiV3ScanQuery200Response
     */
    limit: number;
    /**
     * Begin returning the results from this offset
     * @type {number}
     * @memberof ModelScanApiV3ScanQuery200Response
     */
    offset: number;
}

/**
 * Check if a given object implements the ModelScanApiV3ScanQuery200Response interface.
 */
export function instanceOfModelScanApiV3ScanQuery200Response(value: object): value is ModelScanApiV3ScanQuery200Response {
    if (!('total' in value) || value['total'] === undefined) return false;
    if (!('limit' in value) || value['limit'] === undefined) return false;
    if (!('offset' in value) || value['offset'] === undefined) return false;
    return true;
}

export function ModelScanApiV3ScanQuery200ResponseFromJSON(json: any): ModelScanApiV3ScanQuery200Response {
    return ModelScanApiV3ScanQuery200ResponseFromJSONTyped(json, false);
}

export function ModelScanApiV3ScanQuery200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelScanApiV3ScanQuery200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'items': json['items'] == null ? undefined : ((json['items'] as Array<any>).map(ScanReportV3FromJSON)),
        'total': json['total'],
        'limit': json['limit'],
        'offset': json['offset'],
    };
}

export function ModelScanApiV3ScanQuery200ResponseToJSON(value?: ModelScanApiV3ScanQuery200Response | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'items': value['items'] == null ? undefined : ((value['items'] as Array<any>).map(ScanReportV3ToJSON)),
        'total': value['total'],
        'limit': value['limit'],
        'offset': value['offset'],
    };
}
