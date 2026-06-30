import * as z from "zod/v4";
import { ChatJsonSchemaConfig, ChatJsonSchemaConfig$Outbound } from "./chatjsonschemaconfig.js";
/**
 * JSON Schema response format for structured outputs
 */
export type ChatFormatJsonSchemaConfig = {
    /**
     * JSON Schema configuration object
     */
    jsonSchema: ChatJsonSchemaConfig;
    type: "json_schema";
};
/** @internal */
export type ChatFormatJsonSchemaConfig$Outbound = {
    json_schema: ChatJsonSchemaConfig$Outbound;
    type: "json_schema";
};
/** @internal */
export declare const ChatFormatJsonSchemaConfig$outboundSchema: z.ZodType<ChatFormatJsonSchemaConfig$Outbound, ChatFormatJsonSchemaConfig>;
export declare function chatFormatJsonSchemaConfigToJSON(chatFormatJsonSchemaConfig: ChatFormatJsonSchemaConfig): string;
//# sourceMappingURL=chatformatjsonschemaconfig.d.ts.map