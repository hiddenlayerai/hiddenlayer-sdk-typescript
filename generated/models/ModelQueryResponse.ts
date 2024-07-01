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
import type { Model } from './Model';
import {
    ModelFromJSON,
    ModelFromJSONTyped,
    ModelToJSON,
} from './Model';

/**
 * 
 * @export
 * @interface ModelQueryResponse
 */
export interface ModelQueryResponse {
    /**
     * 
     * @type {number}
     * @memberof ModelQueryResponse
     */
    totalCount: number;
    /**
     * 
     * @type {number}
     * @memberof ModelQueryResponse
     */
    pageSize: number;
    /**
     * 
     * @type {number}
     * @memberof ModelQueryResponse
     */
    pageNumber: number;
    /**
     * 
     * @type {Array<Model>}
     * @memberof ModelQueryResponse
     */
    results: Array<Model>;
}

/**
 * Check if a given object implements the ModelQueryResponse interface.
 */
export function instanceOfModelQueryResponse(value: object): value is ModelQueryResponse {
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('pageNumber' in value) || value['pageNumber'] === undefined) return false;
    if (!('results' in value) || value['results'] === undefined) return false;
    return true;
}

export function ModelQueryResponseFromJSON(json: any): ModelQueryResponse {
    return ModelQueryResponseFromJSONTyped(json, false);
}

export function ModelQueryResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelQueryResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'totalCount': json['total_count'],
        'pageSize': json['page_size'],
        'pageNumber': json['page_number'],
        'results': ((json['results'] as Array<any>).map(ModelFromJSON)),
    };
}

export function ModelQueryResponseToJSON(value?: ModelQueryResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'total_count': value['totalCount'],
        'page_size': value['pageSize'],
        'page_number': value['pageNumber'],
        'results': ((value['results'] as Array<any>).map(ModelToJSON)),
    };
}
