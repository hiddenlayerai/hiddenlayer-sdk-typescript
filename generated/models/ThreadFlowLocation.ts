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
import type { WebResponse } from './WebResponse';
import {
    WebResponseFromJSON,
    WebResponseFromJSONTyped,
    WebResponseToJSON,
} from './WebResponse';
import type { WebRequest } from './WebRequest';
import {
    WebRequestFromJSON,
    WebRequestFromJSONTyped,
    WebRequestToJSON,
} from './WebRequest';
import type { PropertyBag } from './PropertyBag';
import {
    PropertyBagFromJSON,
    PropertyBagFromJSONTyped,
    PropertyBagToJSON,
} from './PropertyBag';
import type { MultiformatMessageString } from './MultiformatMessageString';
import {
    MultiformatMessageStringFromJSON,
    MultiformatMessageStringFromJSONTyped,
    MultiformatMessageStringToJSON,
} from './MultiformatMessageString';
import type { ReportingDescriptorReference } from './ReportingDescriptorReference';
import {
    ReportingDescriptorReferenceFromJSON,
    ReportingDescriptorReferenceFromJSONTyped,
    ReportingDescriptorReferenceToJSON,
} from './ReportingDescriptorReference';
import type { Location } from './Location';
import {
    LocationFromJSON,
    LocationFromJSONTyped,
    LocationToJSON,
} from './Location';
import type { Stack } from './Stack';
import {
    StackFromJSON,
    StackFromJSONTyped,
    StackToJSON,
} from './Stack';

/**
 * A location visited by an analysis tool while simulating or monitoring the execution of a program.
 * @export
 * @interface ThreadFlowLocation
 */
export interface ThreadFlowLocation {
    /**
     * The index within the run threadFlowLocations array.
     * @type {number}
     * @memberof ThreadFlowLocation
     */
    index?: number;
    /**
     * 
     * @type {Location}
     * @memberof ThreadFlowLocation
     */
    location?: Location;
    /**
     * 
     * @type {Stack}
     * @memberof ThreadFlowLocation
     */
    stack?: Stack;
    /**
     * A set of distinct strings that categorize the thread flow location. Well-known kinds include 'acquire', 'release', 'enter', 'exit', 'call', 'return', 'branch', 'implicit', 'false', 'true', 'caution', 'danger', 'unknown', 'unreachable', 'taint', 'function', 'handler', 'lock', 'memory', 'resource', 'scope' and 'value'.
     * @type {Set<string>}
     * @memberof ThreadFlowLocation
     */
    kinds?: Set<string>;
    /**
     * An array of references to rule or taxonomy reporting descriptors that are applicable to the thread flow location.
     * @type {Set<ReportingDescriptorReference>}
     * @memberof ThreadFlowLocation
     */
    taxa?: Set<ReportingDescriptorReference>;
    /**
     * The name of the module that contains the code that is executing.
     * @type {string}
     * @memberof ThreadFlowLocation
     */
    module?: string;
    /**
     * A dictionary, each of whose keys specifies a variable or expression, the associated value of which represents the variable or expression value. For an annotation of kind 'continuation', for example, this dictionary might hold the current assumed values of a set of global variables.
     * @type {{ [key: string]: MultiformatMessageString; }}
     * @memberof ThreadFlowLocation
     */
    state?: { [key: string]: MultiformatMessageString; };
    /**
     * An integer representing a containment hierarchy within the thread flow.
     * @type {number}
     * @memberof ThreadFlowLocation
     */
    nestingLevel?: number;
    /**
     * An integer representing the temporal order in which execution reached this location.
     * @type {number}
     * @memberof ThreadFlowLocation
     */
    executionOrder?: number;
    /**
     * The Coordinated Universal Time (UTC) date and time at which this location was executed.
     * @type {Date}
     * @memberof ThreadFlowLocation
     */
    executionTimeUtc?: Date;
    /**
     * Specifies the importance of this location in understanding the code flow in which it occurs. The order from most to least important is "essential", "important", "unimportant". Default: "important".
     * @type {string}
     * @memberof ThreadFlowLocation
     */
    importance?: ThreadFlowLocationImportanceEnum;
    /**
     * 
     * @type {WebRequest}
     * @memberof ThreadFlowLocation
     */
    webRequest?: WebRequest;
    /**
     * 
     * @type {WebResponse}
     * @memberof ThreadFlowLocation
     */
    webResponse?: WebResponse;
    /**
     * 
     * @type {PropertyBag}
     * @memberof ThreadFlowLocation
     */
    properties?: PropertyBag;
}


/**
 * @export
 */
export const ThreadFlowLocationImportanceEnum = {
    Important: 'important',
    Essential: 'essential',
    Unimportant: 'unimportant',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type ThreadFlowLocationImportanceEnum = typeof ThreadFlowLocationImportanceEnum[keyof typeof ThreadFlowLocationImportanceEnum];


/**
 * Check if a given object implements the ThreadFlowLocation interface.
 */
export function instanceOfThreadFlowLocation(value: object): value is ThreadFlowLocation {
    return true;
}

export function ThreadFlowLocationFromJSON(json: any): ThreadFlowLocation {
    return ThreadFlowLocationFromJSONTyped(json, false);
}

export function ThreadFlowLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): ThreadFlowLocation {
    if (json == null) {
        return json;
    }
    return {
        
        'index': json['index'] == null ? undefined : json['index'],
        'location': json['location'] == null ? undefined : LocationFromJSON(json['location']),
        'stack': json['stack'] == null ? undefined : StackFromJSON(json['stack']),
        'kinds': json['kinds'] == null ? undefined : json['kinds'],
        'taxa': json['taxa'] == null ? undefined : (new Set((json['taxa'] as Array<any>).map(ReportingDescriptorReferenceFromJSON))),
        'module': json['module'] == null ? undefined : json['module'],
        'state': json['state'] == null ? undefined : (mapValues(json['state'], MultiformatMessageStringFromJSON)),
        'nestingLevel': json['nestingLevel'] == null ? undefined : json['nestingLevel'],
        'executionOrder': json['executionOrder'] == null ? undefined : json['executionOrder'],
        'executionTimeUtc': json['executionTimeUtc'] == null ? undefined : (new Date(json['executionTimeUtc'])),
        'importance': json['importance'] == null ? undefined : json['importance'],
        'webRequest': json['webRequest'] == null ? undefined : WebRequestFromJSON(json['webRequest']),
        'webResponse': json['webResponse'] == null ? undefined : WebResponseFromJSON(json['webResponse']),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ThreadFlowLocationToJSON(value?: ThreadFlowLocation | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'index': value['index'],
        'location': LocationToJSON(value['location']),
        'stack': StackToJSON(value['stack']),
        'kinds': value['kinds'] == null ? undefined : Array.from(value['kinds'] as Set<any>),
        'taxa': value['taxa'] == null ? undefined : (Array.from(value['taxa'] as Set<any>).map(ReportingDescriptorReferenceToJSON)),
        'module': value['module'],
        'state': value['state'] == null ? undefined : (mapValues(value['state'], MultiformatMessageStringToJSON)),
        'nestingLevel': value['nestingLevel'],
        'executionOrder': value['executionOrder'],
        'executionTimeUtc': value['executionTimeUtc'] == null ? undefined : ((value['executionTimeUtc']).toISOString()),
        'importance': value['importance'],
        'webRequest': WebRequestToJSON(value['webRequest']),
        'webResponse': WebResponseToJSON(value['webResponse']),
        'properties': PropertyBagToJSON(value['properties']),
    };
}

