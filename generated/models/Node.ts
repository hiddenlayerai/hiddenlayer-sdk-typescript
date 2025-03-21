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
import type { Location } from './Location';
import {
    LocationFromJSON,
    LocationFromJSONTyped,
    LocationToJSON,
} from './Location';

/**
 * Represents a node in a graph.
 * @export
 * @interface Node
 */
export interface Node {
    /**
     * A string that uniquely identifies the node within its graph.
     * @type {string}
     * @memberof Node
     */
    id: string;
    /**
     * 
     * @type {Message}
     * @memberof Node
     */
    label?: Message;
    /**
     * 
     * @type {Location}
     * @memberof Node
     */
    location?: Location;
    /**
     * Array of child nodes.
     * @type {Set<Node>}
     * @memberof Node
     */
    children?: Set<Node>;
    /**
     * 
     * @type {PropertyBag}
     * @memberof Node
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the Node interface.
 */
export function instanceOfNode(value: object): value is Node {
    if (!('id' in value) || value['id'] === undefined) return false;
    return true;
}

export function NodeFromJSON(json: any): Node {
    return NodeFromJSONTyped(json, false);
}

export function NodeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Node {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'label': json['label'] == null ? undefined : MessageFromJSON(json['label']),
        'location': json['location'] == null ? undefined : LocationFromJSON(json['location']),
        'children': json['children'] == null ? undefined : (new Set((json['children'] as Array<any>).map(NodeFromJSON))),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function NodeToJSON(value?: Node | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'label': MessageToJSON(value['label']),
        'location': LocationToJSON(value['location']),
        'children': value['children'] == null ? undefined : (Array.from(value['children'] as Set<any>).map(NodeToJSON)),
        'properties': PropertyBagToJSON(value['properties']),
    };
}

