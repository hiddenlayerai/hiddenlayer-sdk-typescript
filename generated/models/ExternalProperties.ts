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
import type { Graph } from './Graph';
import {
    GraphFromJSON,
    GraphFromJSONTyped,
    GraphToJSON,
} from './Graph';
import type { ThreadFlowLocation } from './ThreadFlowLocation';
import {
    ThreadFlowLocationFromJSON,
    ThreadFlowLocationFromJSONTyped,
    ThreadFlowLocationToJSON,
} from './ThreadFlowLocation';
import type { WebResponse } from './WebResponse';
import {
    WebResponseFromJSON,
    WebResponseFromJSONTyped,
    WebResponseToJSON,
} from './WebResponse';
import type { Address } from './Address';
import {
    AddressFromJSON,
    AddressFromJSONTyped,
    AddressToJSON,
} from './Address';
import type { Invocation } from './Invocation';
import {
    InvocationFromJSON,
    InvocationFromJSONTyped,
    InvocationToJSON,
} from './Invocation';
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
import type { Conversion } from './Conversion';
import {
    ConversionFromJSON,
    ConversionFromJSONTyped,
    ConversionToJSON,
} from './Conversion';
import type { Artifact } from './Artifact';
import {
    ArtifactFromJSON,
    ArtifactFromJSONTyped,
    ArtifactToJSON,
} from './Artifact';
import type { LogicalLocation } from './LogicalLocation';
import {
    LogicalLocationFromJSON,
    LogicalLocationFromJSONTyped,
    LogicalLocationToJSON,
} from './LogicalLocation';
import type { ToolComponent } from './ToolComponent';
import {
    ToolComponentFromJSON,
    ToolComponentFromJSONTyped,
    ToolComponentToJSON,
} from './ToolComponent';
import type { Result } from './Result';
import {
    ResultFromJSON,
    ResultFromJSONTyped,
    ResultToJSON,
} from './Result';

/**
 * The top-level element of an external property file.
 * @export
 * @interface ExternalProperties
 */
export interface ExternalProperties {
    /**
     * The URI of the JSON schema corresponding to the version of the external property file format.
     * @type {string}
     * @memberof ExternalProperties
     */
    schema?: string;
    /**
     * The SARIF format version of this external properties object.
     * @type {string}
     * @memberof ExternalProperties
     */
    version?: ExternalPropertiesVersionEnum;
    /**
     * A stable, unique identifier for this external properties object, in the form of a GUID.
     * @type {string}
     * @memberof ExternalProperties
     */
    guid?: string;
    /**
     * A stable, unique identifier for the run associated with this external properties object, in the form of a GUID.
     * @type {string}
     * @memberof ExternalProperties
     */
    runGuid?: string;
    /**
     * 
     * @type {Conversion}
     * @memberof ExternalProperties
     */
    conversion?: Conversion;
    /**
     * An array of graph objects that will be merged with a separate run.
     * @type {Set<Graph>}
     * @memberof ExternalProperties
     */
    graphs?: Set<Graph>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof ExternalProperties
     */
    externalizedProperties?: PropertyBag;
    /**
     * An array of artifact objects that will be merged with a separate run.
     * @type {Set<Artifact>}
     * @memberof ExternalProperties
     */
    artifacts?: Set<Artifact>;
    /**
     * Describes the invocation of the analysis tool that will be merged with a separate run.
     * @type {Array<Invocation>}
     * @memberof ExternalProperties
     */
    invocations?: Array<Invocation>;
    /**
     * An array of logical locations such as namespaces, types or functions that will be merged with a separate run.
     * @type {Set<LogicalLocation>}
     * @memberof ExternalProperties
     */
    logicalLocations?: Set<LogicalLocation>;
    /**
     * An array of threadFlowLocation objects that will be merged with a separate run.
     * @type {Set<ThreadFlowLocation>}
     * @memberof ExternalProperties
     */
    threadFlowLocations?: Set<ThreadFlowLocation>;
    /**
     * An array of result objects that will be merged with a separate run.
     * @type {Array<Result>}
     * @memberof ExternalProperties
     */
    results?: Array<Result>;
    /**
     * Tool taxonomies that will be merged with a separate run.
     * @type {Set<ToolComponent>}
     * @memberof ExternalProperties
     */
    taxonomies?: Set<ToolComponent>;
    /**
     * 
     * @type {ToolComponent}
     * @memberof ExternalProperties
     */
    driver?: ToolComponent;
    /**
     * Tool extensions that will be merged with a separate run.
     * @type {Set<ToolComponent>}
     * @memberof ExternalProperties
     */
    extensions?: Set<ToolComponent>;
    /**
     * Tool policies that will be merged with a separate run.
     * @type {Set<ToolComponent>}
     * @memberof ExternalProperties
     */
    policies?: Set<ToolComponent>;
    /**
     * Tool translations that will be merged with a separate run.
     * @type {Set<ToolComponent>}
     * @memberof ExternalProperties
     */
    translations?: Set<ToolComponent>;
    /**
     * Addresses that will be merged with a separate run.
     * @type {Array<Address>}
     * @memberof ExternalProperties
     */
    addresses?: Array<Address>;
    /**
     * Requests that will be merged with a separate run.
     * @type {Set<WebRequest>}
     * @memberof ExternalProperties
     */
    webRequests?: Set<WebRequest>;
    /**
     * Responses that will be merged with a separate run.
     * @type {Set<WebResponse>}
     * @memberof ExternalProperties
     */
    webResponses?: Set<WebResponse>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof ExternalProperties
     */
    properties?: PropertyBag;
}


/**
 * @export
 */
export const ExternalPropertiesVersionEnum = {
    _210: '2.1.0',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type ExternalPropertiesVersionEnum = typeof ExternalPropertiesVersionEnum[keyof typeof ExternalPropertiesVersionEnum];


/**
 * Check if a given object implements the ExternalProperties interface.
 */
export function instanceOfExternalProperties(value: object): value is ExternalProperties {
    return true;
}

export function ExternalPropertiesFromJSON(json: any): ExternalProperties {
    return ExternalPropertiesFromJSONTyped(json, false);
}

export function ExternalPropertiesFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExternalProperties {
    if (json == null) {
        return json;
    }
    return {
        
        'schema': json['schema'] == null ? undefined : json['schema'],
        'version': json['version'] == null ? undefined : json['version'],
        'guid': json['guid'] == null ? undefined : json['guid'],
        'runGuid': json['runGuid'] == null ? undefined : json['runGuid'],
        'conversion': json['conversion'] == null ? undefined : ConversionFromJSON(json['conversion']),
        'graphs': json['graphs'] == null ? undefined : (new Set((json['graphs'] as Array<any>).map(GraphFromJSON))),
        'externalizedProperties': json['externalizedProperties'] == null ? undefined : PropertyBagFromJSON(json['externalizedProperties']),
        'artifacts': json['artifacts'] == null ? undefined : (new Set((json['artifacts'] as Array<any>).map(ArtifactFromJSON))),
        'invocations': json['invocations'] == null ? undefined : ((json['invocations'] as Array<any>).map(InvocationFromJSON)),
        'logicalLocations': json['logicalLocations'] == null ? undefined : (new Set((json['logicalLocations'] as Array<any>).map(LogicalLocationFromJSON))),
        'threadFlowLocations': json['threadFlowLocations'] == null ? undefined : (new Set((json['threadFlowLocations'] as Array<any>).map(ThreadFlowLocationFromJSON))),
        'results': json['results'] == null ? undefined : ((json['results'] as Array<any>).map(ResultFromJSON)),
        'taxonomies': json['taxonomies'] == null ? undefined : (new Set((json['taxonomies'] as Array<any>).map(ToolComponentFromJSON))),
        'driver': json['driver'] == null ? undefined : ToolComponentFromJSON(json['driver']),
        'extensions': json['extensions'] == null ? undefined : (new Set((json['extensions'] as Array<any>).map(ToolComponentFromJSON))),
        'policies': json['policies'] == null ? undefined : (new Set((json['policies'] as Array<any>).map(ToolComponentFromJSON))),
        'translations': json['translations'] == null ? undefined : (new Set((json['translations'] as Array<any>).map(ToolComponentFromJSON))),
        'addresses': json['addresses'] == null ? undefined : ((json['addresses'] as Array<any>).map(AddressFromJSON)),
        'webRequests': json['webRequests'] == null ? undefined : (new Set((json['webRequests'] as Array<any>).map(WebRequestFromJSON))),
        'webResponses': json['webResponses'] == null ? undefined : (new Set((json['webResponses'] as Array<any>).map(WebResponseFromJSON))),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ExternalPropertiesToJSON(value?: ExternalProperties | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'schema': value['schema'],
        'version': value['version'],
        'guid': value['guid'],
        'runGuid': value['runGuid'],
        'conversion': ConversionToJSON(value['conversion']),
        'graphs': value['graphs'] == null ? undefined : (Array.from(value['graphs'] as Set<any>).map(GraphToJSON)),
        'externalizedProperties': PropertyBagToJSON(value['externalizedProperties']),
        'artifacts': value['artifacts'] == null ? undefined : (Array.from(value['artifacts'] as Set<any>).map(ArtifactToJSON)),
        'invocations': value['invocations'] == null ? undefined : ((value['invocations'] as Array<any>).map(InvocationToJSON)),
        'logicalLocations': value['logicalLocations'] == null ? undefined : (Array.from(value['logicalLocations'] as Set<any>).map(LogicalLocationToJSON)),
        'threadFlowLocations': value['threadFlowLocations'] == null ? undefined : (Array.from(value['threadFlowLocations'] as Set<any>).map(ThreadFlowLocationToJSON)),
        'results': value['results'] == null ? undefined : ((value['results'] as Array<any>).map(ResultToJSON)),
        'taxonomies': value['taxonomies'] == null ? undefined : (Array.from(value['taxonomies'] as Set<any>).map(ToolComponentToJSON)),
        'driver': ToolComponentToJSON(value['driver']),
        'extensions': value['extensions'] == null ? undefined : (Array.from(value['extensions'] as Set<any>).map(ToolComponentToJSON)),
        'policies': value['policies'] == null ? undefined : (Array.from(value['policies'] as Set<any>).map(ToolComponentToJSON)),
        'translations': value['translations'] == null ? undefined : (Array.from(value['translations'] as Set<any>).map(ToolComponentToJSON)),
        'addresses': value['addresses'] == null ? undefined : ((value['addresses'] as Array<any>).map(AddressToJSON)),
        'webRequests': value['webRequests'] == null ? undefined : (Array.from(value['webRequests'] as Set<any>).map(WebRequestToJSON)),
        'webResponses': value['webResponses'] == null ? undefined : (Array.from(value['webResponses'] as Set<any>).map(WebResponseToJSON)),
        'properties': PropertyBagToJSON(value['properties']),
    };
}
