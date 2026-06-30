import * as z from "zod/v4";
/**
 * Python code response format
 */
export type ChatFormatPythonConfig = {
    type: "python";
};
/** @internal */
export type ChatFormatPythonConfig$Outbound = {
    type: "python";
};
/** @internal */
export declare const ChatFormatPythonConfig$outboundSchema: z.ZodType<ChatFormatPythonConfig$Outbound, ChatFormatPythonConfig>;
export declare function chatFormatPythonConfigToJSON(chatFormatPythonConfig: ChatFormatPythonConfig): string;
//# sourceMappingURL=chatformatpythonconfig.d.ts.map