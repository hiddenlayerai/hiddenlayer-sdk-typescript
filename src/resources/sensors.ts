// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sensors extends APIResource {
  /**
   * Create Sensor Record
   */
  create(body: SensorCreateParams, options?: RequestOptions): APIPromise<SensorCreateResponse> {
    return this._client.post('/api/v2/sensors/create', { body, ...options });
  }

  /**
   * Get Sensor
   */
  retrieve(sensorID: string, options?: RequestOptions): APIPromise<SensorRetrieveResponse> {
    return this._client.get(path`/api/v2/sensors/${sensorID}`, options);
  }

  /**
   * Update Sensor
   */
  update(
    sensorID: string,
    body: SensorUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SensorUpdateResponse> {
    return this._client.put(path`/api/v2/sensors/${sensorID}`, { body, ...options });
  }

  /**
   * Remove an Adhoc Sensor
   */
  delete(sensorID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v2/sensors/${sensorID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Query Sensors
   */
  query(
    body: SensorQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SensorQueryResponse> {
    return this._client.post('/api/v2/sensors/query', { body, ...options });
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
  plaintext_name: string;

  active?: boolean;

  adhoc?: boolean;

  tags?: { [key: string]: unknown };

  version?: number;
}

export interface SensorUpdateParams {
  active?: boolean;

  plaintext_name?: string;

  tags?: { [key: string]: unknown };
}

export interface SensorQueryParams {
  filter?: SensorQueryParams.Filter;

  order_by?: string;

  order_dir?: 'asc' | 'desc';

  page_number?: number;

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
    type SensorUpdateResponse as SensorUpdateResponse,
    type SensorQueryResponse as SensorQueryResponse,
    type SensorCreateParams as SensorCreateParams,
    type SensorUpdateParams as SensorUpdateParams,
    type SensorQueryParams as SensorQueryParams,
  };
}
