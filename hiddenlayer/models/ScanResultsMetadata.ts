import { ScanResultsV2 } from '../../generated/models/ScanResultsV2';

export interface ScanResultsMetadata extends ScanResultsV2 {
    fileName: string;
    filePath: string;
    sensorId: string;
}