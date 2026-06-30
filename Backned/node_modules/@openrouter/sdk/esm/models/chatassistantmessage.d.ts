import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatAssistantImages, ChatAssistantImages$Outbound } from "./chatassistantimages.js";
import { ChatAudioOutput, ChatAudioOutput$Outbound } from "./chataudiooutput.js";
import { ChatContentItems, ChatContentItems$Outbound } from "./chatcontentitems.js";
import { ChatToolCall, ChatToolCall$Outbound } from "./chattoolcall.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningDetailUnion, ReasoningDetailUnion$Outbound } from "./reasoningdetailunion.js";
/**
 * Assistant message content
 */
export type ChatAssistantMessageContent = string | Array<ChatContentItems> | any;
export declare const ChatAssistantMessageRole: {
    readonly Assistant: "assistant";
};
export type ChatAssistantMessageRole = ClosedEnum<typeof ChatAssistantMessageRole>;
/**
 * Assistant message for requests and responses
 */
export type ChatAssistantMessage = {
    /**
     * Audio output data or reference
     */
    audio?: ChatAudioOutput | undefined;
    /**
     * Assistant message content
     */
    content?: string | Array<ChatContentItems> | any | null | undefined;
    /**
     * Generated images from image generation models
     */
    images?: Array<ChatAssistantImages> | undefined;
    /**
     * Optional name for the assistant
     */
    name?: string | undefined;
    /**
     * Reasoning output
     */
    reasoning?: string | null | undefined;
    /**
     * Reasoning details for extended thinking models
     */
    reasoningDetails?: Array<ReasoningDetailUnion> | undefined;
    /**
     * Refusal message if content was refused
     */
    refusal?: string | null | undefined;
    role: ChatAssistantMessageRole;
    /**
     * Tool calls made by the assistant
     */
    toolCalls?: Array<ChatToolCall> | undefined;
};
/** @internal */
export declare const ChatAssistantMessageContent$inboundSchema: z.ZodType<ChatAssistantMessageContent, unknown>;
/** @internal */
export type ChatAssistantMessageContent$Outbound = string | Array<ChatContentItems$Outbound> | any;
/** @internal */
export declare const ChatAssistantMessageContent$outboundSchema: z.ZodType<ChatAssistantMessageContent$Outbound, ChatAssistantMessageContent>;
export declare function chatAssistantMessageContentToJSON(chatAssistantMessageContent: ChatAssistantMessageContent): string;
export declare function chatAssistantMessageContentFromJSON(jsonString: string): SafeParseResult<ChatAssistantMessageContent, SDKValidationError>;
/** @internal */
export declare const ChatAssistantMessageRole$inboundSchema: z.ZodEnum<typeof ChatAssistantMessageRole>;
/** @internal */
export declare const ChatAssistantMessageRole$outboundSchema: z.ZodEnum<typeof ChatAssistantMessageRole>;
/** @internal */
export declare const ChatAssistantMessage$inboundSchema: z.ZodType<ChatAssistantMessage, unknown>;
/** @internal */
export type ChatAssistantMessage$Outbound = {
    audio?: ChatAudioOutput$Outbound | undefined;
    content?: string | Array<ChatContentItems$Outbound> | any | null | undefined;
    images?: Array<ChatAssistantImages$Outbound> | undefined;
    name?: string | undefined;
    reasoning?: string | null | undefined;
    reasoning_details?: Array<ReasoningDetailUnion$Outbound> | undefined;
    refusal?: string | null | undefined;
    role: string;
    tool_calls?: Array<ChatToolCall$Outbound> | undefined;
};
/** @internal */
export declare const ChatAssistantMessage$outboundSchema: z.ZodType<ChatAssistantMessage$Outbound, ChatAssistantMessage>;
export declare function chatAssistantMessageToJSON(chatAssistantMessage: ChatAssistantMessage): string;
export declare function chatAssistantMessageFromJSON(jsonString: string): SafeParseResult<ChatAssistantMessage, SDKValidationError>;
//# sourceMappingURL=chatassistantmessage.d.ts.map