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
import type { PhysicalLocation } from './PhysicalLocation';
import {
    PhysicalLocationFromJSON,
    PhysicalLocationFromJSONTyped,
    PhysicalLocationToJSON,
} from './PhysicalLocation';

/**
 * Contains information about how and when a result was detected.
 * @export
 * @interface ResultProvenance
 */
export interface ResultProvenance {
    /**
     * The Coordinated Universal Time (UTC) date and time at which the result was first detected. See "Date/time properties" in the SARIF spec for the required format.
     * @type {Date}
     * @memberof ResultProvenance
     */
    firstDetectionTimeUtc?: Date;
    /**
     * The Coordinated Universal Time (UTC) date and time at which the result was most recently detected. See "Date/time properties" in the SARIF spec for the required format.
     * @type {Date}
     * @memberof ResultProvenance
     */
    lastDetectionTimeUtc?: Date;
    /**
     * A GUID-valued string equal to the automationDetails.guid property of the run in which the result was first detected.
     * @type {string}
     * @memberof ResultProvenance
     */
    firstDetectionRunGuid?: string;
    /**
     * A GUID-valued string equal to the automationDetails.guid property of the run in which the result was most recently detected.
     * @type {string}
     * @memberof ResultProvenance
     */
    lastDetectionRunGuid?: string;
    /**
     * The index within the run.invocations array of the invocation object which describes the tool invocation that detected the result.
     * @type {number}
     * @memberof ResultProvenance
     */
    invocationIndex?: number;
    /**
     * An array of physicalLocation objects which specify the portions of an analysis tool's output that a converter transformed into the result.
     * @type {Set<PhysicalLocation>}
     * @memberof ResultProvenance
     */
    conversionSources?: Set<PhysicalLocation>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof ResultProvenance
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the ResultProvenance interface.
 */
export function instanceOfResultProvenance(value: object): value is ResultProvenance {
    return true;
}

export function ResultProvenanceFromJSON(json: any): ResultProvenance {
    return ResultProvenanceFromJSONTyped(json, false);
}

export function ResultProvenanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResultProvenance {
    if (json == null) {
        return json;
    }
    return {
        
        'firstDetectionTimeUtc': json['firstDetectionTimeUtc'] == null ? undefined : (new Date(json['firstDetectionTimeUtc'])),
        'lastDetectionTimeUtc': json['lastDetectionTimeUtc'] == null ? undefined : (new Date(json['lastDetectionTimeUtc'])),
        'firstDetectionRunGuid': json['firstDetectionRunGuid'] == null ? undefined : json['firstDetectionRunGuid'],
        'lastDetectionRunGuid': json['lastDetectionRunGuid'] == null ? undefined : json['lastDetectionRunGuid'],
        'invocationIndex': json['invocationIndex'] == null ? undefined : json['invocationIndex'],
        'conversionSources': json['conversionSources'] == null ? undefined : (new Set((json['conversionSources'] as Array<any>).map(PhysicalLocationFromJSON))),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ResultProvenanceToJSON(value?: ResultProvenance | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'firstDetectionTimeUtc': value['firstDetectionTimeUtc'] == null ? undefined : ((value['firstDetectionTimeUtc']).toISOString()),
        'lastDetectionTimeUtc': value['lastDetectionTimeUtc'] == null ? undefined : ((value['lastDetectionTimeUtc']).toISOString()),
        'firstDetectionRunGuid': value['firstDetectionRunGuid'],
        'lastDetectionRunGuid': value['lastDetectionRunGuid'],
        'invocationIndex': value['invocationIndex'],
        'conversionSources': value['conversionSources'] == null ? undefined : (Array.from(value['conversionSources'] as Set<any>).map(PhysicalLocationToJSON)),
        'properties': PropertyBagToJSON(value['properties']),
    };
}

