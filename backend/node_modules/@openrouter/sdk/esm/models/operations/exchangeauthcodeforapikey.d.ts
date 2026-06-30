import * as z from "zod/v4";
import { OpenEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
export type ExchangeAuthCodeForAPIKeyGlobals = {
    /**
     * The app identifier should be your app's URL and is used as the primary identifier for rankings.
     *
     * @remarks
     * This is used to track API usage per application.
     */
    httpReferer?: string | undefined;
    /**
     * The app display name allows you to customize how your app appears in OpenRouter's dashboard.
     *
     * @remarks
     */
    appTitle?: string | undefined;
    /**
     * Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.
     *
     * @remarks
     */
    appCategories?: string | undefined;
};
/**
 * The method used to generate the code challenge
 */
export declare const ExchangeAuthCodeForAPIKeyCodeChallengeMethod: {
    readonly S256: "S256";
    readonly Plain: "plain";
};
/**
 * The method used to generate the code challenge
 */
export type ExchangeAuthCodeForAPIKeyCodeChallengeMethod = OpenEnum<typeof ExchangeAuthCodeForAPIKeyCodeChallengeMethod>;
export type ExchangeAuthCodeForAPIKeyRequestBody = {
    /**
     * The authorization code received from the OAuth redirect
     */
    code: string;
    /**
     * The method used to generate the code challenge
     */
    codeChallengeMethod?: ExchangeAuthCodeForAPIKeyCodeChallengeMethod | null | undefined;
    /**
     * The code verifier if code_challenge was used in the authorization request
     */
    codeVerifier?: string | undefined;
};
export type ExchangeAuthCodeForAPIKeyRequest = {
    /**
     * The app identifier should be your app's URL and is used as the primary identifier for rankings.
     *
     * @remarks
     * This is used to track API usage per application.
     */
    httpReferer?: string | undefined;
    /**
     * The app display name allows you to customize how your app appears in OpenRouter's dashboard.
     *
     * @remarks
     */
    appTitle?: string | undefined;
    /**
     * Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.
     *
     * @remarks
     */
    appCategories?: string | undefined;
    requestBody: ExchangeAuthCodeForAPIKeyRequestBody;
};
/**
 * Successfully exchanged code for an API key
 */
export type ExchangeAuthCodeForAPIKeyResponse = {
    /**
     * The API key to use for OpenRouter requests
     */
    key: string;
    /**
     * User ID associated with the API key
     */
    userId: string | null;
};
/** @internal */
export declare const ExchangeAuthCodeForAPIKeyCodeChallengeMethod$outboundSchema: z.ZodType<string, ExchangeAuthCodeForAPIKeyCodeChallengeMethod>;
/** @internal */
export type ExchangeAuthCodeForAPIKeyRequestBody$Outbound = {
    code: string;
    code_challenge_method?: string | null | undefined;
    code_verifier?: string | undefined;
};
/** @internal */
export declare const ExchangeAuthCodeForAPIKeyRequestBody$outboundSchema: z.ZodType<ExchangeAuthCodeForAPIKeyRequestBody$Outbound, ExchangeAuthCodeForAPIKeyRequestBody>;
export declare function exchangeAuthCodeForAPIKeyRequestBodyToJSON(exchangeAuthCodeForAPIKeyRequestBody: ExchangeAuthCodeForAPIKeyRequestBody): string;
/** @internal */
export type ExchangeAuthCodeForAPIKeyRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    RequestBody: ExchangeAuthCodeForAPIKeyRequestBody$Outbound;
};
/** @internal */
export declare const ExchangeAuthCodeForAPIKeyRequest$outboundSchema: z.ZodType<ExchangeAuthCodeForAPIKeyRequest$Outbound, ExchangeAuthCodeForAPIKeyRequest>;
export declare function exchangeAuthCodeForAPIKeyRequestToJSON(exchangeAuthCodeForAPIKeyRequest: ExchangeAuthCodeForAPIKeyRequest): string;
/** @internal */
export declare const ExchangeAuthCodeForAPIKeyResponse$inboundSchema: z.ZodType<ExchangeAuthCodeForAPIKeyResponse, unknown>;
export declare function exchangeAuthCodeForAPIKeyResponseFromJSON(jsonString: string): SafeParseResult<ExchangeAuthCodeForAPIKeyResponse, SDKValidationError>;
//# sourceMappingURL=exchangeauthcodeforapikey.d.ts.map