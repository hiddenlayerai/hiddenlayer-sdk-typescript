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
 * @interface ErrorsInner
 */
export interface ErrorsInner {
    /**
     * 
     * @type {string}
     * @memberof ErrorsInner
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof ErrorsInner
     */
    detail?: string;
    /**
     * array of JSON Pointers
     * @type {Array<string>}
     * @memberof ErrorsInner
     */
    pointer?: Array<string>;
}

/**
 * Check if a given object implements the ErrorsInner interface.
 */
export function instanceOfErrorsInner(value: object): value is ErrorsInner {
    return true;
}

export function ErrorsInnerFromJSON(json: any): ErrorsInner {
    return ErrorsInnerFromJSONTyped(json, false);
}

export function ErrorsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorsInner {
    if (json == null) {
        return json;
    }
    return {
        
        'code': json['code'] == null ? undefined : json['code'],
        'detail': json['detail'] == null ? undefined : json['detail'],
        'pointer': json['pointer'] == null ? undefined : json['pointer'],
    };
}

export function ErrorsInnerToJSON(value?: ErrorsInner | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'code': value['code'],
        'detail': value['detail'],
        'pointer': value['pointer'],
    };
}

