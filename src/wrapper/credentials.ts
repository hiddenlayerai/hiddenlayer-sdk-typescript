import { Oauth2Client } from "../api/resources/oauth2/client/Client.js";
import type { BaseClientOptions } from "../BaseClient.js";
import * as core from "../core/index.js";
import { HiddenLayerError } from "../errors/index.js";

/** Refresh this long before the token expires, or halfway through a shorter lifetime, so none lapses in flight. */
const EXPIRY_SKEW_MS = 30_000;

/** @internal */
export function readEnv(name: string): string | undefined {
    return typeof process === "undefined" ? undefined : process.env[name]?.trim() || undefined;
}

interface CachedToken {
    accessToken: string;
    refreshAt: number;
}

/**
 * Exchanges a client ID and secret for an access token at `/oauth2/token`, and reuses it until it nears expiry.
 *
 * @internal
 */
export class ClientCredentials {
    private readonly oauth2: Oauth2Client;
    private cached: CachedToken | undefined;
    private pending: Promise<CachedToken> | undefined;

    constructor(clientId: string, clientSecret: string, options: Omit<BaseClientOptions, "token" | "auth">) {
        const authorization = core.BasicAuth.toAuthorizationHeader({ username: clientId, password: clientSecret });
        const headers: Record<string, string> = authorization === undefined ? {} : { Authorization: authorization };
        // The token endpoint takes the client's own credentials as Basic auth, not a bearer token.
        this.oauth2 = new Oauth2Client({ ...options, token: "", auth: async () => ({ headers }) });
    }

    public async accessToken(): Promise<string> {
        if (this.cached !== undefined && this.cached.refreshAt > Date.now()) {
            return this.cached.accessToken;
        }
        // Callers that arrive during an exchange share its outcome, so a failing token endpoint fails them all at once.
        this.pending ??= this.exchange().then(
            (token) => {
                this.cached = token;
                this.pending = undefined;
                return token;
            },
            (error: unknown) => {
                this.pending = undefined;
                throw error;
            },
        );
        return (await this.pending).accessToken;
    }

    private async exchange(): Promise<CachedToken> {
        const issuedAt = Date.now();
        const token = await this.oauth2.token({ grant_type: "client_credentials" });
        const lifetime = token.expires_in * 1000;
        return {
            accessToken: token.access_token,
            refreshAt: issuedAt + lifetime - Math.min(EXPIRY_SKEW_MS, lifetime / 2),
        };
    }
}

/** @internal */
export const MISSING_CREDENTIALS_MESSAGE =
    "No HiddenLayer credentials: pass token, or clientId and clientSecret, to the HiddenLayer client, or set HIDDENLAYER_TOKEN, or HIDDENLAYER_CLIENT_ID and HIDDENLAYER_CLIENT_SECRET. For a deployment that takes unauthenticated requests, pass auth: false.";

/** @internal */
export function missingCredentials(): never {
    throw new HiddenLayerError({ message: MISSING_CREDENTIALS_MESSAGE });
}
