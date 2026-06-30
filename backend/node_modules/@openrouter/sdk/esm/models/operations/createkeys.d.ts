import * as z from "zod/v4";
import { OpenEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
export type CreateKeysGlobals = {
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
 * Type of limit reset for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday.
 */
export declare const CreateKeysLimitReset: {
    readonly Daily: "daily";
    readonly Weekly: "weekly";
    readonly Monthly: "monthly";
};
/**
 * Type of limit reset for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday.
 */
export type CreateKeysLimitReset = OpenEnum<typeof CreateKeysLimitReset>;
export type CreateKeysRequestBody = {
    /**
     * Optional user ID of the key creator. Only meaningful for organization-owned keys where a specific member is creating the key.
     */
    creatorUserId?: string | null | undefined;
    /**
     * Optional ISO 8601 UTC timestamp when the API key should expire. Must be UTC, other timezones will be rejected
     */
    expiresAt?: Date | null | undefined;
    /**
     * Whether to include BYOK usage in the limit
     */
    includeByokInLimit?: boolean | undefined;
    /**
     * Optional spending limit for the API key in USD
     */
    limit?: number | null | undefined;
    /**
     * Type of limit reset for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday.
     */
    limitReset?: CreateKeysLimitReset | null | undefined;
    /**
     * Name for the new API key
     */
    name: string;
    /**
     * The workspace to create the API key in. Defaults to the default workspace if not provided.
     */
    workspaceId?: string | undefined;
};
export type CreateKeysRequest = {
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
    requestBody: CreateKeysRequestBody;
};
/**
 * The created API key information
 */
export type CreateKeysData = {
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
 * API key created successfully
 */
export type CreateKeysResponse = {
    /**
     * The created API key information
     */
    data: CreateKeysData;
    /**
     * The actual API key string (only shown once)
     */
    key: string;
};
/** @internal */
export declare const CreateKeysLimitReset$outboundSchema: z.ZodType<string, CreateKeysLimitReset>;
/** @internal */
export type CreateKeysRequestBody$Outbound = {
    creator_user_id?: string | null | undefined;
    expires_at?: string | null | undefined;
    include_byok_in_limit?: boolean | undefined;
    limit?: number | null | undefined;
    limit_reset?: string | null | undefined;
    name: string;
    workspace_id?: string | undefined;
};
/** @internal */
export declare const CreateKeysRequestBody$outboundSchema: z.ZodType<CreateKeysRequestBody$Outbound, CreateKeysRequestBody>;
export declare function createKeysRequestBodyToJSON(createKeysRequestBody: CreateKeysRequestBody): string;
/** @internal */
export type CreateKeysRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    RequestBody: CreateKeysRequestBody$Outbound;
};
/** @internal */
export declare const CreateKeysRequest$outboundSchema: z.ZodType<CreateKeysRequest$Outbound, CreateKeysRequest>;
export declare function createKeysRequestToJSON(createKeysRequest: CreateKeysRequest): string;
/** @internal */
export declare const CreateKeysData$inboundSchema: z.ZodType<CreateKeysData, unknown>;
export declare function createKeysDataFromJSON(jsonString: string): SafeParseResult<CreateKeysData, SDKValidationError>;
/** @internal */
export declare const CreateKeysResponse$inboundSchema: z.ZodType<CreateKeysResponse, unknown>;
export declare function createKeysResponseFromJSON(jsonString: string): SafeParseResult<CreateKeysResponse, SDKValidationError>;
//# sourceMappingURL=createkeys.d.ts.map