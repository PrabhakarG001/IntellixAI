import * as z from "zod/v4";
import { ChatContentItems, ChatContentItems$Outbound } from "./chatcontentitems.js";
/**
 * Tool response content
 */
export type ChatToolMessageContent = string | Array<ChatContentItems>;
/**
 * Tool response message
 */
export type ChatToolMessage = {
    /**
     * Tool response content
     */
    content: string | Array<ChatContentItems>;
    role: "tool";
    /**
     * ID of the assistant message tool call this message responds to
     */
    toolCallId: string;
};
/** @internal */
export type ChatToolMessageContent$Outbound = string | Array<ChatContentItems$Outbound>;
/** @internal */
export declare const ChatToolMessageContent$outboundSchema: z.ZodType<ChatToolMessageContent$Outbound, ChatToolMessageContent>;
export declare function chatToolMessageContentToJSON(chatToolMessageContent: ChatToolMessageContent): string;
/** @internal */
export type ChatToolMessage$Outbound = {
    content: string | Array<ChatContentItems$Outbound>;
    role: "tool";
    tool_call_id: string;
};
/** @internal */
export declare const ChatToolMessage$outboundSchema: z.ZodType<ChatToolMessage$Outbound, ChatToolMessage>;
export declare function chatToolMessageToJSON(chatToolMessage: ChatToolMessage): string;
//# sourceMappingURL=chattoolmessage.d.ts.map