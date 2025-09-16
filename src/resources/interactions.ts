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
   *   metadata: {
   *     model: 'model',
   *     requester_id: 'requester_id',
   *   },
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

  analyzed_data: InteractionAnalyzeResponse.AnalyzedData;

  metadata: InteractionAnalyzeResponse.Metadata;

  modified_data: InteractionAnalyzeResponse.ModifiedData;
}

export namespace InteractionAnalyzeResponse {
  export interface Analysis {
    id: string;

    configuration: { [key: string]: unknown };

    detected: boolean;

    findings: Analysis.Findings;

    name: string;

    phase: string;

    processing_time_ms: number;

    version: string;
  }

  export namespace Analysis {
    export interface Findings {
      frameworks: { [key: string]: Array<Findings.Framework> };

      [k: string]: unknown;
    }

    export namespace Findings {
      export interface Framework {
        label: string;

        name: string;
      }
    }
  }

  export interface AnalyzedData {
    input: AnalyzedData.Input;

    output?: AnalyzedData.Output;
  }

  export namespace AnalyzedData {
    export interface Input {
      messages?: Array<Input.Message>;

      [k: string]: unknown;
    }

    export namespace Input {
      export interface Message {
        content: string;

        role?: string;

        [k: string]: unknown;
      }
    }

    export interface Output {
      messages?: Array<Output.Message>;

      [k: string]: unknown;
    }

    export namespace Output {
      export interface Message {
        content: string;

        role?: string;

        [k: string]: unknown;
      }
    }
  }

  export interface Metadata {
    model: string;

    processing_time_ms: number;

    project: Metadata.Project;

    provider: string;

    requester_id: string;

    analyzed_at?: string;

    event_id?: string;
  }

  export namespace Metadata {
    export interface Project {
      project_alias?: string;

      project_id?: string;

      ruleset_id?: string;
    }
  }

  export interface ModifiedData {
    input: ModifiedData.Input;

    output: ModifiedData.Output;
  }

  export namespace ModifiedData {
    export interface Input {
      messages?: Array<Input.Message>;

      [k: string]: unknown;
    }

    export namespace Input {
      export interface Message {
        content: string;

        role?: string;

        [k: string]: unknown;
      }
    }

    export interface Output {
      messages?: Array<Output.Message>;

      [k: string]: unknown;
    }

    export namespace Output {
      export interface Message {
        content: string;

        role?: string;

        [k: string]: unknown;
      }
    }
  }
}

export interface InteractionAnalyzeParams {
  /**
   * Body param:
   */
  metadata: InteractionAnalyzeParams.Metadata;

  /**
   * Body param:
   */
  input?: InteractionAnalyzeParams.Input;

  /**
   * Body param:
   */
  output?: InteractionAnalyzeParams.Output;

  /**
   * Header param: The ID or alias for the Project to govern the request processing.
   */
  'HL-Project-Id'?: string;

  [k: string]: unknown;
}

export namespace InteractionAnalyzeParams {
  export interface Metadata {
    model: string;

    requester_id: string;

    provider?: string;

    [k: string]: unknown;
  }

  export interface Input {
    messages?: Array<Input.Message>;

    [k: string]: unknown;
  }

  export namespace Input {
    export interface Message {
      content: string;

      role?: string;

      [k: string]: unknown;
    }
  }

  export interface Output {
    messages?: Array<Output.Message>;

    [k: string]: unknown;
  }

  export namespace Output {
    export interface Message {
      content: string;

      role?: string;

      [k: string]: unknown;
    }
  }
}

export declare namespace Interactions {
  export {
    type InteractionAnalyzeResponse as InteractionAnalyzeResponse,
    type InteractionAnalyzeParams as InteractionAnalyzeParams,
  };
}
