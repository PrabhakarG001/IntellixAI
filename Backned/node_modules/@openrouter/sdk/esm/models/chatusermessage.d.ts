import * as z from "zod/v4";
import { ChatContentItems, ChatContentItems$Outbound } from "./chatcontentitems.js";
/**
 * User message content
 */
export type ChatUserMessageContent = string | Array<ChatContentItems>;
/**
 * User message
 */
export type ChatUserMessage = {
    /**
     * User message content
     */
    content: string | Array<ChatContentItems>;
    /**
     * Optional name for the user
     */
    name?: string | undefined;
    role: "user";
};
/** @internal */
export type ChatUserMessageContent$Outbound = string | Array<ChatContentItems$Outbound>;
/** @internal */
export declare const ChatUserMessageContent$outboundSchema: z.ZodType<ChatUserMessageContent$Outbound, ChatUserMessageContent>;
export declare function chatUserMessageContentToJSON(chatUserMessageContent: ChatUserMessageContent): string;
/** @internal */
export type ChatUserMessage$Outbound = {
    content: string | Array<ChatContentItems$Outbound>;
    name?: string | undefined;
    role: "user";
};
/** @internal */
export declare const ChatUserMessage$outboundSchema: z.ZodType<ChatUserMessage$Outbound, ChatUserMessage>;
export declare function chatUserMessageToJSON(chatUserMessage: ChatUserMessage): string;
//# sourceMappingURL=chatusermessage.d.ts.map