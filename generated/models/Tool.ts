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
import type { ToolComponent } from './ToolComponent';
import {
    ToolComponentFromJSON,
    ToolComponentFromJSONTyped,
    ToolComponentToJSON,
} from './ToolComponent';

/**
 * The analysis tool that was run.
 * @export
 * @interface Tool
 */
export interface Tool {
    /**
     * 
     * @type {ToolComponent}
     * @memberof Tool
     */
    driver: ToolComponent;
    /**
     * Tool extensions that contributed to or reconfigured the analysis tool that was run.
     * @type {Set<ToolComponent>}
     * @memberof Tool
     */
    extensions?: Set<ToolComponent>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof Tool
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the Tool interface.
 */
export function instanceOfTool(value: object): value is Tool {
    if (!('driver' in value) || value['driver'] === undefined) return false;
    return true;
}

export function ToolFromJSON(json: any): Tool {
    return ToolFromJSONTyped(json, false);
}

export function ToolFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tool {
    if (json == null) {
        return json;
    }
    return {
        
        'driver': ToolComponentFromJSON(json['driver']),
        'extensions': json['extensions'] == null ? undefined : (new Set((json['extensions'] as Array<any>).map(ToolComponentFromJSON))),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function ToolToJSON(value?: Tool | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'driver': ToolComponentToJSON(value['driver']),
        'extensions': value['extensions'] == null ? undefined : (Array.from(value['extensions'] as Set<any>).map(ToolComponentToJSON)),
        'properties': PropertyBagToJSON(value['properties']),
    };
}
