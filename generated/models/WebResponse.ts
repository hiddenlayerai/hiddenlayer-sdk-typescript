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
import type { ArtifactContent } from './ArtifactContent';
import {
    ArtifactContentFromJSON,
    ArtifactContentFromJSONTyped,
    ArtifactContentToJSON,
} from './ArtifactContent';
import type { PropertyBag } from './PropertyBag';
import {
    PropertyBagFromJSON,
    PropertyBagFromJSONTyped,
    PropertyBagToJSON,
} from './PropertyBag';

/**
 * Describes the response to an HTTP request.
 * @export
 * @interface WebResponse
 */
export interface WebResponse {
    /**
     * The index within the run.webResponses array of the response object associated with this result.
     * @type {number}
     * @memberof WebResponse
     */
    index?: number;
    /**
     * The response protocol. Example: 'http'.
     * @type {string}
     * @memberof WebResponse
     */
    protocol?: string;
    /**
     * The response version. Example: '1.1'.
     * @type {string}
     * @memberof WebResponse
     */
    version?: string;
    /**
     * The response status code. Example: 451.
     * @type {number}
     * @memberof WebResponse
     */
    statusCode?: number;
    /**
     * The response reason. Example: 'Not found'.
     * @type {string}
     * @memberof WebResponse
     */
    reasonPhrase?: string;
    /**
     * The response headers.
     * @type {{ [key: string]: string; }}
     * @memberof WebResponse
     */
    headers?: { [key: string]: string; };
    /**
     * 
     * @type {ArtifactContent}
     * @memberof WebResponse
     */
    body?: ArtifactContent;
    /**
     * Specifies whether a response was received from the server.
     * @type {boolean}
     * @memberof WebResponse
     */
    noResponseReceived?: boolean;
    /**
     * 
     * @type {PropertyBag}
     * @memberof WebResponse
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the WebResponse interface.
 */
export function instanceOfWebResponse(value: object): value is WebResponse {
    return true;
}

export function WebResponseFromJSON(json: any): WebResponse {
    return WebResponseFromJSONTyped(json, false);
}

export function WebResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'index': json['index'] == null ? undefined : json['index'],
        'protocol': json['protocol'] == null ? undefined : json['protocol'],
        'version': json['version'] == null ? undefined : json['version'],
        'statusCode': json['statusCode'] == null ? undefined : json['statusCode'],
        'reasonPhrase': json['reasonPhrase'] == null ? undefined : json['reasonPhrase'],
        'headers': json['headers'] == null ? undefined : json['headers'],
        'body': json['body'] == null ? undefined : ArtifactContentFromJSON(json['body']),
        'noResponseReceived': json['noResponseReceived'] == null ? undefined : json['noResponseReceived'],
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function WebResponseToJSON(value?: WebResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'index': value['index'],
        'protocol': value['protocol'],
        'version': value['version'],
        'statusCode': value['statusCode'],
        'reasonPhrase': value['reasonPhrase'],
        'headers': value['headers'],
        'body': ArtifactContentToJSON(value['body']),
        'noResponseReceived': value['noResponseReceived'],
        'properties': PropertyBagToJSON(value['properties']),
    };
}

