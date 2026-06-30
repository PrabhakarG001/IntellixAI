import * as z from "zod/v4";
/**
 * Default text response format
 */
export type ChatFormatTextConfig = {
    type: "text";
};
/** @internal */
export type ChatFormatTextConfig$Outbound = {
    type: "text";
};
/** @internal */
export declare const ChatFormatTextConfig$outboundSchema: z.ZodType<ChatFormatTextConfig$Outbound, ChatFormatTextConfig>;
export declare function chatFormatTextConfigToJSON(chatFormatTextConfig: ChatFormatTextConfig): string;
//# sourceMappingURL=chatformattextconfig.d.ts.map