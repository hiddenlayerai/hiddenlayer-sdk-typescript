import { HiddenLayerError } from "../errors/index.js";

/** @internal The value without surrounding whitespace, or undefined when nothing is left. */
export function nonEmpty(value: string | undefined): string | undefined {
    return value?.trim() || undefined;
}

/** @internal */
export function readEnv(name: string): string | undefined {
    return typeof process === "undefined" ? undefined : nonEmpty(process.env[name]);
}

/** @internal */
export const MISSING_CREDENTIALS_MESSAGE =
    "No HiddenLayer credentials: pass token, or clientId and clientSecret, to the HiddenLayer client, or set HIDDENLAYER_TOKEN, or HIDDENLAYER_CLIENT_ID and HIDDENLAYER_CLIENT_SECRET. For a deployment that takes unauthenticated requests, pass auth: false.";

/** @internal */
export function missingCredentials(): never {
    throw new HiddenLayerError({ message: MISSING_CREDENTIALS_MESSAGE });
}
