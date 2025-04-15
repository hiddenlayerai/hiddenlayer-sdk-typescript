// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Vectors extends APIResource {
  /**
   * Submit vectors
   */
  submitVectors(
    body: VectorSubmitVectorsParams,
    options?: RequestOptions,
  ): APIPromise<VectorSubmitVectorsResponse> {
    return this._client.post('/api/v2/submit', { body, ...options });
  }
}

export interface VectorSubmitVectorsResponse {
  event_time: string;

  group_id: string;

  requester_id: string;

  sensor_id: string;

  tenant_id: string;
}

export interface VectorSubmitVectorsParams {
  input_layer: string;

  input_layer_dtype: string;

  input_layer_shape: Array<number>;

  output_layer: string;

  output_layer_dtype: string;

  output_layer_shape: Array<number>;

  sensor_id: string;

  event_time?: string;

  metadata?: unknown;

  predictions?: Array<number>;

  requester_id?: string;

  tags?: Array<string>;
}

export declare namespace Vectors {
  export {
    type VectorSubmitVectorsResponse as VectorSubmitVectorsResponse,
    type VectorSubmitVectorsParams as VectorSubmitVectorsParams,
  };
}
