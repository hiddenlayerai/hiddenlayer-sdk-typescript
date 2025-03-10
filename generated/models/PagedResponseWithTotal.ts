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
/**
 * 
 * @export
 * @interface PagedResponseWithTotal
 */
export interface PagedResponseWithTotal {
    /**
     * List of items. If no matching items are found, then `[]` will be returned.
     * @type {Array<string>}
     * @memberof PagedResponseWithTotal
     */
    items?: Array<string>;
    /**
     * Total number of items available based on the query criteria.
     * @type {number}
     * @memberof PagedResponseWithTotal
     */
    total: number;
    /**
     * Maximum number of items to return
     * @type {number}
     * @memberof PagedResponseWithTotal
     */
    limit: number;
    /**
     * Begin returning the results from this offset
     * @type {number}
     * @memberof PagedResponseWithTotal
     */
    offset: number;
}

/**
 * Check if a given object implements the PagedResponseWithTotal interface.
 */
export function instanceOfPagedResponseWithTotal(value: object): value is PagedResponseWithTotal {
    if (!('total' in value) || value['total'] === undefined) return false;
    if (!('limit' in value) || value['limit'] === undefined) return false;
    if (!('offset' in value) || value['offset'] === undefined) return false;
    return true;
}

export function PagedResponseWithTotalFromJSON(json: any): PagedResponseWithTotal {
    return PagedResponseWithTotalFromJSONTyped(json, false);
}

export function PagedResponseWithTotalFromJSONTyped(json: any, ignoreDiscriminator: boolean): PagedResponseWithTotal {
    if (json == null) {
        return json;
    }
    return {
        
        'items': json['items'] == null ? undefined : json['items'],
        'total': json['total'],
        'limit': json['limit'],
        'offset': json['offset'],
    };
}

export function PagedResponseWithTotalToJSON(value?: PagedResponseWithTotal | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'items': value['items'],
        'total': value['total'],
        'limit': value['limit'],
        'offset': value['offset'],
    };
}

