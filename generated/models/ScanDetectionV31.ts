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
import type { RuleDetailsInner } from './RuleDetailsInner';
import {
    RuleDetailsInnerFromJSON,
    RuleDetailsInnerFromJSONTyped,
    RuleDetailsInnerToJSON,
} from './RuleDetailsInner';
import type { MITREAtlasInner } from './MITREAtlasInner';
import {
    MITREAtlasInnerFromJSON,
    MITREAtlasInnerFromJSONTyped,
    MITREAtlasInnerToJSON,
} from './MITREAtlasInner';

/**
 * 
 * @export
 * @interface ScanDetectionV31
 */
export interface ScanDetectionV31 {
    /**
     * unique identifier for the detection
     * @type {string}
     * @memberof ScanDetectionV31
     */
    detectionId: string;
    /**
     * unique identifier for the rule that sourced the detection
     * @type {string}
     * @memberof ScanDetectionV31
     */
    ruleId: string;
    /**
     * detection risk
     * @type {string}
     * @memberof ScanDetectionV31
     */
    risk?: ScanDetectionV31RiskEnum;
    /**
     * Vulnerability category for the detection
     * @type {string}
     * @memberof ScanDetectionV31
     */
    category: string;
    /**
     * detection description
     * @type {string}
     * @memberof ScanDetectionV31
     */
    description: string;
    /**
     * detection likelihood
     * @type {string}
     * @memberof ScanDetectionV31
     */
    likelihood: string;
    /**
     * detection impact
     * @type {string}
     * @memberof ScanDetectionV31
     */
    impact: string;
    /**
     * detection severity
     * @type {string}
     * @memberof ScanDetectionV31
     */
    severity: ScanDetectionV31SeverityEnum;
    /**
     * 
     * @type {Array<RuleDetailsInner>}
     * @memberof ScanDetectionV31
     */
    ruleDetails?: Array<RuleDetailsInner>;
    /**
     * 
     * @type {Array<MITREAtlasInner>}
     * @memberof ScanDetectionV31
     */
    mitreAtlas: Array<MITREAtlasInner>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ScanDetectionV31
     */
    owasp: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ScanDetectionV31
     */
    cve: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ScanDetectionV31
     */
    cwe: string;
    /**
     * CWE URL for the detection
     * @type {string}
     * @memberof ScanDetectionV31
     */
    cweHref: string;
    /**
     * Hiddenlayer Technical Blog URLs for the detection
     * @type {Array<string>}
     * @memberof ScanDetectionV31
     */
    technicalBlogHrefs?: Array<string>;
    /**
     * Hiddenlayer Technical Blog URL for the detection
     * @type {string}
     * @memberof ScanDetectionV31
     * @deprecated
     */
    technicalBlogHref?: string;
}


/**
 * @export
 */
export const ScanDetectionV31RiskEnum = {
    Malicious: 'MALICIOUS',
    Suspicious: 'SUSPICIOUS',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type ScanDetectionV31RiskEnum = typeof ScanDetectionV31RiskEnum[keyof typeof ScanDetectionV31RiskEnum];

/**
 * @export
 */
export const ScanDetectionV31SeverityEnum = {
    Low: 'low',
    Medium: 'medium',
    High: 'high',
    Critical: 'critical',
    UnknownDefaultOpenApi: '11184809'
} as const;
export type ScanDetectionV31SeverityEnum = typeof ScanDetectionV31SeverityEnum[keyof typeof ScanDetectionV31SeverityEnum];


/**
 * Check if a given object implements the ScanDetectionV31 interface.
 */
export function instanceOfScanDetectionV31(value: object): value is ScanDetectionV31 {
    if (!('detectionId' in value) || value['detectionId'] === undefined) return false;
    if (!('ruleId' in value) || value['ruleId'] === undefined) return false;
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('likelihood' in value) || value['likelihood'] === undefined) return false;
    if (!('impact' in value) || value['impact'] === undefined) return false;
    if (!('severity' in value) || value['severity'] === undefined) return false;
    if (!('mitreAtlas' in value) || value['mitreAtlas'] === undefined) return false;
    if (!('owasp' in value) || value['owasp'] === undefined) return false;
    if (!('cve' in value) || value['cve'] === undefined) return false;
    if (!('cwe' in value) || value['cwe'] === undefined) return false;
    if (!('cweHref' in value) || value['cweHref'] === undefined) return false;
    return true;
}

export function ScanDetectionV31FromJSON(json: any): ScanDetectionV31 {
    return ScanDetectionV31FromJSONTyped(json, false);
}

export function ScanDetectionV31FromJSONTyped(json: any, ignoreDiscriminator: boolean): ScanDetectionV31 {
    if (json == null) {
        return json;
    }
    return {
        
        'detectionId': json['detection_id'],
        'ruleId': json['rule_id'],
        'risk': json['risk'] == null ? undefined : json['risk'],
        'category': json['category'],
        'description': json['description'],
        'likelihood': json['likelihood'],
        'impact': json['impact'],
        'severity': json['severity'],
        'ruleDetails': json['rule_details'] == null ? undefined : ((json['rule_details'] as Array<any>).map(RuleDetailsInnerFromJSON)),
        'mitreAtlas': ((json['mitre_atlas'] as Array<any>).map(MITREAtlasInnerFromJSON)),
        'owasp': json['owasp'],
        'cve': json['cve'],
        'cwe': json['cwe'],
        'cweHref': json['cwe_href'],
        'technicalBlogHrefs': json['technical_blog_hrefs'] == null ? undefined : json['technical_blog_hrefs'],
        'technicalBlogHref': json['technical_blog_href'] == null ? undefined : json['technical_blog_href'],
    };
}

export function ScanDetectionV31ToJSON(value?: ScanDetectionV31 | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'detection_id': value['detectionId'],
        'rule_id': value['ruleId'],
        'risk': value['risk'],
        'category': value['category'],
        'description': value['description'],
        'likelihood': value['likelihood'],
        'impact': value['impact'],
        'severity': value['severity'],
        'rule_details': value['ruleDetails'] == null ? undefined : ((value['ruleDetails'] as Array<any>).map(RuleDetailsInnerToJSON)),
        'mitre_atlas': ((value['mitreAtlas'] as Array<any>).map(MITREAtlasInnerToJSON)),
        'owasp': value['owasp'],
        'cve': value['cve'],
        'cwe': value['cwe'],
        'cwe_href': value['cweHref'],
        'technical_blog_hrefs': value['technicalBlogHrefs'],
        'technical_blog_href': value['technicalBlogHref'],
    };
}

