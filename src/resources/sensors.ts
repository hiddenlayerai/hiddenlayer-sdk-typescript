// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sensors extends APIResource {
  /**
   * Create Sensor Record
   *
   * @example
   * ```ts
   * const sensor = await client.sensors.create({
   *   plaintext_name: 'plaintext_name',
   *   'X-Correlation-Id':
   *     '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  create(params: SensorCreateParams, options?: RequestOptions): APIPromise<SensorCreateResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...body } = params;
    return this._client.post('/api/v2/sensors/create', {
      body,
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }

  /**
   * Get Sensor
   *
   * @example
   * ```ts
   * const sensor = await client.sensors.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     'X-Correlation-Id':
   *       '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  retrieve(
    sensorID: string,
    params: SensorRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<SensorRetrieveResponse> {
    const { 'X-Correlation-Id': xCorrelationID } = params;
    return this._client.get(path`/api/v2/sensors/${sensorID}`, {
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }

  /**
   * Remove an Adhoc Sensor
   *
   * @example
   * ```ts
   * await client.sensors.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     'X-Correlation-Id':
   *       '00000000-0000-0000-0000-000000000000',
   *   },
   * );
   * ```
   */
  delete(sensorID: string, params: SensorDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { 'X-Correlation-Id': xCorrelationID } = params;
    return this._client.delete(path`/api/v2/sensors/${sensorID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*', 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }

  /**
   * Query Sensors
   *
   * @example
   * ```ts
   * const response = await client.sensors.query({
   *   'X-Correlation-Id':
   *     '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  query(params: SensorQueryParams, options?: RequestOptions): APIPromise<SensorQueryResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...body } = params;
    return this._client.post('/api/v2/sensors/query', {
      body,
      ...options,
      headers: buildHeaders([{ 'X-Correlation-Id': xCorrelationID }, options?.headers]),
    });
  }
}

export interface SensorCreateResponse {
  active: boolean;

  created_at: string;

  plaintext_name: string;

  sensor_id: string;

  tenant_id: string;

  version: number;

  adhoc?: boolean;

  tags?: { [key: string]: unknown };
}

export interface SensorRetrieveResponse {
  active: boolean;

  created_at: string;

  plaintext_name: string;

  sensor_id: string;

  tenant_id: string;

  version: number;

  adhoc?: boolean;

  tags?: { [key: string]: unknown };
}

export interface SensorQueryResponse {
  page_number: number;

  page_size: number;

  results: Array<SensorQueryResponse.Result>;

  total_count: number;
}

export namespace SensorQueryResponse {
  export interface Result {
    active: boolean;

    created_at: string;

    plaintext_name: string;

    sensor_id: string;

    tenant_id: string;

    version: number;

    adhoc?: boolean;

    tags?: { [key: string]: unknown };
  }
}

export interface SensorCreateParams {
  /**
   * Body param:
   */
  plaintext_name: string;

  /**
   * Header param: The unique identifier for the request.
   */
  'X-Correlation-Id': string;

  /**
   * Body param:
   */
  active?: boolean;

  /**
   * Body param:
   */
  adhoc?: boolean;

  /**
   * Body param:
   */
  tags?: { [key: string]: unknown };

  /**
   * Body param:
   */
  version?: number;
}

export interface SensorRetrieveParams {
  /**
   * The unique identifier for the request.
   */
  'X-Correlation-Id': string;
}

export interface SensorDeleteParams {
  /**
   * The unique identifier for the request.
   */
  'X-Correlation-Id': string;
}

export interface SensorQueryParams {
  /**
   * Header param: The unique identifier for the request.
   */
  'X-Correlation-Id': string;

  /**
   * Body param:
   */
  filter?: SensorQueryParams.Filter;

  /**
   * Body param:
   */
  order_by?: string;

  /**
   * Body param:
   */
  order_dir?: 'asc' | 'desc' | 'ASC' | 'DESC';

  /**
   * Body param:
   */
  page_number?: number;

  /**
   * Body param:
   */
  page_size?: number;
}

export namespace SensorQueryParams {
  export interface Filter {
    active?: boolean;

    created_at_start?: string;

    created_at_stop?: string;

    plaintext_name?: string;

    source?: 'adhoc';

    version?: number;
  }
}

export declare namespace Sensors {
  export {
    type SensorCreateResponse as SensorCreateResponse,
    type SensorRetrieveResponse as SensorRetrieveResponse,
    type SensorQueryResponse as SensorQueryResponse,
    type SensorCreateParams as SensorCreateParams,
    type SensorRetrieveParams as SensorRetrieveParams,
    type SensorDeleteParams as SensorDeleteParams,
    type SensorQueryParams as SensorQueryParams,
  };
}
