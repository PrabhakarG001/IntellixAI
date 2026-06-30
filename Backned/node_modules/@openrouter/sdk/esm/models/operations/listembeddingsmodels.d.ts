import * as z from "zod/v4";
export type ListEmbeddingsModelsGlobals = {
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
export type ListEmbeddingsModelsRequest = {
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
/** @internal */
export type ListEmbeddingsModelsRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
};
/** @internal */
export declare const ListEmbeddingsModelsRequest$outboundSchema: z.ZodType<ListEmbeddingsModelsRequest$Outbound, ListEmbeddingsModelsRequest>;
export declare function listEmbeddingsModelsRequestToJSON(listEmbeddingsModelsRequest: ListEmbeddingsModelsRequest): string;
//# sourceMappingURL=listembeddingsmodels.d.ts.map