import { Configuration, DefaultConfig } from "../generated";
import { ModelScanService } from "./services/ModelScanService";

export class HiddenLayerServiceClient {
    private clientId: string;
    private clientSecret: string;
    private host: string;

    constructor(clientId: string, clientSecret: string, host: string = "https://api.us.hiddenlayer.ai") {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.host = host;

        const token = this.getJwt()
        DefaultConfig.config = new Configuration({
            basePath: this.host,
            accessToken: token
        });
    }

    readonly modelScanner: ModelScanService = new ModelScanService();

    /**
     * Get the JWT token to auth to the HiddenLayer API.
     */
    private async getJwt(): Promise<string> {
        const tokenUrl = "https://auth.hiddenlayer.ai/oauth2/token?grant_type=client_credentials";
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