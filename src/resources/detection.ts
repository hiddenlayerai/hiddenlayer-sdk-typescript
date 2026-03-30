// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Detection extends APIResource {
  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Analyzes an LLM request payload for security threats before it is sent to the
   * model.
   *
   * Accepts any valid provider request payload and returns:
   *
   * - If detect or redact action: the request payload (potentially modified) in the
   *   provider's request format
   * - If block action: a canned block message in the provider's response format
   *
   * Use this endpoint inline in your LLM pipeline to evaluate prompts before they
   * reach the model.
   *
   * Supported provider formats:
   *
   * - [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat)
   * - [OpenAI Responses](https://platform.openai.com/docs/api-reference/responses)
   * - [Anthropic Messages](https://docs.anthropic.com/en/api/messages)
   *
   * @example
   * ```ts
   * const response = await client.detection.requestEvaluation({
   *   body: {
   *     model: 'bar',
   *     messages: 'bar',
   *     max_tokens: 'bar',
   *     temperature: 'bar',
   *   },
   * });
   * ```
   */
  requestEvaluation(
    params: DetectionRequestEvaluationParams,
    options?: RequestOptions,
  ): APIPromise<DetectionRequestEvaluationResponse> {
    const { body, 'HL-Project-Id': hlProjectID, 'HL-Runtime-Session-Id': hlRuntimeSessionID } = params;
    return this._client.post('/detection/v2/request-evaluations', {
      body: body,
      ...options,
      headers: buildHeaders([
        {
          ...(hlProjectID != null ? { 'HL-Project-Id': hlProjectID } : undefined),
          ...(hlRuntimeSessionID != null ? { 'HL-Runtime-Session-Id': hlRuntimeSessionID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * [BETA] This endpoint is not GA or Production ready and is subject to changes at
   * any time. Breaking changes may occur.
   *
   * Analyzes an LLM response payload for security threats after it is received from
   * the model.
   *
   * Accepts any valid provider response payload and returns:
   *
   * - If detect or redact action: the response payload (potentially modified) in the
   *   provider's response format
   * - If block action: a canned block message in the provider's response format
   *
   * Use this endpoint inline in your LLM pipeline to evaluate model outputs before
   * returning them to users.
   *
   * Supported provider formats:
   *
   * - [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat)
   * - [OpenAI Responses](https://platform.openai.com/docs/api-reference/responses)
   * - [Anthropic Messages](https://docs.anthropic.com/en/api/messages)
   *
   * @example
   * ```ts
   * const response = await client.detection.responseEvaluation({
   *   body: {
   *     id: 'bar',
   *     object: 'bar',
   *     created: 'bar',
   *     model: 'bar',
   *     choices: 'bar',
   *     usage: 'bar',
   *   },
   * });
   * ```
   */
  responseEvaluation(
    params: DetectionResponseEvaluationParams,
    options?: RequestOptions,
  ): APIPromise<DetectionResponseEvaluationResponse> {
    const { body, 'HL-Project-Id': hlProjectID, 'HL-Runtime-Session-Id': hlRuntimeSessionID } = params;
    return this._client.post('/detection/v2/response-evaluations', {
      body: body,
      ...options,
      headers: buildHeaders([
        {
          ...(hlProjectID != null ? { 'HL-Project-Id': hlProjectID } : undefined),
          ...(hlRuntimeSessionID != null ? { 'HL-Runtime-Session-Id': hlRuntimeSessionID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

/**
 * A pass-through payload in the native format of the LLM provider. Any valid
 * provider request or response payload is accepted as-is and returned in the same
 * format.
 */
export type DetectionRequestEvaluationResponse = { [key: string]: unknown };

/**
 * A pass-through payload in the native format of the LLM provider. Any valid
 * provider request or response payload is accepted as-is and returned in the same
 * format.
 */
export type DetectionResponseEvaluationResponse = { [key: string]: unknown };

export interface DetectionRequestEvaluationParams {
  /**
   * Body param: A pass-through payload in the native format of the LLM provider. Any
   * valid provider request or response payload is accepted as-is and returned in the
   * same format.
   */
  body: { [key: string]: unknown };

  /**
   * Header param: The ID or alias for the Project to govern the request processing.
   */
  'HL-Project-Id'?: string;

  /**
   * Header param: An externally-defined session identifier to group interactions in
   * separate requests into a single session. The identifier should be unique across
   * the all sessions.
   */
  'HL-Runtime-Session-Id'?: string;
}

export interface DetectionResponseEvaluationParams {
  /**
   * Body param: A pass-through payload in the native format of the LLM provider. Any
   * valid provider request or response payload is accepted as-is and returned in the
   * same format.
   */
  body: { [key: string]: unknown };

  /**
   * Header param: The ID or alias for the Project to govern the request processing.
   */
  'HL-Project-Id'?: string;

  /**
   * Header param: An externally-defined session identifier to group interactions in
   * separate requests into a single session. The identifier should be unique across
   * the all sessions.
   */
  'HL-Runtime-Session-Id'?: string;
}

export declare namespace Detection {
  export {
    type DetectionRequestEvaluationResponse as DetectionRequestEvaluationResponse,
    type DetectionResponseEvaluationResponse as DetectionResponseEvaluationResponse,
    type DetectionRequestEvaluationParams as DetectionRequestEvaluationParams,
    type DetectionResponseEvaluationParams as DetectionResponseEvaluationParams,
  };
}
