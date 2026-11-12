import { HiddenLayerClient } from "../Client.js";
import * as core from "../core/index.js";
import { HiddenLayerEnvironment } from "../environments.js";
import { withBetaWarnings } from "../lib/beta.js";
import { CommunityScanner } from "../lib/community-scan.js";
import { ModelScanner } from "../lib/model-scan.js";
import { missingCredentials, nonEmpty, readEnv } from "./credentials.js";

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
         * `HIDDENLAYER_TOKEN`, then `HIDDENLAYER_CLIENT_ID` and `HIDDENLAYER_CLIENT_SECRET`. Credentials in an `auth`
         * object count as options, after the top-level ones, and a blank one counts as not passed.
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

/** 3.x options 4.0 doesn't read, and what replaces each: a 3.x options object would otherwise fall back to defaults. */
const REMOVED_OPTIONS: ReadonlyMap<string, string> = new Map([
    ["bearerToken", "token"],
    ["clientID", "clientId"],
    ["baseURL", "baseUrl"],
    ["timeout", "timeoutInSeconds"],
    ["defaultHeaders", "headers"],
    ["defaultQuery", "queryParams on each request"],
    ["fetchOptions", "a fetch function that applies them"],
    ["logLevel", "logging.level"],
    ["logger", "logging.logger"],
]);

const MIGRATION_GUIDE =
    "https://github.com/hiddenlayerai/hiddenlayer-sdk-typescript/blob/main/docs/BREAKING_CHANGES_v4.0.0.md";

function rejectRemovedOptions(options: object): void {
    const values: Record<string, unknown> = { ...options };
    const removed = Object.keys(values).filter((name) => REMOVED_OPTIONS.has(name) && values[name] != null);
    if (removed.length > 0) {
        const replacements = removed.map((name) => `${name} is now ${REMOVED_OPTIONS.get(name)}`).join("; ");
        throw new TypeError(`HiddenLayer doesn't take these 3.x options: ${replacements}. See ${MIGRATION_GUIDE}`);
    }
}

function isEnvironmentName(environment: string): environment is HiddenLayer.EnvironmentName {
    return Object.keys(HiddenLayerEnvironmentName).includes(environment);
}

function regionUrl(environment: string): string {
    return isEnvironmentName(environment) ? HiddenLayerEnvironmentName[environment] : environment;
}

function resolveEnvironment(
    environment: HiddenLayer.Options["environment"],
): core.Supplier<HiddenLayerEnvironment | string> {
    if (environment === undefined) {
        return HiddenLayerEnvironment.ProdUs;
    }
    if (typeof environment === "string") {
        return regionUrl(environment);
    }
    return async () => regionUrl(await core.Supplier.get(environment));
}

/** A token, or the client ID and secret the generated client exchanges for one at `/oauth2/token`. */
type Credentials =
    | { token: core.Supplier<string> }
    | { clientId: core.Supplier<string>; clientSecret: core.Supplier<string> };

/** Credentials as the generated client's `auth` option takes them, in an object. */
type AuthCredentials = {
    token?: core.Supplier<string>;
    clientId?: core.Supplier<string>;
    clientSecret?: core.Supplier<string>;
};

/** The credentials in an `auth` object, or undefined when `auth` is `false`, a function or an `AuthProvider`. */
function authCredentials(auth: HiddenLayer.Options["auth"]): AuthCredentials | undefined {
    if (auth === undefined || auth === false || typeof auth === "function" || core.isAuthProvider(auth)) {
        return undefined;
    }
    return auth;
}

/** A passed credential, with a blank string counted as not passed. */
function passed(value: core.Supplier<string> | undefined): core.Supplier<string> | undefined {
    return typeof value === "string" ? nonEmpty(value) : value;
}

/** Top-level options win over an `auth` object's, and either wins over the environment. */
function credentials(options: HiddenLayer.Options, fromAuth: AuthCredentials): Credentials {
    const token = passed(options.token) ?? passed(fromAuth.token);
    if (token !== undefined) {
        return { token };
    }
    const passedId = passed(options.clientId) ?? passed(fromAuth.clientId);
    const passedSecret = passed(options.clientSecret) ?? passed(fromAuth.clientSecret);
    const clientId = passedId ?? readEnv("HIDDENLAYER_CLIENT_ID");
    const clientSecret = passedSecret ?? readEnv("HIDDENLAYER_CLIENT_SECRET");
    const hasClientCredentials = clientId !== undefined && clientSecret !== undefined;
    const isClientPassed = passedId !== undefined || passedSecret !== undefined;
    if (hasClientCredentials && isClientPassed) {
        return { clientId, clientSecret };
    }
    const envToken = readEnv("HIDDENLAYER_TOKEN");
    if (envToken !== undefined) {
        return { token: envToken };
    }
    if (hasClientCredentials) {
        return { clientId, clientSecret };
    }
    // Missing credentials fail each request rather than the constructor, as they did in 4.0.
    return { token: missingCredentials };
}

/**
 * The HiddenLayer API client: the generated client plus the model and community scanners, credentials from
 * the environment, and a warning the first time a beta endpoint is called.
 */
export class HiddenLayer extends HiddenLayerClient {
    #modelScanner: ModelScanner | undefined;
    #communityScanner: CommunityScanner | undefined;

    constructor(options: HiddenLayer.Options = {}) {
        rejectRemovedOptions(options);
        const { token: _token, clientId: _clientId, clientSecret: _clientSecret, ...rest } = options;
        const environment = resolveEnvironment(options.environment);
        const baseUrl =
            options.baseUrl ?? (options.environment === undefined ? readEnv("HIDDENLAYER_BASE_URL") : undefined);
        // Looked up per request, as Fern's own fetcher does, so a fetch installed after construction is used.
        const fetchFn: typeof fetch = (input, init) => (options.fetch ?? globalThis.fetch)(input, init);
        const fromAuth = authCredentials(options.auth);
        super({
            ...rest,
            // credentials() reads an auth object, so the generated client sees only the credentials it chose.
            auth: fromAuth === undefined ? options.auth : undefined,
            environment,
            baseUrl,
            ...credentials(options, fromAuth ?? {}),
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
