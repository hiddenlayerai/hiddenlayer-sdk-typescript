// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ModelsAPI from './models';
import { ModelRetrieveResponse, Models } from './models';
import * as SensorsAPI from './sensors';
import { Sensor, SensorCreateParams, SensorQueryParams, SensorQueryResponse, Sensors } from './sensors';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class V2 extends APIResource {
  sensors: SensorsAPI.Sensors = new SensorsAPI.Sensors(this._client);
  models: ModelsAPI.Models = new ModelsAPI.Models(this._client);

  /**
   * Submit vectors
   */
  submitVectors(body: V2SubmitVectorsParams, options?: RequestOptions): APIPromise<V2SubmitVectorsResponse> {
    return this._client.post('/api/v2/submit', { body, ...options });
  }
}

export interface V2SubmitVectorsResponse {
  event_time: string;

  group_id: string;

  requester_id: string;

  sensor_id: string;

  tenant_id: string;
}

export interface V2SubmitVectorsParams {
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

V2.Sensors = Sensors;
V2.Models = Models;

export declare namespace V2 {
  export {
    type V2SubmitVectorsResponse as V2SubmitVectorsResponse,
    type V2SubmitVectorsParams as V2SubmitVectorsParams,
  };

  export {
    Sensors as Sensors,
    type Sensor as Sensor,
    type SensorQueryResponse as SensorQueryResponse,
    type SensorCreateParams as SensorCreateParams,
    type SensorQueryParams as SensorQueryParams,
  };

  export { Models as Models, type ModelRetrieveResponse as ModelRetrieveResponse };
}
