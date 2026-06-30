import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { WebSearchConfig, WebSearchConfig$Outbound } from "./websearchconfig.js";
export declare const OpenRouterWebSearchServerToolType: {
    readonly OpenrouterWebSearch: "openrouter:web_search";
};
export type OpenRouterWebSearchServerToolType = ClosedEnum<typeof OpenRouterWebSearchServerToolType>;
/**
 * OpenRouter built-in server tool: searches the web for current information
 */
export type OpenRouterWebSearchServerTool = {
    parameters?: WebSearchConfig | undefined;
    type: OpenRouterWebSearchServerToolType;
};
/** @internal */
export declare const OpenRouterWebSearchServerToolType$outboundSchema: z.ZodEnum<typeof OpenRouterWebSearchServerToolType>;
/** @internal */
export type OpenRouterWebSearchServerTool$Outbound = {
    parameters?: WebSearchConfig$Outbound | undefined;
    type: string;
};
/** @internal */
export declare const OpenRouterWebSearchServerTool$outboundSchema: z.ZodType<OpenRouterWebSearchServerTool$Outbound, OpenRouterWebSearchServerTool>;
export declare function openRouterWebSearchServerToolToJSON(openRouterWebSearchServerTool: OpenRouterWebSearchServerTool): string;
//# sourceMappingURL=openrouterwebsearchservertool.d.ts.map