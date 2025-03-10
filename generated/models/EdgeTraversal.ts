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
import type { MultiformatMessageString } from './MultiformatMessageString';
import {
    MultiformatMessageStringFromJSON,
    MultiformatMessageStringFromJSONTyped,
    MultiformatMessageStringToJSON,
} from './MultiformatMessageString';

/**
 * Represents the traversal of a single edge during a graph traversal.
 * @export
 * @interface EdgeTraversal
 */
export interface EdgeTraversal {
    /**
     * Identifies the edge being traversed.
     * @type {string}
     * @memberof EdgeTraversal
     */
    edgeId: string;
    /**
     * 
     * @type {Message}
     * @memberof EdgeTraversal
     */
    message?: Message;
    /**
     * The values of relevant expressions after the edge has been traversed.
     * @type {{ [key: string]: MultiformatMessageString; }}
     * @memberof EdgeTraversal
     */
    finalState?: { [key: string]: MultiformatMessageString; };
    /**
     * The number of edge traversals necessary to return from a nested graph.
     * @type {number}
     * @memberof EdgeTraversal
     */
    stepOverEdgeCount?: number;
    /**
     * 
     * @type {PropertyBag}
     * @memberof EdgeTraversal
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the EdgeTraversal interface.
 */
export function instanceOfEdgeTraversal(value: object): value is EdgeTraversal {
    if (!('edgeId' in value) || value['edgeId'] === undefined) return false;
    return true;
}

export function EdgeTraversalFromJSON(json: any): EdgeTraversal {
    return EdgeTraversalFromJSONTyped(json, false);
}

export function EdgeTraversalFromJSONTyped(json: any, ignoreDiscriminator: boolean): EdgeTraversal {
    if (json == null) {
        return json;
    }
    return {
        
        'edgeId': json['edgeId'],
        'message': json['message'] == null ? undefined : MessageFromJSON(json['message']),
        'finalState': json['finalState'] == null ? undefined : (mapValues(json['finalState'], MultiformatMessageStringFromJSON)),
        'stepOverEdgeCount': json['stepOverEdgeCount'] == null ? undefined : json['stepOverEdgeCount'],
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function EdgeTraversalToJSON(value?: EdgeTraversal | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'edgeId': value['edgeId'],
        'message': MessageToJSON(value['message']),
        'finalState': value['finalState'] == null ? undefined : (mapValues(value['finalState'], MultiformatMessageStringToJSON)),
        'stepOverEdgeCount': value['stepOverEdgeCount'],
        'properties': PropertyBagToJSON(value['properties']),
    };
}

