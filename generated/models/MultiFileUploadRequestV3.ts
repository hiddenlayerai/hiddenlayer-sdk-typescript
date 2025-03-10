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
 * @interface MultiFileUploadRequestV3
 */
export interface MultiFileUploadRequestV3 {
    /**
     * Model version
     * @type {string}
     * @memberof MultiFileUploadRequestV3
     */
    modelVersion: string;
    /**
     * Model name
     * @type {string}
     * @memberof MultiFileUploadRequestV3
     */
    modelName: string;
    /**
     * Requesting entity
     * @type {string}
     * @memberof MultiFileUploadRequestV3
     */
    requestingEntity: string;
    /**
     * Requested location alias
     * @type {string}
     * @memberof MultiFileUploadRequestV3
     */
    locationAlias?: string;
}

/**
 * Check if a given object implements the MultiFileUploadRequestV3 interface.
 */
export function instanceOfMultiFileUploadRequestV3(value: object): value is MultiFileUploadRequestV3 {
    if (!('modelVersion' in value) || value['modelVersion'] === undefined) return false;
    if (!('modelName' in value) || value['modelName'] === undefined) return false;
    if (!('requestingEntity' in value) || value['requestingEntity'] === undefined) return false;
    return true;
}

export function MultiFileUploadRequestV3FromJSON(json: any): MultiFileUploadRequestV3 {
    return MultiFileUploadRequestV3FromJSONTyped(json, false);
}

export function MultiFileUploadRequestV3FromJSONTyped(json: any, ignoreDiscriminator: boolean): MultiFileUploadRequestV3 {
    if (json == null) {
        return json;
    }
    return {
        
        'modelVersion': json['model_version'],
        'modelName': json['model_name'],
        'requestingEntity': json['requesting_entity'],
        'locationAlias': json['location_alias'] == null ? undefined : json['location_alias'],
    };
}

export function MultiFileUploadRequestV3ToJSON(value?: MultiFileUploadRequestV3 | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'model_version': value['modelVersion'],
        'model_name': value['modelName'],
        'requesting_entity': value['requestingEntity'],
        'location_alias': value['locationAlias'],
    };
}

