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
import type { Location } from './Location';
import {
    LocationFromJSON,
    LocationFromJSONTyped,
    LocationToJSON,
} from './Location';

/**
 * A function call within a stack trace.
 * @export
 * @interface StackFrame
 */
export interface StackFrame {
    /**
     * 
     * @type {Location}
     * @memberof StackFrame
     */
    location?: Location;
    /**
     * The name of the module that contains the code of this stack frame.
     * @type {string}
     * @memberof StackFrame
     */
    module?: string;
    /**
     * The thread identifier of the stack frame.
     * @type {number}
     * @memberof StackFrame
     */
    threadId?: number;
    /**
     * The parameters of the call that is executing.
     * @type {Array<string>}
     * @memberof StackFrame
     */
    parameters?: Array<string>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof StackFrame
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the StackFrame interface.
 */
export function instanceOfStackFrame(value: object): value is StackFrame {
    return true;
}

export function StackFrameFromJSON(json: any): StackFrame {
    return StackFrameFromJSONTyped(json, false);
}

export function StackFrameFromJSONTyped(json: any, ignoreDiscriminator: boolean): StackFrame {
    if (json == null) {
        return json;
    }
    return {
        
        'location': json['location'] == null ? undefined : LocationFromJSON(json['location']),
        'module': json['module'] == null ? undefined : json['module'],
        'threadId': json['threadId'] == null ? undefined : json['threadId'],
        'parameters': json['parameters'] == null ? undefined : json['parameters'],
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function StackFrameToJSON(value?: StackFrame | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'location': LocationToJSON(value['location']),
        'module': value['module'],
        'threadId': value['threadId'],
        'parameters': value['parameters'],
        'properties': PropertyBagToJSON(value['properties']),
    };
}

