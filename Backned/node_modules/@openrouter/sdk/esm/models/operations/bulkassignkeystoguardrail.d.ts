import * as z from "zod/v4";
import * as models from "../index.js";
export type BulkAssignKeysToGuardrailGlobals = {
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
export type BulkAssignKeysToGuardrailRequest = {
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
    bulkAssignKeysRequest: models.BulkAssignKeysRequest;
};
/** @internal */
export type BulkAssignKeysToGuardrailRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
    BulkAssignKeysRequest: models.BulkAssignKeysRequest$Outbound;
};
/** @internal */
export declare const BulkAssignKeysToGuardrailRequest$outboundSchema: z.ZodType<BulkAssignKeysToGuardrailRequest$Outbound, BulkAssignKeysToGuardrailRequest>;
export declare function bulkAssignKeysToGuardrailRequestToJSON(bulkAssignKeysToGuardrailRequest: BulkAssignKeysToGuardrailRequest): string;
//# sourceMappingURL=bulkassignkeystoguardrail.d.ts.map