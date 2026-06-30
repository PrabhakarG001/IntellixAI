import * as z from "zod/v4";
/**
 * Configuration for the openrouter:experimental__search_models server tool
 */
export type SearchModelsServerToolConfig = {
    /**
     * Maximum number of models to return. Defaults to 5, max 20.
     */
    maxResults?: number | undefined;
};
/** @internal */
export type SearchModelsServerToolConfig$Outbound = {
    max_results?: number | undefined;
};
/** @internal */
export declare const SearchModelsServerToolConfig$outboundSchema: z.ZodType<SearchModelsServerToolConfig$Outbound, SearchModelsServerToolConfig>;
export declare function searchModelsServerToolConfigToJSON(searchModelsServerToolConfig: SearchModelsServerToolConfig): string;
//# sourceMappingURL=searchmodelsservertoolconfig.d.ts.map