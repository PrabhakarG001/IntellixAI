import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";
export type ListGuardrailsGlobals = {
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
export type ListGuardrailsRequest = {
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
     * Number of records to skip for pagination
     */
    offset?: number | null | undefined;
    /**
     * Maximum number of records to return (max 100)
     */
    limit?: number | undefined;
    /**
     * Filter guardrails by workspace ID. By default, guardrails in the default workspace are returned.
     */
    workspaceId?: string | undefined;
};
export type ListGuardrailsResponse = {
    result: models.ListGuardrailsResponse;
};
/** @internal */
export type ListGuardrailsRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    offset?: number | null | undefined;
    limit?: number | undefined;
    workspace_id?: string | undefined;
};
/** @internal */
export declare const ListGuardrailsRequest$outboundSchema: z.ZodType<ListGuardrailsRequest$Outbound, ListGuardrailsRequest>;
export declare function listGuardrailsRequestToJSON(listGuardrailsRequest: ListGuardrailsRequest): string;
/** @internal */
export declare const ListGuardrailsResponse$inboundSchema: z.ZodType<ListGuardrailsResponse, unknown>;
export declare function listGuardrailsResponseFromJSON(jsonString: string): SafeParseResult<ListGuardrailsResponse, SDKValidationError>;
//# sourceMappingURL=listguardrails.d.ts.map