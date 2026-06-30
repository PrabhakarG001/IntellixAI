import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
export type GetCurrentKeyGlobals = {
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
export type GetCurrentKeyRequest = {
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
 * Legacy rate limit information about a key. Will always return -1.
 *
 * @deprecated class: This will be removed in a future release, please migrate away from it as soon as possible.
 */
export type RateLimit = {
    /**
     * Rate limit interval
     */
    interval: string;
    /**
     * Note about the rate limit
     */
    note: string;
    /**
     * Number of requests allowed per interval
     */
    requests: number;
};
/**
 * Current API key information
 */
export type GetCurrentKeyData = {
    /**
     * Total external BYOK usage (in USD) for the API key
     */
    byokUsage: number;
    /**
     * External BYOK usage (in USD) for the current UTC day
     */
    byokUsageDaily: number;
    /**
     * External BYOK usage (in USD) for current UTC month
     */
    byokUsageMonthly: number;
    /**
     * External BYOK usage (in USD) for the current UTC week (Monday-Sunday)
     */
    byokUsageWeekly: number;
    /**
     * The user ID of the key creator. For organization-owned keys, this is the member who created the key. For individual users, this is the user's own ID.
     */
    creatorUserId: string | null;
    /**
     * ISO 8601 UTC timestamp when the API key expires, or null if no expiration
     */
    expiresAt?: Date | null | undefined;
    /**
     * Whether to include external BYOK usage in the credit limit
     */
    includeByokInLimit: boolean;
    /**
     * Whether this is a free tier API key
     */
    isFreeTier: boolean;
    /**
     * Whether this is a management key
     */
    isManagementKey: boolean;
    /**
     * Whether this is a management key
     *
     * @deprecated field: This will be removed in a future release, please migrate away from it as soon as possible.
     */
    isProvisioningKey: boolean;
    /**
     * Human-readable label for the API key
     */
    label: string;
    /**
     * Spending limit for the API key in USD
     */
    limit: number | null;
    /**
     * Remaining spending limit in USD
     */
    limitRemaining: number | null;
    /**
     * Type of limit reset for the API key
     */
    limitReset: string | null;
    /**
     * Legacy rate limit information about a key. Will always return -1.
     *
     * @deprecated field: This will be removed in a future release, please migrate away from it as soon as possible.
     */
    rateLimit: RateLimit;
    /**
     * Total OpenRouter credit usage (in USD) for the API key
     */
    usage: number;
    /**
     * OpenRouter credit usage (in USD) for the current UTC day
     */
    usageDaily: number;
    /**
     * OpenRouter credit usage (in USD) for the current UTC month
     */
    usageMonthly: number;
    /**
     * OpenRouter credit usage (in USD) for the current UTC week (Monday-Sunday)
     */
    usageWeekly: number;
};
/**
 * API key details
 */
export type GetCurrentKeyResponse = {
    /**
     * Current API key information
     */
    data: GetCurrentKeyData;
};
/** @internal */
export type GetCurrentKeyRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
};
/** @internal */
export declare const GetCurrentKeyRequest$outboundSchema: z.ZodType<GetCurrentKeyRequest$Outbound, GetCurrentKeyRequest>;
export declare function getCurrentKeyRequestToJSON(getCurrentKeyRequest: GetCurrentKeyRequest): string;
/** @internal */
export declare const RateLimit$inboundSchema: z.ZodType<RateLimit, unknown>;
export declare function rateLimitFromJSON(jsonString: string): SafeParseResult<RateLimit, SDKValidationError>;
/** @internal */
export declare const GetCurrentKeyData$inboundSchema: z.ZodType<GetCurrentKeyData, unknown>;
export declare function getCurrentKeyDataFromJSON(jsonString: string): SafeParseResult<GetCurrentKeyData, SDKValidationError>;
/** @internal */
export declare const GetCurrentKeyResponse$inboundSchema: z.ZodType<GetCurrentKeyResponse, unknown>;
export declare function getCurrentKeyResponseFromJSON(jsonString: string): SafeParseResult<GetCurrentKeyResponse, SDKValidationError>;
//# sourceMappingURL=getcurrentkey.d.ts.map