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
import type { Message } from './Message';
import {
    MessageFromJSON,
    MessageFromJSONTyped,
    MessageToJSON,
} from './Message';
import type { PropertyBag } from './PropertyBag';
import {
    PropertyBagFromJSON,
    PropertyBagFromJSONTyped,
    PropertyBagToJSON,
} from './PropertyBag';

/**
 * Specifies the location of an artifact.
 * @export
 * @interface ArtifactLocation
 */
export interface ArtifactLocation {
    /**
     * A string containing a valid relative or absolute URI.
     * @type {string}
     * @memberof ArtifactLocation
     */
    uri?: string;
    /**
     * A string which indirectly specifies the absolute URI with respect to which a relative URI in the "uri" property is interpreted.
     * @type {string}
     * @memberof ArtifactLocation
     */
    uriBaseId?: string;
    /**
     * The index within the run artifacts array of the artifact object associated with the artifact location.
     * @type {number}
     * @memberof ArtifactLocation
     */
    index?: number;
    /**
     * 
     * @type {Message}
     * @memberof ArtifactLocation
     */
    description?: Message;
    /**
     * 
     * @type {PropertyBag}
     * @memberof ArtifactLocation
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the ArtifactLocation interface.
 */
export function instanceOfArtifactLocation(value: object): value is ArtifactLocation {
    return true;
}

export function ArtifactLocationFromJSON(json: any): ArtifactLocation {
    return ArtifactLocationFromJSONTyped(json, false);
}

export function ArtifactLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArtifactLocation {
    if (json == null) {
        return json;
    }
    return {
        
        'uri': json['uri'] == null ? undefined : json['uri'],
        'uriBaseId': json['uriBaseId'] == null ? undefined : json['uriBaseId'],
        'index': json['index'] == null ? undefined : json['index'],
        'description': json['description'] == null ? undefined : MessageFromJSON(json['description']),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ArtifactLocationToJSON(value?: ArtifactLocation | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'uri': value['uri'],
        'uriBaseId': value['uriBaseId'],
        'index': value['index'],
        'description': MessageToJSON(value['description']),
        'properties': PropertyBagToJSON(value['properties']),
    };
}

