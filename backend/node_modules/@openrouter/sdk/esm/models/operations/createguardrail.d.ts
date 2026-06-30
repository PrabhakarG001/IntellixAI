import * as z from "zod/v4";
import * as models from "../index.js";
export type CreateGuardrailGlobals = {
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
export type CreateGuardrailRequest = {
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
    createGuardrailRequest: models.CreateGuardrailRequest;
};
/** @internal */
export type CreateGuardrailRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    CreateGuardrailRequest: models.CreateGuardrailRequest$Outbound;
};
/** @internal */
export declare const CreateGuardrailRequest$outboundSchema: z.ZodType<CreateGuardrailRequest$Outbound, CreateGuardrailRequest>;
export declare function createGuardrailRequestToJSON(createGuardrailRequest: CreateGuardrailRequest): string;
//# sourceMappingURL=createguardrail.d.ts.map