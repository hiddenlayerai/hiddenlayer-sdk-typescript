import { HiddenLayerClient } from "../Client.js";
import * as core from "../core/index.js";
import { HiddenLayerEnvironment } from "../environments.js";
import { withBetaWarnings } from "../lib/beta.js";
import { CommunityScanner } from "../lib/community-scan.js";
import { ModelScanner } from "../lib/model-scan.js";
import { SDK_VERSION } from "../version.js";
import { ClientCredentials, missingCredentials, readEnv } from "./credentials.js";

const PACKAGE_NAME = "@hiddenlayerai/hiddenlayer-sdk";

/** The HiddenLayer regions, by the names the `environment` option takes. */
export const HiddenLayerEnvironmentName: Readonly<Record<"prod-us" | "prod-eu", HiddenLayerEnvironment>> = {
    "prod-us": HiddenLayerEnvironment.ProdUs,
    "prod-eu": HiddenLayerEnvironment.ProdEu,
};

export declare namespace HiddenLayer {
    export type EnvironmentName = keyof typeof HiddenLayerEnvironmentName;

    export interface Options extends Omit<HiddenLayerClient.Options, "token" | "environment"> {
        /**
         * A bearer token. Options win over the environment: `token`, then `clientId` and `clientSecret`, then
         * `HIDDENLAYER_TOKEN`, then `HIDDENLAYER_CLIENT_ID` and `HIDDENLAYER_CLIENT_SECRET`.
         */
        token?: core.Supplier<string>;
        /** Exchanged with `clientSecret` for an access token. Defaults to `HIDDENLAYER_CLIENT_ID`. */
        clientId?: string;
        /** Defaults to `HIDDENLAYER_CLIENT_SECRET`. */
        clientSecret?: string;
        /** A region by name (`prod-us`, `prod-eu`) or a `HiddenLayerEnvironment` URL. Defaults to `prod-us`. */
        environment?: EnvironmentName | core.Supplier<HiddenLayerEnvironment | string>;
        /** A URL that overrides `environment`. Defaults to `HIDDENLAYER_BASE_URL` when `environment` isn't given. */
        baseUrl?: core.Supplier<string>;
    }

    export type RequestOptions = HiddenLayerClient.RequestOptions;
}

function isEnvironmentName(environment: string): environment is HiddenLayer.EnvironmentName {
    return Object.keys(HiddenLayerEnvironmentName).includes(environment);
}

function resolveEnvironment(
    environment: HiddenLayer.Options["environment"],
): core.Supplier<HiddenLayerEnvironment | string> {
    if (environment === undefined) {
        return HiddenLayerEnvironment.ProdUs;
    }
    return typeof environment === "string" && isEnvironmentName(environment)
        ? HiddenLayerEnvironmentName[environment]
        : environment;
}

function tokenSupplier(options: HiddenLayer.Options, connection: HiddenLayerClient.Options): core.Supplier<string> {
    if (options.token !== undefined) {
        return options.token;
    }
    const clientId = options.clientId ?? readEnv("HIDDENLAYER_CLIENT_ID");
    const clientSecret = options.clientSecret ?? readEnv("HIDDENLAYER_CLIENT_SECRET");
    const exchange = (id: string, secret: string): core.Supplier<string> => {
        const credentials = new ClientCredentials(id, secret, connection);
        return () => credentials.accessToken();
    };
    const isClientPassed = options.clientId !== undefined || options.clientSecret !== undefined;
    if (isClientPassed && clientId !== undefined && clientSecret !== undefined) {
        return exchange(clientId, clientSecret);
    }
    const envToken = readEnv("HIDDENLAYER_TOKEN");
    if (envToken !== undefined) {
        return envToken;
    }
    if (clientId !== undefined && clientSecret !== undefined) {
        return exchange(clientId, clientSecret);
    }
    return missingCredentials;
}

/**
 * The HiddenLayer API client: the generated client plus the model and community scanners, credentials from
 * the environment, and a warning the first time a beta endpoint is called.
 */
export class HiddenLayer extends HiddenLayerClient {
    #modelScanner: ModelScanner | undefined;
    #communityScanner: CommunityScanner | undefined;

    constructor(options: HiddenLayer.Options = {}) {
        const { token: _token, clientId: _clientId, clientSecret: _clientSecret, ...rest } = options;
        const environment = resolveEnvironment(options.environment);
        const baseUrl =
            options.baseUrl ?? (options.environment === undefined ? readEnv("HIDDENLAYER_BASE_URL") : undefined);
        // Fern names the SDK from npm publishing details this repo's generation has none of, so its own are empty.
        const headers = {
            "X-Fern-SDK-Name": PACKAGE_NAME,
            "User-Agent": `${PACKAGE_NAME}/${SDK_VERSION}`,
            ...rest.headers,
        };
        const connection: HiddenLayerClient.Options = { ...rest, environment, baseUrl, headers, token: "" };
        // Looked up per request, as Fern's own fetcher does, so a fetch installed after construction is used.
        const fetchFn: typeof fetch = (input, init) => (options.fetch ?? globalThis.fetch)(input, init);
        super({
            ...connection,
            token: tokenSupplier(options, connection),
            fetch: withBetaWarnings(
                fetchFn,
                async () => (await core.Supplier.get(baseUrl)) ?? (await core.Supplier.get(environment)),
            ),
        });
    }

    /** Scan local files and folders, and models in S3, Azure Blob Storage and Hugging Face. */
    public get modelScanner(): ModelScanner {
        this.#modelScanner ??= new ModelScanner(this);
        return this.#modelScanner;
    }

    /** Scan a model at a remote location the scanner fetches itself. */
    public get communityScanner(): CommunityScanner {
        this.#communityScanner ??= new CommunityScanner(this);
        return this.#communityScanner;
    }
}
