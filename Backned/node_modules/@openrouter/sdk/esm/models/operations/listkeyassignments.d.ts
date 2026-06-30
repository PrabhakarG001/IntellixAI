import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";
export type ListKeyAssignmentsGlobals = {
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
export type ListKeyAssignmentsRequest = {
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
export type ListKeyAssignmentsResponse = {
    result: models.ListKeyAssignmentsResponse;
};
/** @internal */
export type ListKeyAssignmentsRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    offset?: number | null | undefined;
    limit?: number | undefined;
};
/** @internal */
export declare const ListKeyAssignmentsRequest$outboundSchema: z.ZodType<ListKeyAssignmentsRequest$Outbound, ListKeyAssignmentsRequest>;
export declare function listKeyAssignmentsRequestToJSON(listKeyAssignmentsRequest: ListKeyAssignmentsRequest): string;
/** @internal */
export declare const ListKeyAssignmentsResponse$inboundSchema: z.ZodType<ListKeyAssignmentsResponse, unknown>;
export declare function listKeyAssignmentsResponseFromJSON(jsonString: string): SafeParseResult<ListKeyAssignmentsResponse, SDKValidationError>;
//# sourceMappingURL=listkeyassignments.d.ts.map