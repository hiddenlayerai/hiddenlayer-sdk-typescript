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
import type { Region } from './Region';
import {
    RegionFromJSON,
    RegionFromJSONTyped,
    RegionToJSON,
} from './Region';

/**
 * The replacement of a single region of an artifact.
 * @export
 * @interface Replacement
 */
export interface Replacement {
    /**
     * 
     * @type {Region}
     * @memberof Replacement
     */
    deletedRegion: Region;
    /**
     * 
     * @type {ArtifactContent}
     * @memberof Replacement
     */
    insertedContent?: ArtifactContent;
    /**
     * 
     * @type {PropertyBag}
     * @memberof Replacement
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the Replacement interface.
 */
export function instanceOfReplacement(value: object): value is Replacement {
    if (!('deletedRegion' in value) || value['deletedRegion'] === undefined) return false;
    return true;
}

export function ReplacementFromJSON(json: any): Replacement {
    return ReplacementFromJSONTyped(json, false);
}

export function ReplacementFromJSONTyped(json: any, ignoreDiscriminator: boolean): Replacement {
    if (json == null) {
        return json;
    }
    return {
        
        'deletedRegion': RegionFromJSON(json['deletedRegion']),
        'insertedContent': json['insertedContent'] == null ? undefined : ArtifactContentFromJSON(json['insertedContent']),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ReplacementToJSON(value?: Replacement | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'deletedRegion': RegionToJSON(value['deletedRegion']),
        'insertedContent': ArtifactContentToJSON(value['insertedContent']),
        'properties': PropertyBagToJSON(value['properties']),
    };
}
