// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class RedTeam extends APIResource {
  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Start a new red team client workflow. Auto-triggers planning phase. Client
   * should then poll /next-action.
   */
  create(body: RedTeamCreateParams, options?: RequestOptions): APIPromise<RedTeamCreateResponse> {
    return this._client.post('/evaluations/v1/red-team', { body, ...options });
  }

  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Get the complete result of a red team workflow.
   */
  retrieveEvaluationResults(
    workflowID: string,
    options?: RequestOptions,
  ): APIPromise<RedTeamRetrieveEvaluationResultsResponse> {
    return this._client.get(path`/evaluations/v1/red-team/${workflowID}`, options);
  }

  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Poll for next action - CLIENT'S MAIN POLLING ENDPOINT.
   *
   * This endpoint is designed to be polled repeatedly by the client. Returns
   * immediately with current state:
   *
   * - If attack ready: Returns attack_task with prompt
   * - If processing: Returns processing=true (client continues polling)
   * - If complete: Returns action_type=complete
   */
  retrieveNextAction(
    workflowID: string,
    options?: RequestOptions,
  ): APIPromise<RedTeamRetrieveNextActionResponse> {
    return this._client.get(path`/evaluations/v1/red-team/${workflowID}/next-action`, options);
  }

  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Get current status of a red team workflow.
   */
  retrieveStatus(workflowID: string, options?: RequestOptions): APIPromise<RedTeamRetrieveStatusResponse> {
    return this._client.get(path`/evaluations/v1/red-team/${workflowID}/status`, options);
  }

  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Submit target's response.
   *
   * This triggers the ProcessTargetResponseWorkflow child workflow for the specified
   * session. Returns immediately.
   */
  submitTargetResponse(
    workflowID: string,
    body: RedTeamSubmitTargetResponseParams,
    options?: RequestOptions,
  ): APIPromise<RedTeamSubmitTargetResponseResponse> {
    return this._client.post(path`/evaluations/v1/red-team/${workflowID}/target-response`, {
      body,
      ...options,
    });
  }

  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Terminate a running workflow job.
   */
  terminate(workflowID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/evaluations/v1/jobs/${workflowID}/termination`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Response from starting a workflow.
 */
export interface RedTeamCreateResponse {
  /**
   * Run identifier
   */
  run_id: string;

  /**
   * Workflow identifier
   */
  workflow_id: string;
}

/**
 * Complete result of a red team workflow.
 */
export interface RedTeamRetrieveEvaluationResultsResponse {
  /**
   * Full red team workflow result payload.
   */
  result: RedTeamRetrieveEvaluationResultsResponse.Result;

  /**
   * Run identifier
   */
  run_id: string;

  /**
   * Workflow identifier
   */
  workflow_id: string;

  /**
   * Workflow status (e.g., "completed")
   */
  status?: string;
}

export namespace RedTeamRetrieveEvaluationResultsResponse {
  /**
   * Full red team workflow result payload.
   */
  export interface Result {
    /**
     * Detailed attacker session results including prompts, responses, and judgements
     */
    attacker_results?: { [key: string]: unknown };

    /**
     * Final evaluation report text
     */
    evaluation_report?: string;

    /**
     * Workflow name
     */
    name?: string;

    /**
     * Structured evaluation report with metrics and analysis
     */
    report?: { [key: string]: unknown };

    /**
     * Workflow configuration settings used for this evaluation
     */
    settings?: { [key: string]: unknown };

    /**
     * Target context description
     */
    target_context?: string;

    /**
     * Token usage statistics across all models
     */
    usage?: { [key: string]: unknown };
  }
}

/**
 * Response from next-action polling endpoint.
 */
export interface RedTeamRetrieveNextActionResponse {
  /**
   * Whether an action is ready
   */
  is_ready: boolean;

  /**
   * Type of action (e.g., "attack", "complete")
   */
  action_type?: string;

  /**
   * Attack prompt to send to target
   */
  attack_prompt?: string;

  /**
   * Conversation history
   */
  history?: Array<{ [key: string]: unknown }>;

  /**
   * Whether processing is in progress
   */
  is_processing?: boolean;

  /**
   * Status message
   */
  message?: string;

  /**
   * Session identifier
   */
  session_id?: string;

  /**
   * Target's system prompt
   */
  target_system_prompt?: string;

  /**
   * Current turn number
   */
  turn?: number;
}

/**
 * Status of a red team workflow.
 */
export interface RedTeamRetrieveStatusResponse {
  /**
   * Workflow name
   */
  name: string;

  /**
   * Run identifier
   */
  run_id: string;

  /**
   * Workflow status
   */
  status: string;

  /**
   * Workflow identifier
   */
  workflow_id: string;

  /**
   * Number of active sessions
   */
  active_sessions?: number;

  /**
   * Number of completed sessions
   */
  completed_sessions?: number;

  /**
   * Elapsed time in seconds
   */
  elapsed_seconds?: number;

  /**
   * Error message if failed
   */
  error?: string;

  /**
   * Estimated time remaining in seconds
   */
  eta_seconds?: number;

  /**
   * Number of failed sessions
   */
  failed_sessions?: number;

  /**
   * Status message
   */
  message?: string;

  /**
   * Current workflow phase
   */
  phase?: string;

  /**
   * Completed progress items
   */
  progress_completed?: number;

  /**
   * Total progress items
   */
  progress_total?: number;

  /**
   * Number of prompts ready in queue
   */
  ready_prompts_in_queue?: number;

  /**
   * Tenant identifier
   */
  tenant_id?: string;

  /**
   * Total number of sessions
   */
  total_sessions?: number;
}

/**
 * Response from submitting a target response.
 */
export interface RedTeamSubmitTargetResponseResponse {
  /**
   * Whether the submission was successful
   */
  is_ok: boolean;

  /**
   * Human-readable status message
   */
  message: string;

  /**
   * Error code if ok=false
   */
  error?: string;
}

export interface RedTeamCreateParams {
  /**
   * Name for this evaluation
   */
  name: string;

  /**
   * Target model identifier
   */
  target_model: string;

  /**
   * Maximum generation attempts for attacker
   */
  attacker_max_generation_attempts?: number;

  /**
   * Model for attacker
   */
  attacker_model?: string;

  /**
   * Model for evaluation report
   */
  evaluation_report_model?: string;

  /**
   * Execution strategy type
   */
  execution_strategy_type?: string;

  /**
   * HiddenLayer project ID
   */
  hl_project_id?: string;

  /**
   * Maximum parallel techniques
   */
  max_parallel_techniques?: number;

  /**
   * Maximum conversation turns
   */
  max_turns?: number;

  /**
   * Number of random techniques to use
   */
  n_random_techniques?: number;

  /**
   * Objective IDs to evaluate
   */
  objective_ids?: Array<string>;

  /**
   * Model for objective judging
   */
  objective_judge_model?: string;

  /**
   * Prompt set ID for static prompt evaluation
   */
  prompt_set_id?: string;

  /**
   * Model for refusal judging
   */
  refusal_judge_model?: string;

  /**
   * Number of sessions per technique
   */
  sessions_per_technique?: number;

  /**
   * System prompt for the target
   */
  target_system_prompt?: string;
}

export interface RedTeamSubmitTargetResponseParams {
  /**
   * Session identifier
   */
  session_id: string;

  /**
   * Target's response text
   */
  target_response: string;
}

export declare namespace RedTeam {
  export {
    type RedTeamCreateResponse as RedTeamCreateResponse,
    type RedTeamRetrieveEvaluationResultsResponse as RedTeamRetrieveEvaluationResultsResponse,
    type RedTeamRetrieveNextActionResponse as RedTeamRetrieveNextActionResponse,
    type RedTeamRetrieveStatusResponse as RedTeamRetrieveStatusResponse,
    type RedTeamSubmitTargetResponseResponse as RedTeamSubmitTargetResponseResponse,
    type RedTeamCreateParams as RedTeamCreateParams,
    type RedTeamSubmitTargetResponseParams as RedTeamSubmitTargetResponseParams,
  };
}
