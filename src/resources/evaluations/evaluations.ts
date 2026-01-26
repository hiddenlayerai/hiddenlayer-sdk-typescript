// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RedTeamAPI from './red-team';
import {
  RedTeam,
  RedTeamCreateParams,
  RedTeamCreateResponse,
  RedTeamRetrieveNextActionResponse,
  RedTeamRetrieveStatusResponse,
  RedTeamSubmitTargetResponseParams,
  RedTeamSubmitTargetResponseResponse,
  RedTeamTerminateResponse,
} from './red-team';

export class Evaluations extends APIResource {
  redTeam: RedTeamAPI.RedTeam = new RedTeamAPI.RedTeam(this._client);
}

Evaluations.RedTeam = RedTeam;

export declare namespace Evaluations {
  export {
    RedTeam as RedTeam,
    type RedTeamCreateResponse as RedTeamCreateResponse,
    type RedTeamRetrieveNextActionResponse as RedTeamRetrieveNextActionResponse,
    type RedTeamRetrieveStatusResponse as RedTeamRetrieveStatusResponse,
    type RedTeamSubmitTargetResponseResponse as RedTeamSubmitTargetResponseResponse,
    type RedTeamTerminateResponse as RedTeamTerminateResponse,
    type RedTeamCreateParams as RedTeamCreateParams,
    type RedTeamSubmitTargetResponseParams as RedTeamSubmitTargetResponseParams,
  };
}
