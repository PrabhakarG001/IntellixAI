import * as z from "zod/v4";
import * as models from "../index.js";
export type BulkUnassignMembersFromGuardrailGlobals = {
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
export type BulkUnassignMembersFromGuardrailRequest = {
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
    bulkUnassignMembersRequest: models.BulkUnassignMembersRequest;
};
/** @internal */
export type BulkUnassignMembersFromGuardrailRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
    BulkUnassignMembersRequest: models.BulkUnassignMembersRequest$Outbound;
};
/** @internal */
export declare const BulkUnassignMembersFromGuardrailRequest$outboundSchema: z.ZodType<BulkUnassignMembersFromGuardrailRequest$Outbound, BulkUnassignMembersFromGuardrailRequest>;
export declare function bulkUnassignMembersFromGuardrailRequestToJSON(bulkUnassignMembersFromGuardrailRequest: BulkUnassignMembersFromGuardrailRequest): string;
//# sourceMappingURL=bulkunassignmembersfromguardrail.d.ts.map