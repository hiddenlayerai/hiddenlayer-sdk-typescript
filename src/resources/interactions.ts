// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Interactions extends APIResource {
  /**
   * Performs a detailed security analysis of the input and/or output of LLM
   * interactions.
   *
   * @example
   * ```ts
   * const response = await client.interactions.analyze({
   *   metadata: { model: 'gpt-5', requester_id: 'user-1234' },
   * });
   * ```
   */
  analyze(
    params: InteractionAnalyzeParams,
    options?: RequestOptions,
  ): APIPromise<InteractionAnalyzeResponse> {
    const { 'HL-Project-Id': hlProjectID, ...body } = params;
    return this._client.post('/detection/v1/interactions', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(hlProjectID != null ? { 'HL-Project-Id': hlProjectID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface InteractionAnalyzeResponse {
  analysis: Array<InteractionAnalyzeResponse.Analysis>;

  /**
   * The language model input and/or output that was analyzed.
   */
  analyzed_data: InteractionAnalyzeResponse.AnalyzedData;

  metadata: InteractionAnalyzeResponse.Metadata;

  /**
   * The potentially modified language model input and output after applying any
   * redactions or modifications based on the analysis.
   */
  modified_data: InteractionAnalyzeResponse.ModifiedData;

  /**
   * The evaluation of the analysis results.
   */
  evaluation?: InteractionAnalyzeResponse.Evaluation;
}

export namespace InteractionAnalyzeResponse {
  export interface Analysis {
    /**
     * The unique identifier for the analyzer.
     */
    id: string;

    /**
     * The configuration settings used for the analyzer.
     */
    configuration: { [key: string]: unknown };

    /**
     * Indicates the analysis resulted in a detection.
     */
    detected: boolean;

    /**
     * The frameworks and associated findings for the analysis.
     */
    findings: Analysis.Findings;

    /**
     * The name of the analysis performed.
     */
    name: string;

    /**
     * The phase of the analysis (i.e. input or output).
     */
    phase: string;

    /**
     * The time taken to perform this specific analysis.
     */
    processing_time_ms: number;

    /**
     * The version of the analysis performed.
     */
    version: string;
  }

  export namespace Analysis {
    /**
     * The frameworks and associated findings for the analysis.
     */
    export interface Findings {
      /**
       * The taxonomies for the detections.
       */
      frameworks: { [key: string]: Array<Findings.Framework> };

      [k: string]: unknown;
    }

    export namespace Findings {
      export interface Framework {
        /**
         * Unique identifier for the framework taxonomy item.
         */
        label: string;

        /**
         * Name of the framework taxonomy item.
         */
        name: string;
      }
    }
  }

  /**
   * The language model input and/or output that was analyzed.
   */
  export interface AnalyzedData {
    input: AnalyzedData.Input;

    output?: AnalyzedData.Output;
  }

  export namespace AnalyzedData {
    export interface Input {
      /**
       * The list of messages as input to a language model.
       */
      messages?: Array<Input.Message>;

      [k: string]: unknown;
    }

    export namespace Input {
      export interface Message {
        /**
         * The textual content of the message.
         */
        content: string;

        /**
         * The role of the message sender (e.g., user, assistant, system).
         */
        role?: string;
      }
    }

    export interface Output {
      /**
       * The list of messages as output from a language model.
       */
      messages?: Array<Output.Message>;
    }

    export namespace Output {
      export interface Message {
        /**
         * The textual content of the message.
         */
        content: string;

        /**
         * The role of the message sender (e.g., user, assistant, system).
         */
        role?: string;
      }
    }
  }

  export interface Metadata {
    /**
     * The language model from the request.
     */
    model: string;

    /**
     * The total time taken to perform the analysis.
     */
    processing_time_ms: number;

    project: Metadata.Project;

    /**
     * The provider of the language model from the request.
     */
    provider: string;

    /**
     * The identifier for the entity from the request.
     */
    requester_id: string;

    /**
     * The timestamp when the analysis was performed.
     */
    analyzed_at?: string;

    /**
     * The unique identifier for the analysis event.
     */
    event_id?: string;
  }

  export namespace Metadata {
    export interface Project {
      /**
       * A custom alias for the Project.
       */
      project_alias?: string;

      /**
       * The unique identifier for the Project.
       */
      project_id?: string;

      /**
       * The unique identifier for the Ruleset associated with the Project.
       */
      ruleset_id?: string;
    }
  }

  /**
   * The potentially modified language model input and output after applying any
   * redactions or modifications based on the analysis.
   */
  export interface ModifiedData {
    input: ModifiedData.Input;

    output: ModifiedData.Output;
  }

  export namespace ModifiedData {
    export interface Input {
      /**
       * The list of messages as input to a language model.
       */
      messages?: Array<Input.Message>;

      [k: string]: unknown;
    }

    export namespace Input {
      export interface Message {
        /**
         * The textual content of the message.
         */
        content: string;

        /**
         * The role of the message sender (e.g., user, assistant, system).
         */
        role?: string;
      }
    }

    export interface Output {
      /**
       * The list of messages as output from a language model.
       */
      messages?: Array<Output.Message>;
    }

    export namespace Output {
      export interface Message {
        /**
         * The textual content of the message.
         */
        content: string;

        /**
         * The role of the message sender (e.g., user, assistant, system).
         */
        role?: string;
      }
    }
  }

  /**
   * The evaluation of the analysis results.
   */
  export interface Evaluation {
    /**
     * The action based on interaction analysis and configured tenant security rules.
     */
    action: 'Allow' | 'Alert' | 'Redact' | 'Block';

    /**
     * Indicates if any detections were found during the analysis.
     */
    has_detections: boolean;

    /**
     * The threat level based on interaction analysis and configured tenant security
     * rules.
     */
    threat_level: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  }
}

export interface InteractionAnalyzeParams {
  /**
   * Body param
   */
  metadata: InteractionAnalyzeParams.Metadata;

  /**
   * Body param
   */
  input?: InteractionAnalyzeParams.Input;

  /**
   * Body param
   */
  output?: InteractionAnalyzeParams.Output;

  /**
   * Header param: The ID or alias for the Project to govern the request processing.
   */
  'HL-Project-Id'?: string;
}

export namespace InteractionAnalyzeParams {
  export interface Metadata {
    /**
     * The language model for the interactions.
     */
    model: string;

    /**
     * The identifier for the entity making the interactions.
     */
    requester_id: string;

    /**
     * The provider of the language model.
     */
    provider?: string;
  }

  export interface Input {
    /**
     * The list of messages as input to a language model.
     */
    messages?: Array<Input.Message>;

    [k: string]: unknown;
  }

  export namespace Input {
    export interface Message {
      /**
       * The textual content of the message.
       */
      content: string;

      /**
       * The role of the message sender (e.g., user, assistant, system).
       */
      role?: string;
    }
  }

  export interface Output {
    /**
     * The list of messages as output from a language model.
     */
    messages?: Array<Output.Message>;
  }

  export namespace Output {
    export interface Message {
      /**
       * The textual content of the message.
       */
      content: string;

      /**
       * The role of the message sender (e.g., user, assistant, system).
       */
      role?: string;
    }
  }
}

export declare namespace Interactions {
  export {
    type InteractionAnalyzeResponse as InteractionAnalyzeResponse,
    type InteractionAnalyzeParams as InteractionAnalyzeParams,
  };
}
