import { EasyInputMessageRoleUser, EasyInputMessageRoleSystem, EasyInputMessageRoleAssistant, EasyInputMessageRoleDeveloper, } from "../models/easyinputmessage.js";
import { extractMessageFromResponse } from "./stream-transformers.js";
/**
 * Type guard for ChatToolMessage
 */
function isToolResponseMessage(msg) {
    return msg.role === "tool";
}
/**
 * Type guard for ChatAssistantMessage
 */
function isAssistantMessage(msg) {
    return msg.role === "assistant";
}
/**
 * Maps chat role strings to OpenResponses role types
 */
function mapChatRole(role) {
    switch (role) {
        case "user":
            return EasyInputMessageRoleUser.User;
        case "system":
            return EasyInputMessageRoleSystem.System;
        case "assistant":
            return EasyInputMessageRoleAssistant.Assistant;
        case "developer":
            return EasyInputMessageRoleDeveloper.Developer;
        default: {
            const exhaustiveCheck = role;
            throw new Error(`Unhandled role type: ${exhaustiveCheck}`);
        }
    }
}
/**
 * Convert message content to a string representation.
 * Handles string, null, undefined, and object content types.
 */
function contentToString(content) {
    if (typeof content === "string") {
        return content;
    }
    if (content === null || content === undefined) {
        return "";
    }
    return JSON.stringify(content);
}
/**
 * Convert OpenAI chat-style messages to OpenResponses input format.
 *
 * This function transforms Message[] (OpenAI chat format) to OpenResponsesInput
 * format that can be passed directly to callModel().
 *
 * @example
 * ```typescript
 * import { fromChatMessages } from '@openrouter/sdk';
 *
 * const chatMessages = [
 *   { role: "system", content: "You are a helpful assistant." },
 *   { role: "user", content: "Hello!" },
 * ];
 *
 * const response = openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: fromChatMessages(chatMessages),
 * });
 * ```
 */
export function fromChatMessages(messages) {
    return messages.map((msg) => {
        if (isToolResponseMessage(msg)) {
            return {
                type: "function_call_output",
                callId: msg.toolCallId,
                output: contentToString(msg.content),
            };
        }
        if (isAssistantMessage(msg)) {
            return {
                role: mapChatRole("assistant"),
                content: contentToString(msg.content),
            };
        }
        // System, user, developer messages
        return {
            role: mapChatRole(msg.role),
            content: contentToString(msg.content),
        };
    });
}
/**
 * Convert an OpenResponses response to OpenAI chat message format.
 *
 * This function transforms OpenResponsesResult to ChatAssistantMessage
 * (OpenAI chat format) for compatibility with code expecting chat responses.
 *
 * @example
 * ```typescript
 * import { toChatMessage } from '@openrouter/sdk';
 *
 * const response = await openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: "Hello!",
 * });
 *
 * const openResponsesResult = await response.getResponse();
 * const chatMessage = toChatMessage(openResponsesResult);
 * // chatMessage is now { role: "assistant", content: "..." }
 * ```
 */
export const toChatMessage = extractMessageFromResponse;
//# sourceMappingURL=chat-compat.js.map