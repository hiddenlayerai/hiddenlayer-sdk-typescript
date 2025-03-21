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

/**
 * A physical or virtual address, or a range of addresses, in an 'addressable region' (memory or a binary file).
 * @export
 * @interface Address
 */
export interface Address {
    /**
     * The address expressed as a byte offset from the start of the addressable region.
     * @type {number}
     * @memberof Address
     */
    absoluteAddress?: number;
    /**
     * The address expressed as a byte offset from the absolute address of the top-most parent object.
     * @type {number}
     * @memberof Address
     */
    relativeAddress?: number;
    /**
     * The number of bytes in this range of addresses.
     * @type {number}
     * @memberof Address
     */
    length?: number;
    /**
     * An open-ended string that identifies the address kind. 'data', 'function', 'header','instruction', 'module', 'page', 'section', 'segment', 'stack', 'stackFrame', 'table' are well-known values.
     * @type {string}
     * @memberof Address
     */
    kind?: string;
    /**
     * A name that is associated with the address, e.g., '.text'.
     * @type {string}
     * @memberof Address
     */
    name?: string;
    /**
     * A human-readable fully qualified name that is associated with the address.
     * @type {string}
     * @memberof Address
     */
    fullyQualifiedName?: string;
    /**
     * The byte offset of this address from the absolute or relative address of the parent object.
     * @type {number}
     * @memberof Address
     */
    offsetFromParent?: number;
    /**
     * The index within run.addresses of the cached object for this address.
     * @type {number}
     * @memberof Address
     */
    index?: number;
    /**
     * The index within run.addresses of the parent object.
     * @type {number}
     * @memberof Address
     */
    parentIndex?: number;
    /**
     * 
     * @type {PropertyBag}
     * @memberof Address
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the Address interface.
 */
export function instanceOfAddress(value: object): value is Address {
    return true;
}

export function AddressFromJSON(json: any): Address {
    return AddressFromJSONTyped(json, false);
}

export function AddressFromJSONTyped(json: any, ignoreDiscriminator: boolean): Address {
    if (json == null) {
        return json;
    }
    return {
        
        'absoluteAddress': json['absoluteAddress'] == null ? undefined : json['absoluteAddress'],
        'relativeAddress': json['relativeAddress'] == null ? undefined : json['relativeAddress'],
        'length': json['length'] == null ? undefined : json['length'],
        'kind': json['kind'] == null ? undefined : json['kind'],
        'name': json['name'] == null ? undefined : json['name'],
        'fullyQualifiedName': json['fullyQualifiedName'] == null ? undefined : json['fullyQualifiedName'],
        'offsetFromParent': json['offsetFromParent'] == null ? undefined : json['offsetFromParent'],
        'index': json['index'] == null ? undefined : json['index'],
        'parentIndex': json['parentIndex'] == null ? undefined : json['parentIndex'],
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function AddressToJSON(value?: Address | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'absoluteAddress': value['absoluteAddress'],
        'relativeAddress': value['relativeAddress'],
        'length': value['length'],
        'kind': value['kind'],
        'name': value['name'],
        'fullyQualifiedName': value['fullyQualifiedName'],
        'offsetFromParent': value['offsetFromParent'],
        'index': value['index'],
        'parentIndex': value['parentIndex'],
        'properties': PropertyBagToJSON(value['properties']),
    };
}

