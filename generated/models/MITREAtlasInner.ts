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
 * @interface MITREAtlasInner
 */
export interface MITREAtlasInner {
    /**
     * MITRE Atlas Technique
     * @type {string}
     * @memberof MITREAtlasInner
     */
    technique?: string;
    /**
     * MITRE Atlas Tactic
     * @type {string}
     * @memberof MITREAtlasInner
     */
    tactic?: string;
}

/**
 * Check if a given object implements the MITREAtlasInner interface.
 */
export function instanceOfMITREAtlasInner(value: object): value is MITREAtlasInner {
    return true;
}

export function MITREAtlasInnerFromJSON(json: any): MITREAtlasInner {
    return MITREAtlasInnerFromJSONTyped(json, false);
}

export function MITREAtlasInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): MITREAtlasInner {
    if (json == null) {
        return json;
    }
    return {
        
        'technique': json['technique'] == null ? undefined : json['technique'],
        'tactic': json['tactic'] == null ? undefined : json['tactic'],
    };
}

export function MITREAtlasInnerToJSON(value?: MITREAtlasInner | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'technique': value['technique'],
        'tactic': value['tactic'],
    };
}

