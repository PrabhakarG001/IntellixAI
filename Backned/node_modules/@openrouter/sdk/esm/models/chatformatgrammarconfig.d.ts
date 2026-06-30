import * as z from "zod/v4";
/**
 * Custom grammar response format
 */
export type ChatFormatGrammarConfig = {
    /**
     * Custom grammar for text generation
     */
    grammar: string;
    type: "grammar";
};
/** @internal */
export type ChatFormatGrammarConfig$Outbound = {
    grammar: string;
    type: "grammar";
};
/** @internal */
export declare const ChatFormatGrammarConfig$outboundSchema: z.ZodType<ChatFormatGrammarConfig$Outbound, ChatFormatGrammarConfig>;
export declare function chatFormatGrammarConfigToJSON(chatFormatGrammarConfig: ChatFormatGrammarConfig): string;
//# sourceMappingURL=chatformatgrammarconfig.d.ts.map