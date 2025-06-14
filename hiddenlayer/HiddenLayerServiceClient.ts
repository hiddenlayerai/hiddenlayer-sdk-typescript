import { Configuration } from "../generated";
import { ModelScanService } from "./services/ModelScanService";
import { ModelService } from "./services/ModelService";

export class HiddenLayerServiceClient {
    private clientId: string;
    private clientSecret: string;
    private host: string;
    private authUrl: string;

    private constructor(host?: string, clientId?: string, clientSecret?: string, authUrl?: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.host = host ?? "https://api.us.hiddenlayer.ai";
        this.authUrl = authUrl ?? "https://auth.hiddenlayer.ai";
        this.isSaaS = this.isHostSaaS(this.host);

        let config: Configuration = null;
        if (this.isSaaS) {
            if (!this.clientId) {
                throw new Error("clientId is required for SaaS access");
            }
            if (!this.clientSecret) {
                throw new Error("clientSecret is required for SaaS access");
            }
            const token = this.getJwt()
            config = new Configuration({
                basePath: this.host,
                accessToken: token
            });
        } else {
            config = new Configuration({
                basePath: this.host
            });
        }
        this.modelScanner = new ModelScanService(this.isSaaS, config);
        this.model = new ModelService(config);
    }

    static createSaaSClient(clientId: string, clientSecret: string, host?: string): HiddenLayerServiceClient {
        return new HiddenLayerServiceClient(host, clientId, clientSecret);
    }

    static createEnterpriseClient(host: string): HiddenLayerServiceClient {
        return new HiddenLayerServiceClient(host);
    }

    readonly isSaaS: boolean;
    readonly modelScanner: ModelScanService;
    readonly model: ModelService;

    /**
     * Check if the client is using the SaaS version of the HiddenLayer API.
     * 
     * @returns True if the client is using the SaaS version of the HiddenLayer API.
     */
    private isHostSaaS(host: string): boolean {
        const url = new URL(host);
        if (url.hostname.endsWith("hiddenlayer.ai")) {
            return true;
        }
        return false;
    }

    /**
     * Get the JWT token to auth to the HiddenLayer API.
     */
    private async getJwt(): Promise<string> {
        const tokenUrl = this.authUrl + "/oauth2/token?grant_type=client_credentials";
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            }
        });
        if (response.status != 200) {
            throw new Error(`Unable to get authentication credentials for the HiddenLayer API: ${response.status}: ${response.text}`)
        }
        const json = await response.json();
        if (!json.access_token) {
            throw new Error(`Unable to get authentication credentials for the HiddenLayer API - invalid response: ${response.json()}`)
        }
        return json.access_token;
    }
}
