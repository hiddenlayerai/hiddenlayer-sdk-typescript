// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Runtime extends APIResource {
  /**
   * Performs synchronous security evaluation on an LLM **interaction**. The
   * interaction can be a standalone user prompt, a standalone model response, a
   * partial exchange, or a long multi-turn message history. The endpoint imposes no
   * requirement that the messages form a complete request/response pair.
   *
   * The request carries `metadata` and an `interaction` payload. The `interaction`
   * field accepts either:
   *
   * - the **canonical**, provider-agnostic form (`CanonicalInteraction`) — an
   *   ordered sequence of messages (user, assistant, system, tool) with their role
   *   and content parts, and optionally the tool catalog that was in scope; or
   * - a **native LLM-provider payload** passed through verbatim. Supported provider
   *   formats:
   *   - [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat)
   *   - [OpenAI Responses](https://platform.openai.com/docs/api-reference/responses)
   *   - [Anthropic Messages](https://docs.anthropic.com/en/api/messages)
   *
   * Returns the evaluation context (`evaluated_interaction`): the canonicalized
   * messages with per-message signals and findings attached. Also returns the policy
   * outcome, which carries the enforcement action, threat level, any detections, and
   * the effective payload the caller should forward
   * (`outcome.effective_interaction`).
   *
   * Use this endpoint when you need full evaluation results. For inline pass-through
   * (provider request/response payloads returned in the same provider format), use
   * the request-evaluations and response-evaluations endpoints instead.
   *
   * @example
   * ```ts
   * const response = await client.runtime.evaluateInteraction({
   *   interaction: {
   *     messages: [
   *       { ... },
   *       { ... },
   *     ],
   *   },
   *   metadata: {
   *     model: 'gpt-4-turbo',
   *     requester_id: 'user-12345',
   *     provider: 'openai',
   *     external_session_id: 'sess_4b8cde94604f4c389406a0b2f806069a',
   *   },
   * });
   * ```
   */
  evaluateInteraction(
    params: RuntimeEvaluateInteractionParams,
    options?: RequestOptions,
  ): APIPromise<RuntimeEvaluateInteractionResponse> {
    const { 'HL-Project-Id': hlProjectID, ...body } = params;
    return this._client.post('/detection/v2/interaction-evaluations', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(hlProjectID != null ? { 'HL-Project-Id': hlProjectID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
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
   * const response = await client.runtime.evaluateRequest({
   *   body: {
   *     model: 'bar',
   *     messages: 'bar',
   *     max_tokens: 'bar',
   *     temperature: 'bar',
   *   },
   * });
   * ```
   */
  evaluateRequest(
    params: RuntimeEvaluateRequestParams,
    options?: RequestOptions,
  ): APIPromise<RuntimeEvaluateRequestResponse> {
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
   * const response = await client.runtime.evaluateResponse({
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
  evaluateResponse(
    params: RuntimeEvaluateResponseParams,
    options?: RequestOptions,
  ): APIPromise<RuntimeEvaluateResponseResponse> {
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
 * Response payload from synchronous evaluation of an LLM interaction. Contains
 * metadata about the call, the evaluation context (`evaluated_interaction`) that
 * detection rules ran against, and the policy outcome — which carries the
 * enforcement action, threat level, detections, and the effective payload the
 * caller should forward (`outcome.effective_interaction`).
 *
 * `evaluated_interaction` is always the canonicalized form of the request,
 * enriched per-message with signals and findings from signal extraction — a
 * uniform shape that detection rules target regardless of which form the request
 * supplied. `outcome.effective_interaction` mirrors the shape of the request's
 * `interaction` field — canonical or provider-native — with any redactions,
 * substitutions, or tool modifications from the outcome's action applied in place.
 */
export interface RuntimeEvaluateInteractionResponse {
  /**
   * The canonicalized interaction as seen by the evaluator — messages and tool
   * catalog — annotated per-message with signals and their findings. Used for
   * `evaluated_interaction` regardless of which form the request supplied: when the
   * request used a native provider payload, the evaluator canonicalizes it into this
   * shape so detection rules can target a uniform structure.
   */
  evaluated_interaction: RuntimeEvaluateInteractionResponse.EvaluatedInteraction;

  /**
   * Metadata about the completed evaluation of the interactions.
   */
  metadata: RuntimeEvaluateInteractionResponse.Metadata;

  /**
   * The policy outcome for the evaluated interactions. Carries the enforcement
   * action, threat level, any detections produced by detection rules against
   * `evaluated_interaction`, and the effective payload the caller should forward.
   */
  outcome: RuntimeEvaluateInteractionResponse.Outcome;
}

export namespace RuntimeEvaluateInteractionResponse {
  /**
   * The canonicalized interaction as seen by the evaluator — messages and tool
   * catalog — annotated per-message with signals and their findings. Used for
   * `evaluated_interaction` regardless of which form the request supplied: when the
   * request used a native provider payload, the evaluator canonicalizes it into this
   * shape so detection rules can target a uniform structure.
   */
  export interface EvaluatedInteraction {
    /**
     * Ordered sequence of canonicalized messages. Each message is annotated with the
     * signals that fired against it (and findings produced by those signals).
     */
    messages: Array<EvaluatedInteraction.Message>;

    /**
     * The canonicalized tool catalog that was in scope during evaluation. Present only
     * when tools were provided in the request.
     */
    tools_available?: Array<EvaluatedInteraction.ToolsAvailable>;
  }

  export namespace EvaluatedInteraction {
    /**
     * Base schema for a conversation message in normalized/canonical form. Represents
     * the unified representation of messages across different LLM providers.
     */
    export interface Message {
      /**
       * Array of content parts representing the message content. Each part has a `type`
       * field indicating the content type.
       */
      content: Array<Message.TextPart | Message.ToolUsePart | Message.ToolResultPart>;

      /**
       * The role of the message sender. Standard roles include:
       *
       * - `user`: End-user input
       * - `assistant`: LLM/agent response
       * - `system`: System instructions or context
       * - `tool`: Tool result message
       */
      role: string;

      /**
       * Per-message security analysis from signal extraction. `signals` mirrors the
       * production-signals dictionary fed into the policy evaluation context — each key
       * is a signal name (e.g., `prompt_injection`, `code`), each value is the opaque
       * finding object that signal produced.
       */
      analysis?: Message.Analysis;

      /**
       * Optional timestamp for when this message was created. When supplied, `value` is
       * required.
       */
      timestamp?: Message.Timestamp;
    }

    export namespace Message {
      /**
       * A text content part within a message.
       */
      export interface TextPart {
        /**
         * The text content.
         */
        text: string;

        /**
         * Content part type for text.
         */
        type: 'text';
      }

      /**
       * A tool invocation part representing a tool call by the assistant.
       */
      export interface ToolUsePart {
        /**
         * Tool call identifier. Used to correlate tool invocations with their results.
         */
        id: string;

        /**
         * Name of the tool being invoked.
         */
        tool_name: string;

        /**
         * Content part type for tool invocation.
         */
        type: 'tool_use';

        /**
         * Tool arguments/input as a key-value object.
         */
        tool_input?: { [key: string]: unknown };
      }

      /**
       * A tool result part containing the output from a tool execution.
       */
      export interface ToolResultPart {
        /**
         * Tool call identifier. Used to correlate this result with the original tool
         * invocation.
         */
        id: string;

        /**
         * The tool execution result content.
         */
        result: string;

        /**
         * Content part type for tool result.
         */
        type: 'tool_result';

        /**
         * Whether the tool execution succeeded.
         */
        success?: boolean;
      }

      /**
       * Per-message security analysis from signal extraction. `signals` mirrors the
       * production-signals dictionary fed into the policy evaluation context — each key
       * is a signal name (e.g., `prompt_injection`, `code`), each value is the opaque
       * finding object that signal produced.
       */
      export interface Analysis {
        /**
         * Production signal findings for this message, keyed by signal name. All known
         * production signal types are always present (populated with schema defaults when
         * nothing fired). Values are opaque finding objects whose internal shape may
         * evolve.
         */
        signals: { [key: string]: { [key: string]: unknown } };
      }

      /**
       * Optional timestamp for when this message was created. When supplied, `value` is
       * required.
       */
      export interface Timestamp {
        /**
         * The timestamp in ISO 8601 / RFC 3339 format.
         */
        value: string;
      }
    }

    /**
     * Base schema for a tool definition available to the model. Represents the
     * canonical form of tool definitions across different LLM providers.
     */
    export interface ToolsAvailable {
      /**
       * Name of the tool.
       */
      name: string;

      /**
       * Human-readable description of what the tool does.
       */
      description?: string;

      /**
       * JSON Schema defining the tool's input parameters. Stored as a flexible object to
       * support various schema formats.
       */
      parameters?: { [key: string]: unknown };
    }
  }

  /**
   * Metadata about the completed evaluation of the interactions.
   */
  export interface Metadata {
    /**
     * Timestamp when the evaluation was performed.
     */
    evaluated_at: string;

    /**
     * Server-generated unique identifier for this evaluation. Persisted on the stored
     * interaction record and referenced in structured logs for correlation.
     */
    evaluation_id: string;

    /**
     * The model identifier from the request.
     */
    model: string;

    /**
     * Total time taken to perform the evaluation, in milliseconds.
     */
    processing_time_ms: number;

    /**
     * Project context resolved for this evaluation.
     */
    project: Metadata.Project;

    /**
     * The LLM provider from the request.
     */
    provider: string;

    /**
     * The requester identifier from the request.
     */
    requester_id: string;
  }

  export namespace Metadata {
    /**
     * Project context resolved for this evaluation.
     */
    export interface Project {
      /**
       * The unique identifier for the Configuration used during evaluation.
       */
      configuration_id: string;

      /**
       * The unique identifier for the Policy applied to this interaction.
       */
      policy_id: string;

      /**
       * The unique identifier for the Project.
       */
      project_id: string;

      /**
       * A custom alias for the Project.
       */
      project_alias?: string;
    }
  }

  /**
   * The policy outcome for the evaluated interactions. Carries the enforcement
   * action, threat level, any detections produced by detection rules against
   * `evaluated_interaction`, and the effective payload the caller should forward.
   */
  export interface Outcome {
    /**
     * The action applied based on policy evaluation.
     *
     * `NONE` means policy evaluation produced no detections — either no rules fired or
     * no findings were emitted; the `detections` array is empty and the effective
     * payload is unchanged.
     *
     * `DETECT`, `REDACT`, and `BLOCK` all mean one or more detections were produced;
     * they differ in what the policy did with the payload. `DETECT` is an intentional
     * observe-only outcome (detections are surfaced but the effective payload is
     * unchanged); `REDACT` modifies the payload in place; `BLOCK` substitutes a canned
     * block response.
     */
    action: 'NONE' | 'DETECT' | 'REDACT' | 'BLOCK';

    /**
     * Security detections produced by detection rules running against the evaluation
     * context. Always present; an empty array means no rules triggered.
     */
    detections: Array<Outcome.Detection>;

    /**
     * The payload the caller should forward downstream. Mirrors the shape of the
     * request's `interaction` field: if the request supplied the canonical form
     * (`CanonicalInteraction`), the response returns the canonical form here; if the
     * request supplied a native LLM-provider payload (OpenAI Chat Completions, OpenAI
     * Responses, or Anthropic Messages), the response returns that same
     * provider-native shape. Any redactions, substitutions, or tool modifications from
     * the outcome's `action` are applied in place.
     */
    effective_interaction: Outcome.CanonicalInteraction | { [key: string]: unknown };

    /**
     * The highest threat level across all detections, based on interaction analysis
     * and configured tenant security rules. Values are ordered by severity from least
     * to most: NONE, LOW, MEDIUM, HIGH, CRITICAL.
     */
    threat_level: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  }

  export namespace Outcome {
    /**
     * A security detection from policy evaluation with risk assessment. Detections are
     * composite results produced by detection rules running against the evaluation
     * context (`evaluated_interaction`). Supporting evidence is not duplicated on the
     * detection itself — it is observable in `evaluated_interaction` via the signals
     * and findings that the rule matched.
     */
    export interface Detection {
      /**
       * Categorical risk level for this detection.
       */
      risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

      /**
       * The human-readable name of the detection rule (e.g., prompt_injection,
       * sensitive_pii_exposed).
       */
      rule_name: string;
    }

    /**
     * The canonical (provider-agnostic) form of an LLM interaction: an ordered
     * sequence of messages, optionally with the tool catalog that was in scope. Use
     * this form to evaluate interactions independently of any specific provider's
     * payload structure.
     */
    export interface CanonicalInteraction {
      /**
       * Ordered sequence of messages to evaluate, in chronological order. May contain
       * any combination of user input, assistant output, system prompts, and tool
       * calls/results — and may be a single message or many. There is no requirement
       * that the messages form a complete request/response pair.
       */
      messages: Array<CanonicalInteraction.Message>;

      /**
       * Tool definitions available to the model in the context of these messages.
       */
      tools_available?: Array<CanonicalInteraction.ToolsAvailable>;
    }

    export namespace CanonicalInteraction {
      /**
       * Base schema for a conversation message in normalized/canonical form. Represents
       * the unified representation of messages across different LLM providers.
       */
      export interface Message {
        /**
         * Array of content parts representing the message content. Each part has a `type`
         * field indicating the content type.
         */
        content: Array<Message.TextPart | Message.ToolUsePart | Message.ToolResultPart>;

        /**
         * The role of the message sender. Standard roles include:
         *
         * - `user`: End-user input
         * - `assistant`: LLM/agent response
         * - `system`: System instructions or context
         * - `tool`: Tool result message
         */
        role: string;

        /**
         * Optional timestamp for when this message was created. When supplied, `value` is
         * required.
         */
        timestamp?: Message.Timestamp;
      }

      export namespace Message {
        /**
         * A text content part within a message.
         */
        export interface TextPart {
          /**
           * The text content.
           */
          text: string;

          /**
           * Content part type for text.
           */
          type: 'text';
        }

        /**
         * A tool invocation part representing a tool call by the assistant.
         */
        export interface ToolUsePart {
          /**
           * Tool call identifier. Used to correlate tool invocations with their results.
           */
          id: string;

          /**
           * Name of the tool being invoked.
           */
          tool_name: string;

          /**
           * Content part type for tool invocation.
           */
          type: 'tool_use';

          /**
           * Tool arguments/input as a key-value object.
           */
          tool_input?: { [key: string]: unknown };
        }

        /**
         * A tool result part containing the output from a tool execution.
         */
        export interface ToolResultPart {
          /**
           * Tool call identifier. Used to correlate this result with the original tool
           * invocation.
           */
          id: string;

          /**
           * The tool execution result content.
           */
          result: string;

          /**
           * Content part type for tool result.
           */
          type: 'tool_result';

          /**
           * Whether the tool execution succeeded.
           */
          success?: boolean;
        }

        /**
         * Optional timestamp for when this message was created. When supplied, `value` is
         * required.
         */
        export interface Timestamp {
          /**
           * The timestamp in ISO 8601 / RFC 3339 format.
           */
          value: string;
        }
      }

      /**
       * Base schema for a tool definition available to the model. Represents the
       * canonical form of tool definitions across different LLM providers.
       */
      export interface ToolsAvailable {
        /**
         * Name of the tool.
         */
        name: string;

        /**
         * Human-readable description of what the tool does.
         */
        description?: string;

        /**
         * JSON Schema defining the tool's input parameters. Stored as a flexible object to
         * support various schema formats.
         */
        parameters?: { [key: string]: unknown };
      }
    }
  }
}

/**
 * A pass-through payload in the native format of the LLM provider. Any valid
 * provider request or response payload is accepted as-is and returned in the same
 * format.
 */
export type RuntimeEvaluateRequestResponse = { [key: string]: unknown };

/**
 * A pass-through payload in the native format of the LLM provider. Any valid
 * provider request or response payload is accepted as-is and returned in the same
 * format.
 */
export type RuntimeEvaluateResponseResponse = { [key: string]: unknown };

export interface RuntimeEvaluateInteractionParams {
  /**
   * Body param: The interaction to evaluate. Accepts either the canonical form
   * (`CanonicalInteraction` — `messages` and optional `tools_available`) or a native
   * LLM-provider payload passed through verbatim. Supported provider formats are
   * OpenAI Chat Completions, OpenAI Responses, and Anthropic Messages.
   * `ProviderPayload` is intentionally permissive (any JSON object) so callers can
   * supply provider-native shapes without schema constraints.
   */
  interaction: RuntimeEvaluateInteractionParams.CanonicalInteraction | { [key: string]: unknown };

  /**
   * Body param: Metadata about the LLM interactions being evaluated.
   */
  metadata: RuntimeEvaluateInteractionParams.Metadata;

  /**
   * Header param: The ID or alias for the Project to govern the request processing.
   */
  'HL-Project-Id'?: string;
}

export namespace RuntimeEvaluateInteractionParams {
  /**
   * The canonical (provider-agnostic) form of an LLM interaction: an ordered
   * sequence of messages, optionally with the tool catalog that was in scope. Use
   * this form to evaluate interactions independently of any specific provider's
   * payload structure.
   */
  export interface CanonicalInteraction {
    /**
     * Ordered sequence of messages to evaluate, in chronological order. May contain
     * any combination of user input, assistant output, system prompts, and tool
     * calls/results — and may be a single message or many. There is no requirement
     * that the messages form a complete request/response pair.
     */
    messages: Array<CanonicalInteraction.Message>;

    /**
     * Tool definitions available to the model in the context of these messages.
     */
    tools_available?: Array<CanonicalInteraction.ToolsAvailable>;
  }

  export namespace CanonicalInteraction {
    /**
     * Base schema for a conversation message in normalized/canonical form. Represents
     * the unified representation of messages across different LLM providers.
     */
    export interface Message {
      /**
       * Array of content parts representing the message content. Each part has a `type`
       * field indicating the content type.
       */
      content: Array<Message.TextPart | Message.ToolUsePart | Message.ToolResultPart>;

      /**
       * The role of the message sender. Standard roles include:
       *
       * - `user`: End-user input
       * - `assistant`: LLM/agent response
       * - `system`: System instructions or context
       * - `tool`: Tool result message
       */
      role: string;

      /**
       * Optional timestamp for when this message was created. When supplied, `value` is
       * required.
       */
      timestamp?: Message.Timestamp;
    }

    export namespace Message {
      /**
       * A text content part within a message.
       */
      export interface TextPart {
        /**
         * The text content.
         */
        text: string;

        /**
         * Content part type for text.
         */
        type: 'text';
      }

      /**
       * A tool invocation part representing a tool call by the assistant.
       */
      export interface ToolUsePart {
        /**
         * Tool call identifier. Used to correlate tool invocations with their results.
         */
        id: string;

        /**
         * Name of the tool being invoked.
         */
        tool_name: string;

        /**
         * Content part type for tool invocation.
         */
        type: 'tool_use';

        /**
         * Tool arguments/input as a key-value object.
         */
        tool_input?: { [key: string]: unknown };
      }

      /**
       * A tool result part containing the output from a tool execution.
       */
      export interface ToolResultPart {
        /**
         * Tool call identifier. Used to correlate this result with the original tool
         * invocation.
         */
        id: string;

        /**
         * The tool execution result content.
         */
        result: string;

        /**
         * Content part type for tool result.
         */
        type: 'tool_result';

        /**
         * Whether the tool execution succeeded.
         */
        success?: boolean;
      }

      /**
       * Optional timestamp for when this message was created. When supplied, `value` is
       * required.
       */
      export interface Timestamp {
        /**
         * The timestamp in ISO 8601 / RFC 3339 format.
         */
        value: string;
      }
    }

    /**
     * Base schema for a tool definition available to the model. Represents the
     * canonical form of tool definitions across different LLM providers.
     */
    export interface ToolsAvailable {
      /**
       * Name of the tool.
       */
      name: string;

      /**
       * Human-readable description of what the tool does.
       */
      description?: string;

      /**
       * JSON Schema defining the tool's input parameters. Stored as a flexible object to
       * support various schema formats.
       */
      parameters?: { [key: string]: unknown };
    }
  }

  /**
   * Metadata about the LLM interactions being evaluated.
   */
  export interface Metadata {
    /**
     * The model identifier used for the interaction.
     */
    model: string;

    /**
     * The LLM provider (e.g., openai, anthropic, azure, bedrock).
     */
    provider: string;

    /**
     * Identifier for the entity making the request. Could be a user ID, service
     * account, or agent identifier.
     */
    requester_id: string;

    /**
     * An externally-defined session identifier to group interactions into a single
     * session. The identifier should be unique across all sessions.
     */
    external_session_id?: string;

    /**
     * External session identifiers with the system that supplied them. Each entry is
     * attached to the stored interaction as a session alias, in addition to
     * `external_session_id` when both are supplied.
     */
    external_session_ids?: Array<Metadata.ExternalSessionID>;
  }

  export namespace Metadata {
    /**
     * An external session identifier with optional source.
     */
    export interface ExternalSessionID {
      /**
       * The external session identifier value.
       */
      id: string;

      /**
       * The system or client that supplied this identifier.
       */
      source?: string;
    }
  }
}

export interface RuntimeEvaluateRequestParams {
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

export interface RuntimeEvaluateResponseParams {
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

export declare namespace Runtime {
  export {
    type RuntimeEvaluateInteractionResponse as RuntimeEvaluateInteractionResponse,
    type RuntimeEvaluateRequestResponse as RuntimeEvaluateRequestResponse,
    type RuntimeEvaluateResponseResponse as RuntimeEvaluateResponseResponse,
    type RuntimeEvaluateInteractionParams as RuntimeEvaluateInteractionParams,
    type RuntimeEvaluateRequestParams as RuntimeEvaluateRequestParams,
    type RuntimeEvaluateResponseParams as RuntimeEvaluateResponseParams,
  };
}
