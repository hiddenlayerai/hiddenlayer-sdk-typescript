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

/**
 * An area within an image.
 * @export
 * @interface Rectangle
 */
export interface Rectangle {
    /**
     * The Y coordinate of the top edge of the rectangle, measured in the image's natural units.
     * @type {number}
     * @memberof Rectangle
     */
    top?: number;
    /**
     * The X coordinate of the left edge of the rectangle, measured in the image's natural units.
     * @type {number}
     * @memberof Rectangle
     */
    left?: number;
    /**
     * The Y coordinate of the bottom edge of the rectangle, measured in the image's natural units.
     * @type {number}
     * @memberof Rectangle
     */
    bottom?: number;
    /**
     * The X coordinate of the right edge of the rectangle, measured in the image's natural units.
     * @type {number}
     * @memberof Rectangle
     */
    right?: number;
    /**
     * 
     * @type {Message}
     * @memberof Rectangle
     */
    message?: Message;
    /**
     * 
     * @type {PropertyBag}
     * @memberof Rectangle
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the Rectangle interface.
 */
export function instanceOfRectangle(value: object): value is Rectangle {
    return true;
}

export function RectangleFromJSON(json: any): Rectangle {
    return RectangleFromJSONTyped(json, false);
}

export function RectangleFromJSONTyped(json: any, ignoreDiscriminator: boolean): Rectangle {
    if (json == null) {
        return json;
    }
    return {
        
        'top': json['top'] == null ? undefined : json['top'],
        'left': json['left'] == null ? undefined : json['left'],
        'bottom': json['bottom'] == null ? undefined : json['bottom'],
        'right': json['right'] == null ? undefined : json['right'],
        'message': json['message'] == null ? undefined : MessageFromJSON(json['message']),
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function RectangleToJSON(value?: Rectangle | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'top': value['top'],
        'left': value['left'],
        'bottom': value['bottom'],
        'right': value['right'],
        'message': MessageToJSON(value['message']),
        'properties': PropertyBagToJSON(value['properties']),
    };
}

