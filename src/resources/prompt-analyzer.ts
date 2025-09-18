// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class PromptAnalyzer extends APIResource {
  /**
   * Analyze LLM Prompt and Response
   *
   * @example
   * ```ts
   * const promptAnalyzer = await client.promptAnalyzer.create({
   *   prompt: 'Hello World',
   * });
   * ```
   */
  create(
    params: PromptAnalyzerCreateParams,
    options?: RequestOptions,
  ): APIPromise<PromptAnalyzerCreateResponse> {
    const { 'HL-Project-Id': hlProjectID, 'X-Requester-Id': xRequesterID, ...body } = params;
    return this._client.post('/api/v1/submit/prompt-analyzer', {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(hlProjectID != null ? { 'HL-Project-Id': hlProjectID } : undefined),
          ...(xRequesterID != null ? { 'X-Requester-Id': xRequesterID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface PromptAnalyzerCreateResponse {
  /**
   * The analysis detection categories
   */
  categories?: PromptAnalyzerCreateResponse.Categories;

  /**
   * The time in milliseconds it took to process the request
   */
  elapsed_ms?: number;

  /**
   * The framework labels identified during analysis
   */
  frameworks?: PromptAnalyzerCreateResponse.Frameworks;

  model?: string;

  /**
   * The policy used during analysis
   */
  policy?: PromptAnalyzerCreateResponse.Policy;

  provider?: string;

  response?: unknown;

  /**
   * The analysis results
   */
  results?: PromptAnalyzerCreateResponse.Results;

  /**
   * The time in milliseconds the upstream LLM took to process the request
   */
  upstream_elapsed_ms?: number;

  /**
   * The overall verdict of the analysis
   */
  verdict?: boolean;
}

export namespace PromptAnalyzerCreateResponse {
  /**
   * The analysis detection categories
   */
  export interface Categories {
    /**
     * The input activated the upstream guardrails
     */
    guardrail?: boolean;

    /**
     * The input contains code
     */
    input_code?: boolean;

    /**
     * The input contains a denial of service attack
     */
    input_dos?: boolean;

    /**
     * The input contains personally identifiable information
     */
    input_pii?: boolean;

    /**
     * The output contains code
     */
    output_code?: boolean;

    /**
     * The output contains personally identifiable information
     */
    output_pii?: boolean;

    /**
     * The input contains prompt injection
     */
    prompt_injection?: boolean;

    /**
     * The input is unsafe
     */
    unsafe_input?: boolean;

    /**
     * The output is unsafe
     */
    unsafe_output?: boolean;
  }

  /**
   * The framework labels identified during analysis
   */
  export interface Frameworks {
    mitre?: Array<Frameworks.Mitre>;

    owasp?: Array<Frameworks.Owasp>;
  }

  export namespace Frameworks {
    /**
     * The MITRE Atlas framework labels identified during analysis
     */
    export interface Mitre {
      /**
       * The label of the MITRE Atlas framework label
       */
      label?: string;

      /**
       * The name of the MITRE Atlas framework label
       */
      name?: string;
    }

    /**
     * The OWASP framework labels identified during analysis
     */
    export interface Owasp {
      /**
       * The label of the OWASP framework label
       */
      label?: string;

      /**
       * The name of the OWASP framework label
       */
      name?: string;
    }
  }

  /**
   * The policy used during analysis
   */
  export interface Policy {
    /**
     * Block guardrail detection
     */
    block_guardrail_detection?: boolean;

    /**
     * Block input code detection
     */
    block_input_code_detection?: boolean;

    /**
     * Block input denial of service detection
     */
    block_input_dos_detection?: boolean;

    /**
     * Block input personally identifiable information
     */
    block_input_pii?: boolean;

    /**
     * Block output code detection
     */
    block_output_code_detection?: boolean;

    /**
     * Block output personally identifiable information
     */
    block_output_pii?: boolean;

    /**
     * Block prompt injection
     */
    block_prompt_injection?: boolean;

    /**
     * Block unsafe input and output
     */
    block_unsafe?: boolean;

    /**
     * Block unsafe input
     */
    block_unsafe_input?: boolean;

    /**
     * Block unsafe output
     */
    block_unsafe_output?: boolean;

    /**
     * The type of entity to redact
     */
    entity_type?: 'strict' | 'all';

    /**
     * The threshold for input denial of service detection
     */
    input_dos_detection_threshold?: number;

    /**
     * The type of prompt injection scan to use
     */
    prompt_injection_scan_type?: 'quick' | 'full';

    /**
     * Redact input personally identifiable information
     */
    redact_input_pii?: boolean;

    /**
     * Redact output personally identifiable information
     */
    redact_output_pii?: boolean;

    /**
     * The type of redaction to use
     */
    redact_type?: 'entity' | 'strict';

    /**
     * Skip guardrail detection
     */
    skip_guardrail_detection?: boolean;

    /**
     * Skip input code detection
     */
    skip_input_code_detection?: boolean;

    /**
     * Skip input denial of service detection
     */
    skip_input_dos_detection?: boolean;

    /**
     * Skip input personally identifiable information detection
     */
    skip_input_pii_detection?: boolean;

    /**
     * Skip input URL detection
     */
    skip_input_url_detection?: boolean;

    /**
     * Skip output code detection
     */
    skip_output_code_detection?: boolean;

    /**
     * Skip output personally identifiable information detection
     */
    skip_output_pii_detection?: boolean;

    /**
     * Skip output URL detection
     */
    skip_output_url_detection?: boolean;

    /**
     * Skip prompt injection detection
     */
    skip_prompt_injection_detection?: boolean;
  }

  /**
   * The analysis results
   */
  export interface Results {
    /**
     * The guardrail results
     */
    guardrail_results?: Results.GuardrailResults;

    /**
     * The input block list results
     */
    input_block_list_results?: Results.InputBlockListResults;

    /**
     * The input code results
     */
    input_code_results?: Results.InputCodeResults;

    /**
     * The input denial of service results
     */
    input_dos_results?: Results.InputDosResults;

    /**
     * The input personally identifiable information results
     */
    input_pii_results?: Results.InputPiiResults;

    /**
     * The input URL results
     */
    input_urls?: Results.InputURLs;

    /**
     * The output code results
     */
    output_code_results?: Results.OutputCodeResults;

    /**
     * The output personally identifiable information results
     */
    output_pii_results?: Results.OutputPiiResults;

    /**
     * The output URL results
     */
    output_urls?: Results.OutputURLs;

    prompt_injection_classifier_results?: Array<Results.PromptInjectionClassifierResult>;
  }

  export namespace Results {
    /**
     * The guardrail results
     */
    export interface GuardrailResults {
      /**
       * The time in milliseconds it took to process the guardrail
       */
      elapsed_ms?: number;

      /**
       * The verdict of the guardrail analysis
       */
      verdict?: boolean;
    }

    /**
     * The input block list results
     */
    export interface InputBlockListResults {
      /**
       * The time in milliseconds it took to process the input block list
       */
      elapsed_ms?: number;

      matches?: Array<string>;

      /**
       * The verdict of the input block list analysis
       */
      verdict?: boolean;
    }

    /**
     * The input code results
     */
    export interface InputCodeResults {
      /**
       * The time in milliseconds it took to process the input code
       */
      elapsed_ms?: number;

      /**
       * The verdict of the input code analysis
       */
      verdict?: boolean;
    }

    /**
     * The input denial of service results
     */
    export interface InputDosResults {
      /**
       * The time in milliseconds it took to process the input denial of service
       */
      elapsed_ms?: number;

      /**
       * The verdict of the input denial of service analysis
       */
      verdict?: boolean;
    }

    /**
     * The input personally identifiable information results
     */
    export interface InputPiiResults {
      /**
       * The time in milliseconds it took to process the input personally identifiable
       * information
       */
      elapsed_ms?: number;

      entities?: Array<string>;

      /**
       * The verdict of the input personally identifiable information analysis
       */
      verdict?: boolean;
    }

    /**
     * The input URL results
     */
    export interface InputURLs {
      /**
       * The time in milliseconds it took to process the guardrail
       */
      elapsed_ms?: number;

      urls?: Array<string>;
    }

    /**
     * The output code results
     */
    export interface OutputCodeResults {
      /**
       * The time in milliseconds it took to process the output code
       */
      elapsed_ms?: number;

      /**
       * The verdict of the output code analysis
       */
      verdict?: boolean;
    }

    /**
     * The output personally identifiable information results
     */
    export interface OutputPiiResults {
      /**
       * The time in milliseconds it took to process the output personally identifiable
       * information
       */
      elapsed_ms?: number;

      entities?: Array<string>;

      /**
       * The verdict of the output personally identifiable information analysis
       */
      verdict?: boolean;
    }

    /**
     * The output URL results
     */
    export interface OutputURLs {
      /**
       * The time in milliseconds it took to process the guardrail
       */
      elapsed_ms?: number;

      urls?: Array<string>;
    }

    export interface PromptInjectionClassifierResult {
      /**
       * The time in milliseconds it took to process the prompt injection classifier
       */
      elapsed_ms?: number;

      probabilities?: Array<number>;

      /**
       * The verdict of the prompt injection classifier
       */
      verdict?: boolean;

      /**
       * The version of the prompt injection classifier
       */
      version?: number;
    }
  }
}

export interface PromptAnalyzerCreateParams {
  /**
   * Body param:
   */
  prompt: string;

  /**
   * Body param:
   */
  model?: string;

  /**
   * Body param:
   */
  output?: string;

  /**
   * Header param: The ID or alias for the Project to govern the request processing.
   */
  'HL-Project-Id'?: string;

  /**
   * Header param: The identifier for the requester to be used if MLDR is enabled
   */
  'X-Requester-Id'?: string;
}

export declare namespace PromptAnalyzer {
  export {
    type PromptAnalyzerCreateResponse as PromptAnalyzerCreateResponse,
    type PromptAnalyzerCreateParams as PromptAnalyzerCreateParams,
  };
}
