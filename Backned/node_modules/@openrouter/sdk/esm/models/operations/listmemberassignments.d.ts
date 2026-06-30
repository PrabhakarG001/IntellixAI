import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";
export type ListMemberAssignmentsGlobals = {
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
export type ListMemberAssignmentsRequest = {
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
export type ListMemberAssignmentsResponse = {
    result: models.ListMemberAssignmentsResponse;
};
/** @internal */
export type ListMemberAssignmentsRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    offset?: number | null | undefined;
    limit?: number | undefined;
};
/** @internal */
export declare const ListMemberAssignmentsRequest$outboundSchema: z.ZodType<ListMemberAssignmentsRequest$Outbound, ListMemberAssignmentsRequest>;
export declare function listMemberAssignmentsRequestToJSON(listMemberAssignmentsRequest: ListMemberAssignmentsRequest): string;
/** @internal */
export declare const ListMemberAssignmentsResponse$inboundSchema: z.ZodType<ListMemberAssignmentsResponse, unknown>;
export declare function listMemberAssignmentsResponseFromJSON(jsonString: string): SafeParseResult<ListMemberAssignmentsResponse, SDKValidationError>;
//# sourceMappingURL=listmemberassignments.d.ts.map