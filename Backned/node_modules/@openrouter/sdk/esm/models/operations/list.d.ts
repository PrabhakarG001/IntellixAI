import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
export type ListGlobals = {
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
export type ListRequest = {
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
     * Whether to include disabled API keys in the response
     */
    includeDisabled?: boolean | undefined;
    /**
     * Number of API keys to skip for pagination
     */
    offset?: number | null | undefined;
    /**
     * Filter API keys by workspace ID. By default, keys in the default workspace are returned.
     */
    workspaceId?: string | undefined;
};
export type ListData = {
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
 * List of API keys
 */
export type ListResponse = {
    /**
     * List of API keys
     */
    data: Array<ListData>;
};
/** @internal */
export type ListRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    include_disabled?: boolean | undefined;
    offset?: number | null | undefined;
    workspace_id?: string | undefined;
};
/** @internal */
export declare const ListRequest$outboundSchema: z.ZodType<ListRequest$Outbound, ListRequest>;
export declare function listRequestToJSON(listRequest: ListRequest): string;
/** @internal */
export declare const ListData$inboundSchema: z.ZodType<ListData, unknown>;
export declare function listDataFromJSON(jsonString: string): SafeParseResult<ListData, SDKValidationError>;
/** @internal */
export declare const ListResponse$inboundSchema: z.ZodType<ListResponse, unknown>;
export declare function listResponseFromJSON(jsonString: string): SafeParseResult<ListResponse, SDKValidationError>;
//# sourceMappingURL=list.d.ts.map