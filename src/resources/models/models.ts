// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V3API from './v3';
import { V3, V3ListCardsParams, V3ListCardsResponse } from './v3';

export class Models extends APIResource {
  v3: V3API.V3 = new V3API.V3(this._client);
}

Models.V3 = V3;

export declare namespace Models {
  export {
    V3 as V3,
    type V3ListCardsResponse as V3ListCardsResponse,
    type V3ListCardsParams as V3ListCardsParams,
  };
}
