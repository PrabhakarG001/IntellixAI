import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";
export type ListWorkspacesGlobals = {
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
export type ListWorkspacesRequest = {
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
};
export type ListWorkspacesResponse = {
    result: models.ListWorkspacesResponse;
};
/** @internal */
export type ListWorkspacesRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    offset?: number | null | undefined;
    limit?: number | undefined;
};
/** @internal */
export declare const ListWorkspacesRequest$outboundSchema: z.ZodType<ListWorkspacesRequest$Outbound, ListWorkspacesRequest>;
export declare function listWorkspacesRequestToJSON(listWorkspacesRequest: ListWorkspacesRequest): string;
/** @internal */
export declare const ListWorkspacesResponse$inboundSchema: z.ZodType<ListWorkspacesResponse, unknown>;
export declare function listWorkspacesResponseFromJSON(jsonString: string): SafeParseResult<ListWorkspacesResponse, SDKValidationError>;
//# sourceMappingURL=listworkspaces.d.ts.map