import * as z from "zod/v4";
export type ListModelsCountGlobals = {
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
export type ListModelsCountRequest = {
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
     * Filter models by output modality. Accepts a comma-separated list of modalities (text, image, audio, embeddings) or "all" to include all models. Defaults to "text".
     */
    outputModalities?: string | undefined;
};
/** @internal */
export type ListModelsCountRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    output_modalities?: string | undefined;
};
/** @internal */
export declare const ListModelsCountRequest$outboundSchema: z.ZodType<ListModelsCountRequest$Outbound, ListModelsCountRequest>;
export declare function listModelsCountRequestToJSON(listModelsCountRequest: ListModelsCountRequest): string;
//# sourceMappingURL=listmodelscount.d.ts.map