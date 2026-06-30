import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { WebSearchEngine } from "./websearchengine.js";
export declare const WebSearchPluginType: {
    readonly Approximate: "approximate";
};
export type WebSearchPluginType = ClosedEnum<typeof WebSearchPluginType>;
/**
 * Approximate user location for location-biased search results. Passed through to native providers that support it (e.g. Anthropic).
 */
export type UserLocation = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type: WebSearchPluginType;
};
export type WebSearchPlugin = {
    /**
     * Set to false to disable the web-search plugin for this request. Defaults to true.
     */
    enabled?: boolean | undefined;
    /**
     * The search engine to use for web search.
     */
    engine?: WebSearchEngine | undefined;
    /**
     * A list of domains to exclude from web search results. Supports wildcards (e.g. "*.substack.com") and path filtering (e.g. "openai.com/blog").
     */
    excludeDomains?: Array<string> | undefined;
    id: "web";
    /**
     * A list of domains to restrict web search results to. Supports wildcards (e.g. "*.substack.com") and path filtering (e.g. "openai.com/blog").
     */
    includeDomains?: Array<string> | undefined;
    maxResults?: number | undefined;
    /**
     * Maximum number of times the model can invoke web search in a single turn. Passed through to native providers that support it (e.g. Anthropic).
     */
    maxUses?: number | undefined;
    searchPrompt?: string | undefined;
    userLocation?: UserLocation | null | undefined;
};
/** @internal */
export declare const WebSearchPluginType$outboundSchema: z.ZodEnum<typeof WebSearchPluginType>;
/** @internal */
export type UserLocation$Outbound = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type: string;
};
/** @internal */
export declare const UserLocation$outboundSchema: z.ZodType<UserLocation$Outbound, UserLocation>;
export declare function userLocationToJSON(userLocation: UserLocation): string;
/** @internal */
export type WebSearchPlugin$Outbound = {
    enabled?: boolean | undefined;
    engine?: string | undefined;
    exclude_domains?: Array<string> | undefined;
    id: "web";
    include_domains?: Array<string> | undefined;
    max_results?: number | undefined;
    max_uses?: number | undefined;
    search_prompt?: string | undefined;
    user_location?: UserLocation$Outbound | null | undefined;
};
/** @internal */
export declare const WebSearchPlugin$outboundSchema: z.ZodType<WebSearchPlugin$Outbound, WebSearchPlugin>;
export declare function webSearchPluginToJSON(webSearchPlugin: WebSearchPlugin): string;
//# sourceMappingURL=websearchplugin.d.ts.map