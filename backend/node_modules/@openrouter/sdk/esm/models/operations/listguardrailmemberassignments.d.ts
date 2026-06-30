import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";
export type ListGuardrailMemberAssignmentsGlobals = {
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
export type ListGuardrailMemberAssignmentsRequest = {
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
     * The unique identifier of the guardrail
     */
    id: string;
    /**
     * Number of records to skip for pagination
     */
    offset?: number | null | undefined;
    /**
     * Maximum number of records to return (max 100)
     */
    limit?: number | undefined;
};
export type ListGuardrailMemberAssignmentsResponse = {
    result: models.ListMemberAssignmentsResponse;
};
/** @internal */
export type ListGuardrailMemberAssignmentsRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
    offset?: number | null | undefined;
    limit?: number | undefined;
};
/** @internal */
export declare const ListGuardrailMemberAssignmentsRequest$outboundSchema: z.ZodType<ListGuardrailMemberAssignmentsRequest$Outbound, ListGuardrailMemberAssignmentsRequest>;
export declare function listGuardrailMemberAssignmentsRequestToJSON(listGuardrailMemberAssignmentsRequest: ListGuardrailMemberAssignmentsRequest): string;
/** @internal */
export declare const ListGuardrailMemberAssignmentsResponse$inboundSchema: z.ZodType<ListGuardrailMemberAssignmentsResponse, unknown>;
export declare function listGuardrailMemberAssignmentsResponseFromJSON(jsonString: string): SafeParseResult<ListGuardrailMemberAssignmentsResponse, SDKValidationError>;
//# sourceMappingURL=listguardrailmemberassignments.d.ts.map