import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { WebFetchServerToolConfig, WebFetchServerToolConfig$Outbound } from "./webfetchservertoolconfig.js";
export declare const WebFetchServerToolType: {
    readonly OpenrouterWebFetch: "openrouter:web_fetch";
};
export type WebFetchServerToolType = ClosedEnum<typeof WebFetchServerToolType>;
/**
 * OpenRouter built-in server tool: fetches full content from a URL (web page or PDF)
 */
export type WebFetchServerTool = {
    /**
     * Configuration for the openrouter:web_fetch server tool
     */
    parameters?: WebFetchServerToolConfig | undefined;
    type: WebFetchServerToolType;
};
/** @internal */
export declare const WebFetchServerToolType$outboundSchema: z.ZodEnum<typeof WebFetchServerToolType>;
/** @internal */
export type WebFetchServerTool$Outbound = {
    parameters?: WebFetchServerToolConfig$Outbound | undefined;
    type: string;
};
/** @internal */
export declare const WebFetchServerTool$outboundSchema: z.ZodType<WebFetchServerTool$Outbound, WebFetchServerTool>;
export declare function webFetchServerToolToJSON(webFetchServerTool: WebFetchServerTool): string;
//# sourceMappingURL=webfetchservertool.d.ts.map