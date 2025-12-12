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
   * });
   * ```
   */
  create(params: SensorCreateParams, options?: RequestOptions): APIPromise<SensorCreateResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...body } = params;
    return this._client.post('/api/v2/sensors/create', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get Sensor
   *
   * @example
   * ```ts
   * const sensor = await client.sensors.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(
    sensorID: string,
    params: SensorRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SensorRetrieveResponse> {
    const { 'X-Correlation-Id': xCorrelationID } = params ?? {};
    return this._client.get(path`/api/v2/sensors/${sensorID}`, {
      ...options,
      headers: buildHeaders([
        { ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update Sensor
   *
   * @example
   * ```ts
   * const sensor = await client.sensors.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  update(
    sensorID: string,
    params: SensorUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SensorUpdateResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...body } = params;
    return this._client.put(path`/api/v2/sensors/${sensorID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Remove an Adhoc Sensor
   *
   * @example
   * ```ts
   * await client.sensors.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(
    sensorID: string,
    params: SensorDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { 'X-Correlation-Id': xCorrelationID } = params ?? {};
    return this._client.delete(path`/api/v2/sensors/${sensorID}`, {
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Query Sensors
   *
   * @example
   * ```ts
   * const response = await client.sensors.query();
   * ```
   */
  query(
    params: SensorQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SensorQueryResponse> {
    const { 'X-Correlation-Id': xCorrelationID, ...body } = params ?? {};
    return this._client.post('/api/v2/sensors/query', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xCorrelationID != null ? { 'X-Correlation-Id': xCorrelationID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface SensorCreateResponse {
  active: boolean;

  created_at: string;

  model_id: string;

  plaintext_name: string;

  sensor_id: string;

  tags: { [key: string]: unknown };

  tenant_id: string;

  adhoc?: boolean;

  version?: number;
}

export interface SensorRetrieveResponse {
  active: boolean;

  created_at: string;

  model_id: string;

  plaintext_name: string;

  sensor_id: string;

  tags: { [key: string]: unknown };

  tenant_id: string;

  adhoc?: boolean;

  version?: number;
}

export interface SensorUpdateResponse {
  detail: string;
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

    model_id: string;

    plaintext_name: string;

    sensor_id: string;

    tags: { [key: string]: unknown };

    tenant_id: string;

    adhoc?: boolean;

    version?: number;
  }
}

export interface SensorCreateParams {
  /**
   * Body param:
   */
  plaintext_name: string;

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

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export interface SensorRetrieveParams {
  /**
   * An ID that will be included with associated logs and downstream HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export interface SensorUpdateParams {
  /**
   * Body param:
   */
  active?: boolean;

  /**
   * Body param:
   */
  plaintext_name?: string;

  /**
   * Body param:
   */
  tags?: { [key: string]: unknown };

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export interface SensorDeleteParams {
  /**
   * An ID that will be included with associated logs and downstream HTTP requests.
   */
  'X-Correlation-Id'?: string;
}

export interface SensorQueryParams {
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
  order_dir?: 'asc' | 'desc';

  /**
   * Body param:
   */
  page_number?: number;

  /**
   * Body param:
   */
  page_size?: number;

  /**
   * Header param: An ID that will be included with associated logs and downstream
   * HTTP requests.
   */
  'X-Correlation-Id'?: string;
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
    type SensorUpdateResponse as SensorUpdateResponse,
    type SensorQueryResponse as SensorQueryResponse,
    type SensorCreateParams as SensorCreateParams,
    type SensorRetrieveParams as SensorRetrieveParams,
    type SensorUpdateParams as SensorUpdateParams,
    type SensorDeleteParams as SensorDeleteParams,
    type SensorQueryParams as SensorQueryParams,
  };
}
