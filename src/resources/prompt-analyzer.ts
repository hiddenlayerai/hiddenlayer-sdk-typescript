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
    const {
      'HL-Project-Id': hlProjectID,
      'X-LLM-Block-Guardrail-Detection': xLlmBlockGuardrailDetection,
      'X-LLM-Block-Input-Code-Detection': xLlmBlockInputCodeDetection,
      'X-LLM-Block-Input-DOS-Detection': xLlmBlockInputDosDetection,
      'X-LLM-Block-Input-PII': xLlmBlockInputPii,
      'X-LLM-Block-Output-Code-Detection': xLlmBlockOutputCodeDetection,
      'X-LLM-Block-Output-PII': xLlmBlockOutputPii,
      'X-LLM-Block-Prompt-Injection': xLlmBlockPromptInjection,
      'X-LLM-Block-Unsafe': xLlmBlockUnsafe,
      'X-LLM-Block-Unsafe-Input': xLlmBlockUnsafeInput,
      'X-LLM-Block-Unsafe-Output': xLlmBlockUnsafeOutput,
      'X-LLM-Entity-Type': xLlmEntityType,
      'X-LLM-Input-DOS-Detection-Threshold': xLlmInputDosDetectionThreshold,
      'X-LLM-Prompt-Injection-Scan-Type': xLlmPromptInjectionScanType,
      'X-LLM-Redact-Input-PII': xLlmRedactInputPii,
      'X-LLM-Redact-Output-PII': xLlmRedactOutputPii,
      'X-LLM-Redact-Type': xLlmRedactType,
      'X-LLM-Skip-Guardrail-Detection': xLlmSkipGuardrailDetection,
      'X-LLM-Skip-Input-Code-Detection': xLlmSkipInputCodeDetection,
      'X-LLM-Skip-Input-DOS-Detection': xLlmSkipInputDosDetection,
      'X-LLM-Skip-Input-PII-Detection': xLlmSkipInputPiiDetection,
      'X-LLM-Skip-Input-URL-Detection': xLlmSkipInputURLDetection,
      'X-LLM-Skip-Output-Code-Detection': xLlmSkipOutputCodeDetection,
      'X-LLM-Skip-Output-PII-Detection': xLlmSkipOutputPiiDetection,
      'X-LLM-Skip-Output-URL-Detection': xLlmSkipOutputURLDetection,
      'X-LLM-Skip-Prompt-Injection-Detection': xLlmSkipPromptInjectionDetection,
      'X-Requester-Id': xRequesterID,
      ...body
    } = params;
    return this._client.post('/api/v1/submit/prompt-analyzer', {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(hlProjectID != null ? { 'HL-Project-Id': hlProjectID } : undefined),
          ...(xLlmBlockGuardrailDetection?.toString() != null ?
            { 'X-LLM-Block-Guardrail-Detection': xLlmBlockGuardrailDetection?.toString() }
          : undefined),
          ...(xLlmBlockInputCodeDetection?.toString() != null ?
            { 'X-LLM-Block-Input-Code-Detection': xLlmBlockInputCodeDetection?.toString() }
          : undefined),
          ...(xLlmBlockInputDosDetection?.toString() != null ?
            { 'X-LLM-Block-Input-DOS-Detection': xLlmBlockInputDosDetection?.toString() }
          : undefined),
          ...(xLlmBlockInputPii?.toString() != null ?
            { 'X-LLM-Block-Input-PII': xLlmBlockInputPii?.toString() }
          : undefined),
          ...(xLlmBlockOutputCodeDetection?.toString() != null ?
            { 'X-LLM-Block-Output-Code-Detection': xLlmBlockOutputCodeDetection?.toString() }
          : undefined),
          ...(xLlmBlockOutputPii?.toString() != null ?
            { 'X-LLM-Block-Output-PII': xLlmBlockOutputPii?.toString() }
          : undefined),
          ...(xLlmBlockPromptInjection?.toString() != null ?
            { 'X-LLM-Block-Prompt-Injection': xLlmBlockPromptInjection?.toString() }
          : undefined),
          ...(xLlmBlockUnsafe?.toString() != null ?
            { 'X-LLM-Block-Unsafe': xLlmBlockUnsafe?.toString() }
          : undefined),
          ...(xLlmBlockUnsafeInput?.toString() != null ?
            { 'X-LLM-Block-Unsafe-Input': xLlmBlockUnsafeInput?.toString() }
          : undefined),
          ...(xLlmBlockUnsafeOutput?.toString() != null ?
            { 'X-LLM-Block-Unsafe-Output': xLlmBlockUnsafeOutput?.toString() }
          : undefined),
          ...(xLlmEntityType?.toString() != null ?
            { 'X-LLM-Entity-Type': xLlmEntityType?.toString() }
          : undefined),
          ...(xLlmInputDosDetectionThreshold != null ?
            { 'X-LLM-Input-DOS-Detection-Threshold': xLlmInputDosDetectionThreshold }
          : undefined),
          ...(xLlmPromptInjectionScanType?.toString() != null ?
            { 'X-LLM-Prompt-Injection-Scan-Type': xLlmPromptInjectionScanType?.toString() }
          : undefined),
          ...(xLlmRedactInputPii?.toString() != null ?
            { 'X-LLM-Redact-Input-PII': xLlmRedactInputPii?.toString() }
          : undefined),
          ...(xLlmRedactOutputPii?.toString() != null ?
            { 'X-LLM-Redact-Output-PII': xLlmRedactOutputPii?.toString() }
          : undefined),
          ...(xLlmRedactType?.toString() != null ?
            { 'X-LLM-Redact-Type': xLlmRedactType?.toString() }
          : undefined),
          ...(xLlmSkipGuardrailDetection?.toString() != null ?
            { 'X-LLM-Skip-Guardrail-Detection': xLlmSkipGuardrailDetection?.toString() }
          : undefined),
          ...(xLlmSkipInputCodeDetection?.toString() != null ?
            { 'X-LLM-Skip-Input-Code-Detection': xLlmSkipInputCodeDetection?.toString() }
          : undefined),
          ...(xLlmSkipInputDosDetection?.toString() != null ?
            { 'X-LLM-Skip-Input-DOS-Detection': xLlmSkipInputDosDetection?.toString() }
          : undefined),
          ...(xLlmSkipInputPiiDetection?.toString() != null ?
            { 'X-LLM-Skip-Input-PII-Detection': xLlmSkipInputPiiDetection?.toString() }
          : undefined),
          ...(xLlmSkipInputURLDetection?.toString() != null ?
            { 'X-LLM-Skip-Input-URL-Detection': xLlmSkipInputURLDetection?.toString() }
          : undefined),
          ...(xLlmSkipOutputCodeDetection?.toString() != null ?
            { 'X-LLM-Skip-Output-Code-Detection': xLlmSkipOutputCodeDetection?.toString() }
          : undefined),
          ...(xLlmSkipOutputPiiDetection?.toString() != null ?
            { 'X-LLM-Skip-Output-PII-Detection': xLlmSkipOutputPiiDetection?.toString() }
          : undefined),
          ...(xLlmSkipOutputURLDetection?.toString() != null ?
            { 'X-LLM-Skip-Output-URL-Detection': xLlmSkipOutputURLDetection?.toString() }
          : undefined),
          ...(xLlmSkipPromptInjectionDetection?.toString() != null ?
            { 'X-LLM-Skip-Prompt-Injection-Detection': xLlmSkipPromptInjectionDetection?.toString() }
          : undefined),
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
   * Header param: Whether to block guardrail detection
   */
  'X-LLM-Block-Guardrail-Detection'?: boolean;

  /**
   * Header param: Whether to block input code detection
   */
  'X-LLM-Block-Input-Code-Detection'?: boolean;

  /**
   * Header param: Whether to block input denial of service detection
   */
  'X-LLM-Block-Input-DOS-Detection'?: boolean;

  /**
   * Header param: Whether to block input personally identifiable information
   * detection
   */
  'X-LLM-Block-Input-PII'?: boolean;

  /**
   * Header param: Whether to block output code detection
   */
  'X-LLM-Block-Output-Code-Detection'?: boolean;

  /**
   * Header param: Whether to block output personally identifiable information
   * detection
   */
  'X-LLM-Block-Output-PII'?: boolean;

  /**
   * Header param: Whether to block prompt injection
   */
  'X-LLM-Block-Prompt-Injection'?: boolean;

  /**
   * Header param: Whether to block unsafe input and output
   */
  'X-LLM-Block-Unsafe'?: boolean;

  /**
   * Header param: Whether to block unsafe input
   */
  'X-LLM-Block-Unsafe-Input'?: boolean;

  /**
   * Header param: Whether to block unsafe output
   */
  'X-LLM-Block-Unsafe-Output'?: boolean;

  /**
   * Header param: The type of entity to redact
   */
  'X-LLM-Entity-Type'?: 'strict' | 'all';

  /**
   * Header param: The threshold for input denial of service detection
   */
  'X-LLM-Input-DOS-Detection-Threshold'?: string;

  /**
   * Header param: The type of prompt injection scan to use
   */
  'X-LLM-Prompt-Injection-Scan-Type'?: 'quick' | 'full';

  /**
   * Header param: Whether to redact input personally identifiable information
   */
  'X-LLM-Redact-Input-PII'?: boolean;

  /**
   * Header param: Whether to redact output personally identifiable information
   */
  'X-LLM-Redact-Output-PII'?: boolean;

  /**
   * Header param: The type of redaction to use
   */
  'X-LLM-Redact-Type'?: 'entity' | 'strict';

  /**
   * Header param: Whether to skip guardrail detection
   */
  'X-LLM-Skip-Guardrail-Detection'?: boolean;

  /**
   * Header param: Whether to skip input code detection
   */
  'X-LLM-Skip-Input-Code-Detection'?: boolean;

  /**
   * Header param: Whether to skip input denial of service detection
   */
  'X-LLM-Skip-Input-DOS-Detection'?: boolean;

  /**
   * Header param: Whether to skip input personally identifiable information
   * detection
   */
  'X-LLM-Skip-Input-PII-Detection'?: boolean;

  /**
   * Header param: Whether to skip input URL detection
   */
  'X-LLM-Skip-Input-URL-Detection'?: boolean;

  /**
   * Header param: Whether to skip output code detection
   */
  'X-LLM-Skip-Output-Code-Detection'?: boolean;

  /**
   * Header param: Whether to skip output personally identifiable information
   * detection
   */
  'X-LLM-Skip-Output-PII-Detection'?: boolean;

  /**
   * Header param: Whether to skip output URL detection
   */
  'X-LLM-Skip-Output-URL-Detection'?: boolean;

  /**
   * Header param: Whether to skip prompt injection detection
   */
  'X-LLM-Skip-Prompt-Injection-Detection'?: boolean;

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
