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
import type { PropertyBag } from './PropertyBag';
import {
    PropertyBagFromJSON,
    PropertyBagFromJSONTyped,
    PropertyBagToJSON,
} from './PropertyBag';
import type { ExternalProperties } from './ExternalProperties';
import {
    ExternalPropertiesFromJSON,
    ExternalPropertiesFromJSONTyped,
    ExternalPropertiesToJSON,
} from './ExternalProperties';
import type { Run } from './Run';
import {
    RunFromJSON,
    RunFromJSONTyped,
    RunToJSON,
} from './Run';

/**
 * Static Analysis Results Format (SARIF) Version 2.1.0 JSON Schema: a standard format for the output of static analysis tools.
 * @export
 * @interface Sarif210
 */
export interface Sarif210 {
    /**
     * The URI of the JSON schema corresponding to the version.
     * @type {string}
     * @memberof Sarif210
     */
    $schema?: string;
    /**
     * The SARIF format version of this log file.
     * @type {object}
     * @memberof Sarif210
     */
    version: Sarif210VersionEnum;
    /**
     * The set of runs contained in this log file.
     * @type {Array<Run>}
     * @memberof Sarif210
     */
    runs: Array<Run>;
    /**
     * References to external property files that share data between runs.
     * @type {Set<ExternalProperties>}
     * @memberof Sarif210
     */
    inlineExternalProperties?: Set<ExternalProperties>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof Sarif210
     */
    properties?: PropertyBag;
}


/**
 * @export
 */
export const Sarif210VersionEnum = {
    _210: '2.1.0',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type Sarif210VersionEnum = typeof Sarif210VersionEnum[keyof typeof Sarif210VersionEnum];


/**
 * Check if a given object implements the Sarif210 interface.
 */
export function instanceOfSarif210(value: object): value is Sarif210 {
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('runs' in value) || value['runs'] === undefined) return false;
    return true;
}

export function Sarif210FromJSON(json: any): Sarif210 {
    return Sarif210FromJSONTyped(json, false);
}

export function Sarif210FromJSONTyped(json: any, ignoreDiscriminator: boolean): Sarif210 {
    if (json == null) {
        return json;
    }
    return {
        
        '$schema': json['$schema'] == null ? undefined : json['$schema'],
        'version': json['version'],
        'runs': ((json['runs'] as Array<any>).map(RunFromJSON)),
        'inlineExternalProperties': json['inlineExternalProperties'] == null ? undefined : (new Set((json['inlineExternalProperties'] as Array<any>).map(ExternalPropertiesFromJSON))),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function Sarif210ToJSON(value?: Sarif210 | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        '$schema': value['$schema'],
        'version': value['version'],
        'runs': ((value['runs'] as Array<any>).map(RunToJSON)),
        'inlineExternalProperties': value['inlineExternalProperties'] == null ? undefined : (Array.from(value['inlineExternalProperties'] as Set<any>).map(ExternalPropertiesToJSON)),
        'properties': PropertyBagToJSON(value['properties']),
    };
}

