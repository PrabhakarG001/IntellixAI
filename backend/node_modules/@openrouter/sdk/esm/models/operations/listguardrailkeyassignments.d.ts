import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";
export type ListGuardrailKeyAssignmentsGlobals = {
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
export type ListGuardrailKeyAssignmentsRequest = {
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
export type ListGuardrailKeyAssignmentsResponse = {
    result: models.ListKeyAssignmentsResponse;
};
/** @internal */
export type ListGuardrailKeyAssignmentsRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
    offset?: number | null | undefined;
    limit?: number | undefined;
};
/** @internal */
export declare const ListGuardrailKeyAssignmentsRequest$outboundSchema: z.ZodType<ListGuardrailKeyAssignmentsRequest$Outbound, ListGuardrailKeyAssignmentsRequest>;
export declare function listGuardrailKeyAssignmentsRequestToJSON(listGuardrailKeyAssignmentsRequest: ListGuardrailKeyAssignmentsRequest): string;
/** @internal */
export declare const ListGuardrailKeyAssignmentsResponse$inboundSchema: z.ZodType<ListGuardrailKeyAssignmentsResponse, unknown>;
export declare function listGuardrailKeyAssignmentsResponseFromJSON(jsonString: string): SafeParseResult<ListGuardrailKeyAssignmentsResponse, SDKValidationError>;
//# sourceMappingURL=listguardrailkeyassignments.d.ts.map