/**
 * Custom functionality extending the generated SDK.
 *
 * This module exports all custom functionality that extends the base SDK
 * to provide backward compatibility and convenience methods.
 */

export { checkBetaEndpoint, warnBeta } from "./beta.js";
export {
    type CommunityScanOptions,
    CommunityScanner,
    CommunityScanSource,
    type CommunityScanSourceType,
} from "./community-scan.js";
export {
    type AzureBlobCredential,
    ModelScanner,
    type ScanAzureBlobModelOptions,
    type ScanFileOptions,
    type ScanFolderOptions,
    type ScanHuggingFaceModelOptions,
    type ScanS3ModelOptions,
} from "./model-scan.js";
export { getScanResults, type ScanReport, ScanStatus, type ScanStatusType, waitForScanResults } from "./scan-utils.js";
