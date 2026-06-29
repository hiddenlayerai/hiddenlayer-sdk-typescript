/**
 * Custom functionality extending the generated SDK.
 *
 * This module exports all custom functionality that extends the base SDK
 * to provide backward compatibility and convenience methods.
 */

export { BETA_ENDPOINTS } from './beta-endpoints';
export { warnBeta, checkBetaEndpoint } from './beta';
export {
  CommunityScanner,
  CommunityScanSource,
  type CommunityScanOptions,
  type CommunityScanSourceType,
} from './community-scan';
export {
  ModelScanner,
  type ScanFileOptions,
  type ScanFolderOptions,
  type ScanS3ModelOptions,
  type ScanAzureBlobModelOptions,
  type ScanHuggingFaceModelOptions,
} from './model-scan';
export { getScanResults, waitForScanResults, ScanStatus, type ScanStatusType } from './scan-utils';
