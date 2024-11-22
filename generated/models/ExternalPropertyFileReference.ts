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
import type { PropertyBag } from './PropertyBag';
import {
    PropertyBagFromJSON,
    PropertyBagFromJSONTyped,
    PropertyBagToJSON,
} from './PropertyBag';
import type { ArtifactLocation } from './ArtifactLocation';
import {
    ArtifactLocationFromJSON,
    ArtifactLocationFromJSONTyped,
    ArtifactLocationToJSON,
} from './ArtifactLocation';

/**
 * Contains information that enables a SARIF consumer to locate the external property file that contains the value of an externalized property associated with the run.
 * @export
 * @interface ExternalPropertyFileReference
 */
export interface ExternalPropertyFileReference {
    /**
     * 
     * @type {ArtifactLocation}
     * @memberof ExternalPropertyFileReference
     */
    location?: ArtifactLocation;
    /**
     * A stable, unique identifier for the external property file in the form of a GUID.
     * @type {string}
     * @memberof ExternalPropertyFileReference
     */
    guid?: string;
    /**
     * A non-negative integer specifying the number of items contained in the external property file.
     * @type {number}
     * @memberof ExternalPropertyFileReference
     */
    itemCount?: number;
    /**
     * 
     * @type {PropertyBag}
     * @memberof ExternalPropertyFileReference
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the ExternalPropertyFileReference interface.
 */
export function instanceOfExternalPropertyFileReference(value: object): value is ExternalPropertyFileReference {
    return true;
}

export function ExternalPropertyFileReferenceFromJSON(json: any): ExternalPropertyFileReference {
    return ExternalPropertyFileReferenceFromJSONTyped(json, false);
}

export function ExternalPropertyFileReferenceFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExternalPropertyFileReference {
    if (json == null) {
        return json;
    }
    return {
        
        'location': json['location'] == null ? undefined : ArtifactLocationFromJSON(json['location']),
        'guid': json['guid'] == null ? undefined : json['guid'],
        'itemCount': json['itemCount'] == null ? undefined : json['itemCount'],
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ExternalPropertyFileReferenceToJSON(value?: ExternalPropertyFileReference | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'location': ArtifactLocationToJSON(value['location']),
        'guid': value['guid'],
        'itemCount': value['itemCount'],
        'properties': PropertyBagToJSON(value['properties']),
    };
}
