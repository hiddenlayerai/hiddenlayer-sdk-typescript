/**
 * Registry of beta endpoint paths to their qualified method names.
 *
 * Used by the prepareOptions interceptor to emit runtime beta warnings
 * without patching generated resource files.
 */
export const BETA_ENDPOINTS: Record<string, string> = {
  '/detection/v2/request-evaluations': 'Detection.requestEvaluation',
  '/detection/v2/response-evaluations': 'Detection.responseEvaluation',
};
