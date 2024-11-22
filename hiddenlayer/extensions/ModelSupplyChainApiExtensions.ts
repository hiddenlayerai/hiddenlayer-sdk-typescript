import * as runtime from '../../generated/runtime';
import { ModelScanApiV3ScanModelVersionIdGetRequest, ModelSupplyChainApi, Sarif210, Sarif210FromJSON } from "../../generated";

declare module "../../generated" {
  interface ModelSupplyChainApi {
    modelScanApiV3ScanModelVersionIdGetSarifRaw(requestParameters: ModelScanApiV3ScanModelVersionIdGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Sarif210>>
    modelScanApiV3ScanModelVersionIdGetSarif(requestParameters: ModelScanApiV3ScanModelVersionIdGetRequest): Promise<Sarif210>
  }
}

    /**
     * Get Result of a Model Scan
     */
    async function modelScanApiV3ScanModelVersionIdGetSarifRaw(this: ModelSupplyChainApi, requestParameters: ModelScanApiV3ScanModelVersionIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Sarif210>> {
      if (requestParameters['scanId'] == null) {
          throw new runtime.RequiredError(
              'scanId',
              'Required parameter "scanId" was null or undefined when calling modelScanApiV3ScanModelVersionIdGet().'
          );
      }

      const queryParameters: runtime.HTTPQuery = {};

      if (requestParameters['hasDetections'] != null) {
          queryParameters['has_detections'] = requestParameters['hasDetections'];
      }

      const headerParameters: runtime.HTTPHeaders = {
        "Accept": "application/sarif+json",
      };

      if (this.configuration && this.configuration.accessToken) {
          const token = this.configuration.accessToken;
          const tokenString = await token("BearerAuth", []);

          if (tokenString) {
              headerParameters["Authorization"] = `Bearer ${tokenString}`;
          }
      }
      const response = await this.request({
          path: `/scan/v3/results/{scan_id}`.replace(`{${"scan_id"}}`, encodeURIComponent(String(requestParameters['scanId']))),
          method: 'GET',
          headers: headerParameters,
          query: queryParameters,
      }, initOverrides);

      return new runtime.JSONApiResponse(response, (jsonValue) => Sarif210FromJSON(jsonValue));
  }

async function modelScanApiV3ScanModelVersionIdGetSarif(this: ModelSupplyChainApi, requestParameters: ModelScanApiV3ScanModelVersionIdGetRequest): Promise<Sarif210> {
  const response = await this.modelScanApiV3ScanModelVersionIdGetSarifRaw(requestParameters);
  return await response.value();
}

ModelSupplyChainApi.prototype.modelScanApiV3ScanModelVersionIdGetSarifRaw = modelScanApiV3ScanModelVersionIdGetSarifRaw;
ModelSupplyChainApi.prototype.modelScanApiV3ScanModelVersionIdGetSarif = modelScanApiV3ScanModelVersionIdGetSarif;
