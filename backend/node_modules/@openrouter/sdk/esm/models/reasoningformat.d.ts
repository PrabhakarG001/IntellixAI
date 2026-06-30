import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const ReasoningFormat: {
    readonly Unknown: "unknown";
    readonly OpenaiResponsesV1: "openai-responses-v1";
    readonly AzureOpenaiResponsesV1: "azure-openai-responses-v1";
    readonly XaiResponsesV1: "xai-responses-v1";
    readonly AnthropicClaudeV1: "anthropic-claude-v1";
    readonly GoogleGeminiV1: "google-gemini-v1";
};
export type ReasoningFormat = OpenEnum<typeof ReasoningFormat>;
/** @internal */
export declare const ReasoningFormat$inboundSchema: z.ZodType<ReasoningFormat, unknown>;
/** @internal */
export declare const ReasoningFormat$outboundSchema: z.ZodType<string, ReasoningFormat>;
//# sourceMappingURL=reasoningformat.d.ts.map