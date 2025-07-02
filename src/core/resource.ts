// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { HiddenLayer } from '../client';

export abstract class APIResource {
  protected _client: HiddenLayer;

  constructor(client: HiddenLayer) {
    this._client = client;
  }
}
