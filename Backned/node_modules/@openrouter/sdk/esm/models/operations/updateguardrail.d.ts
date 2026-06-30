import * as z from "zod/v4";
import * as models from "../index.js";
export type UpdateGuardrailGlobals = {
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
export type UpdateGuardrailRequest = {
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
     * The unique identifier of the guardrail to update
     */
    id: string;
    updateGuardrailRequest: models.UpdateGuardrailRequest;
};
/** @internal */
export type UpdateGuardrailRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
    UpdateGuardrailRequest: models.UpdateGuardrailRequest$Outbound;
};
/** @internal */
export declare const UpdateGuardrailRequest$outboundSchema: z.ZodType<UpdateGuardrailRequest$Outbound, UpdateGuardrailRequest>;
export declare function updateGuardrailRequestToJSON(updateGuardrailRequest: UpdateGuardrailRequest): string;
//# sourceMappingURL=updateguardrail.d.ts.map