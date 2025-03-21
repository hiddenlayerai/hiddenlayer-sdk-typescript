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
 * Information that describes a run's identity and role within an engineering system process.
 * @export
 * @interface RunAutomationDetails
 */
export interface RunAutomationDetails {
    /**
     * 
     * @type {Message}
     * @memberof RunAutomationDetails
     */
    description?: Message;
    /**
     * A hierarchical string that uniquely identifies this object's containing run object.
     * @type {string}
     * @memberof RunAutomationDetails
     */
    id?: string;
    /**
     * A stable, unique identifier for this object's containing run object in the form of a GUID.
     * @type {string}
     * @memberof RunAutomationDetails
     */
    guid?: string;
    /**
     * A stable, unique identifier for the equivalence class of runs to which this object's containing run object belongs in the form of a GUID.
     * @type {string}
     * @memberof RunAutomationDetails
     */
    correlationGuid?: string;
    /**
     * 
     * @type {PropertyBag}
     * @memberof RunAutomationDetails
     */
    properties?: PropertyBag;
}

/**
 * Check if a given object implements the RunAutomationDetails interface.
 */
export function instanceOfRunAutomationDetails(value: object): value is RunAutomationDetails {
    return true;
}

export function RunAutomationDetailsFromJSON(json: any): RunAutomationDetails {
    return RunAutomationDetailsFromJSONTyped(json, false);
}

export function RunAutomationDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): RunAutomationDetails {
    if (json == null) {
        return json;
    }
    return {
        
        'description': json['description'] == null ? undefined : MessageFromJSON(json['description']),
        'id': json['id'] == null ? undefined : json['id'],
        'guid': json['guid'] == null ? undefined : json['guid'],
        'correlationGuid': json['correlationGuid'] == null ? undefined : json['correlationGuid'],
        'properties': json['properties'] == null ? undefined : PropertyBagFromJSON(json['properties']),
    };
}

export function RunAutomationDetailsToJSON(value?: RunAutomationDetails | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'description': MessageToJSON(value['description']),
        'id': value['id'],
        'guid': value['guid'],
        'correlationGuid': value['correlationGuid'],
        'properties': PropertyBagToJSON(value['properties']),
    };
}

