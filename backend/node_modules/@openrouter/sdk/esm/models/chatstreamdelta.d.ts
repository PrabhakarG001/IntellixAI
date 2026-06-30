import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatAudioOutput } from "./chataudiooutput.js";
import { ChatStreamToolCall } from "./chatstreamtoolcall.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningDetailUnion } from "./reasoningdetailunion.js";
/**
 * The role of the message author
 */
export declare const ChatStreamDeltaRole: {
    readonly Assistant: "assistant";
};
/**
 * The role of the message author
 */
export type ChatStreamDeltaRole = ClosedEnum<typeof ChatStreamDeltaRole>;
/**
 * Delta changes in streaming response
 */
export type ChatStreamDelta = {
    audio?: ChatAudioOutput | undefined;
    /**
     * Message content delta
     */
    content?: string | null | undefined;
    /**
     * Reasoning content delta
     */
    reasoning?: string | null | undefined;
    /**
     * Reasoning details for extended thinking models
     */
    reasoningDetails?: Array<ReasoningDetailUnion> | undefined;
    /**
     * Refusal message delta
     */
    refusal?: string | null | undefined;
    /**
     * The role of the message author
     */
    role?: ChatStreamDeltaRole | undefined;
    /**
     * Tool calls delta
     */
    toolCalls?: Array<ChatStreamToolCall> | undefined;
};
/** @internal */
export declare const ChatStreamDeltaRole$inboundSchema: z.ZodEnum<typeof ChatStreamDeltaRole>;
/** @internal */
export declare const ChatStreamDelta$inboundSchema: z.ZodType<ChatStreamDelta, unknown>;
export declare function chatStreamDeltaFromJSON(jsonString: string): SafeParseResult<ChatStreamDelta, SDKValidationError>;
//# sourceMappingURL=chatstreamdelta.d.ts.map