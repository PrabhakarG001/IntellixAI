import * as z from "zod/v4";
import { WebSearchServerToolConfig, WebSearchServerToolConfig$Outbound } from "./websearchservertoolconfig.js";
/**
 * OpenRouter built-in server tool: searches the web for current information
 */
export type WebSearchServerToolOpenRouter = {
    /**
     * Configuration for the openrouter:web_search server tool
     */
    parameters?: WebSearchServerToolConfig | undefined;
    type: "openrouter:web_search";
};
/** @internal */
export type WebSearchServerToolOpenRouter$Outbound = {
    parameters?: WebSearchServerToolConfig$Outbound | undefined;
    type: "openrouter:web_search";
};
/** @internal */
export declare const WebSearchServerToolOpenRouter$outboundSchema: z.ZodType<WebSearchServerToolOpenRouter$Outbound, WebSearchServerToolOpenRouter>;
export declare function webSearchServerToolOpenRouterToJSON(webSearchServerToolOpenRouter: WebSearchServerToolOpenRouter): string;
//# sourceMappingURL=websearchservertoolopenrouter.d.ts.map