import * as z from "zod/v4";
import { ChatAssistantMessage, ChatAssistantMessage$Outbound } from "./chatassistantmessage.js";
import { ChatDeveloperMessage, ChatDeveloperMessage$Outbound } from "./chatdevelopermessage.js";
import { ChatSystemMessage, ChatSystemMessage$Outbound } from "./chatsystemmessage.js";
import { ChatToolMessage, ChatToolMessage$Outbound } from "./chattoolmessage.js";
import { ChatUserMessage, ChatUserMessage$Outbound } from "./chatusermessage.js";
/**
 * Chat completion message with role-based discrimination
 */
export type ChatMessages = (ChatAssistantMessage & {
    role: "assistant";
}) | ChatDeveloperMessage | ChatSystemMessage | ChatToolMessage | ChatUserMessage;
/** @internal */
export type ChatMessages$Outbound = (ChatAssistantMessage$Outbound & {
    role: "assistant";
}) | ChatDeveloperMessage$Outbound | ChatSystemMessage$Outbound | ChatToolMessage$Outbound | ChatUserMessage$Outbound;
/** @internal */
export declare const ChatMessages$outboundSchema: z.ZodType<ChatMessages$Outbound, ChatMessages>;
export declare function chatMessagesToJSON(chatMessages: ChatMessages): string;
//# sourceMappingURL=chatmessages.d.ts.map