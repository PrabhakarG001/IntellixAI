import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { SearchModelsServerToolConfig, SearchModelsServerToolConfig$Outbound } from "./searchmodelsservertoolconfig.js";
export declare const ChatSearchModelsServerToolType: {
    readonly OpenrouterExperimentalSearchModels: "openrouter:experimental__search_models";
};
export type ChatSearchModelsServerToolType = ClosedEnum<typeof ChatSearchModelsServerToolType>;
/**
 * OpenRouter built-in server tool: searches and filters AI models available on OpenRouter
 */
export type ChatSearchModelsServerTool = {
    /**
     * Configuration for the openrouter:experimental__search_models server tool
     */
    parameters?: SearchModelsServerToolConfig | undefined;
    type: ChatSearchModelsServerToolType;
};
/** @internal */
export declare const ChatSearchModelsServerToolType$outboundSchema: z.ZodEnum<typeof ChatSearchModelsServerToolType>;
/** @internal */
export type ChatSearchModelsServerTool$Outbound = {
    parameters?: SearchModelsServerToolConfig$Outbound | undefined;
    type: string;
};
/** @internal */
export declare const ChatSearchModelsServerTool$outboundSchema: z.ZodType<ChatSearchModelsServerTool$Outbound, ChatSearchModelsServerTool>;
export declare function chatSearchModelsServerToolToJSON(chatSearchModelsServerTool: ChatSearchModelsServerTool): string;
//# sourceMappingURL=chatsearchmodelsservertool.d.ts.map