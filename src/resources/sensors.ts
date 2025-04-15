// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sensors extends APIResource {
  /**
   * Create a Sensor
   */
  create(body: SensorCreateParams, options?: RequestOptions): APIPromise<Sensor> {
    return this._client.post('/api/v2/sensors/create', { body, ...options });
  }

  /**
   * Get Sensor
   */
  retrieve(sensorID: string, options?: RequestOptions): APIPromise<Sensor> {
    return this._client.get(path`/api/v2/sensors/${sensorID}`, options);
  }

  /**
   * Delete Sensor
   */
  delete(sensorID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v2/sensors/${sensorID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Query a Sensor
   */
  query(
    body: SensorQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SensorQueryResponse> {
    return this._client.post('/api/v2/sensors/query', { body, ...options });
  }
}

export interface Sensor {}

export interface SensorQueryResponse {
  page_number: number;

  page_size: number;

  results: Array<Sensor>;

  total_count: number;
}

export interface SensorCreateParams {
  plaintext_name: string;

  active?: boolean;

  adhoc?: boolean;

  tags?: Record<string, unknown>;

  version?: number;
}

export interface SensorQueryParams {
  filter?: SensorQueryParams.Filter;

  order_by?: string;

  order_dir?: 'asc' | 'desc' | 'ASC' | 'DESC';

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
    type Sensor as Sensor,
    type SensorQueryResponse as SensorQueryResponse,
    type SensorCreateParams as SensorCreateParams,
    type SensorQueryParams as SensorQueryParams,
  };
}
