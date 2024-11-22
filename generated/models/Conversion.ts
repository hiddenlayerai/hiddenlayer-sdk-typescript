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
import type { Invocation } from './Invocation';
import {
    InvocationFromJSON,
    InvocationFromJSONTyped,
    InvocationToJSON,
} from './Invocation';
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
import type { Tool } from './Tool';
import {
    ToolFromJSON,
    ToolFromJSONTyped,
    ToolToJSON,
} from './Tool';

/**
 * Describes how a converter transformed the output of a static analysis tool from the analysis tool's native output format into the SARIF format.
 * @export
 * @interface Conversion
 */
export interface Conversion {
    /**
     * 
     * @type {Tool}
     * @memberof Conversion
     */
    tool: Tool;
    /**
     * 
     * @type {Invocation}
     * @memberof Conversion
     */
    invocation?: Invocation;
    /**
     * The locations of the analysis tool's per-run log files.
     * @type {Set<ArtifactLocation>}
     * @memberof Conversion
     */
    analysisToolLogFiles?: Set<ArtifactLocation>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof Conversion
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the Conversion interface.
 */
export function instanceOfConversion(value: object): value is Conversion {
    if (!('tool' in value) || value['tool'] === undefined) return false;
    return true;
}

export function ConversionFromJSON(json: any): Conversion {
    return ConversionFromJSONTyped(json, false);
}

export function ConversionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Conversion {
    if (json == null) {
        return json;
    }
    return {
        
        'tool': ToolFromJSON(json['tool']),
        'invocation': json['invocation'] == null ? undefined : InvocationFromJSON(json['invocation']),
        'analysisToolLogFiles': json['analysisToolLogFiles'] == null ? undefined : (new Set((json['analysisToolLogFiles'] as Array<any>).map(ArtifactLocationFromJSON))),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ConversionToJSON(value?: Conversion | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'tool': ToolToJSON(value['tool']),
        'invocation': InvocationToJSON(value['invocation']),
        'analysisToolLogFiles': value['analysisToolLogFiles'] == null ? undefined : (Array.from(value['analysisToolLogFiles'] as Set<any>).map(ArtifactLocationToJSON)),
        'properties': PropertyBagToJSON(value['properties']),
    };
}
