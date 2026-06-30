import * as z from "zod/v4";
import { ChatContentText, ChatContentText$Outbound } from "./chatcontenttext.js";
/**
 * Developer message content
 */
export type ChatDeveloperMessageContent = string | Array<ChatContentText>;
/**
 * Developer message
 */
export type ChatDeveloperMessage = {
    /**
     * Developer message content
     */
    content: string | Array<ChatContentText>;
    /**
     * Optional name for the developer message
     */
    name?: string | undefined;
    role: "developer";
};
/** @internal */
export type ChatDeveloperMessageContent$Outbound = string | Array<ChatContentText$Outbound>;
/** @internal */
export declare const ChatDeveloperMessageContent$outboundSchema: z.ZodType<ChatDeveloperMessageContent$Outbound, ChatDeveloperMessageContent>;
export declare function chatDeveloperMessageContentToJSON(chatDeveloperMessageContent: ChatDeveloperMessageContent): string;
/** @internal */
export type ChatDeveloperMessage$Outbound = {
    content: string | Array<ChatContentText$Outbound>;
    name?: string | undefined;
    role: "developer";
};
/** @internal */
export declare const ChatDeveloperMessage$outboundSchema: z.ZodType<ChatDeveloperMessage$Outbound, ChatDeveloperMessage>;
export declare function chatDeveloperMessageToJSON(chatDeveloperMessage: ChatDeveloperMessage): string;
//# sourceMappingURL=chatdevelopermessage.d.ts.map