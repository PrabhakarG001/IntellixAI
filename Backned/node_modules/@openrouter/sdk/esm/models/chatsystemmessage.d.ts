import * as z from "zod/v4";
import { ChatContentText, ChatContentText$Outbound } from "./chatcontenttext.js";
/**
 * System message content
 */
export type ChatSystemMessageContent = string | Array<ChatContentText>;
/**
 * System message for setting behavior
 */
export type ChatSystemMessage = {
    /**
     * System message content
     */
    content: string | Array<ChatContentText>;
    /**
     * Optional name for the system message
     */
    name?: string | undefined;
    role: "system";
};
/** @internal */
export type ChatSystemMessageContent$Outbound = string | Array<ChatContentText$Outbound>;
/** @internal */
export declare const ChatSystemMessageContent$outboundSchema: z.ZodType<ChatSystemMessageContent$Outbound, ChatSystemMessageContent>;
export declare function chatSystemMessageContentToJSON(chatSystemMessageContent: ChatSystemMessageContent): string;
/** @internal */
export type ChatSystemMessage$Outbound = {
    content: string | Array<ChatContentText$Outbound>;
    name?: string | undefined;
    role: "system";
};
/** @internal */
export declare const ChatSystemMessage$outboundSchema: z.ZodType<ChatSystemMessage$Outbound, ChatSystemMessage>;
export declare function chatSystemMessageToJSON(chatSystemMessage: ChatSystemMessage): string;
//# sourceMappingURL=chatsystemmessage.d.ts.map