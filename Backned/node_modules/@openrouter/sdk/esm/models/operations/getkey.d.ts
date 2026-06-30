import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
export type GetKeyGlobals = {
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
export type GetKeyRequest = {
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
    /**
     * The hash identifier of the API key to retrieve
     */
    hash: string;
};
/**
 * The API key information
 */
export type GetKeyData = {
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
     * ISO 8601 timestamp of when the API key was created
     */
    createdAt: string;
    /**
     * The user ID of the key creator. For organization-owned keys, this is the member who created the key. For individual users, this is the user's own ID.
     */
    creatorUserId: string | null;
    /**
     * Whether the API key is disabled
     */
    disabled: boolean;
    /**
     * ISO 8601 UTC timestamp when the API key expires, or null if no expiration
     */
    expiresAt?: Date | null | undefined;
    /**
     * Unique hash identifier for the API key
     */
    hash: string;
    /**
     * Whether to include external BYOK usage in the credit limit
     */
    includeByokInLimit: boolean;
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
     * Name of the API key
     */
    name: string;
    /**
     * ISO 8601 timestamp of when the API key was last updated
     */
    updatedAt: string | null;
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
    /**
     * The workspace ID this API key belongs to.
     */
    workspaceId: string;
};
/**
 * API key details
 */
export type GetKeyResponse = {
    /**
     * The API key information
     */
    data: GetKeyData;
};
/** @internal */
export type GetKeyRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    hash: string;
};
/** @internal */
export declare const GetKeyRequest$outboundSchema: z.ZodType<GetKeyRequest$Outbound, GetKeyRequest>;
export declare function getKeyRequestToJSON(getKeyRequest: GetKeyRequest): string;
/** @internal */
export declare const GetKeyData$inboundSchema: z.ZodType<GetKeyData, unknown>;
export declare function getKeyDataFromJSON(jsonString: string): SafeParseResult<GetKeyData, SDKValidationError>;
/** @internal */
export declare const GetKeyResponse$inboundSchema: z.ZodType<GetKeyResponse, unknown>;
export declare function getKeyResponseFromJSON(jsonString: string): SafeParseResult<GetKeyResponse, SDKValidationError>;
//# sourceMappingURL=getkey.d.ts.map