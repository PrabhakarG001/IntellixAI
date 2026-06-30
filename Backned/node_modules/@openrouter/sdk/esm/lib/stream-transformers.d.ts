import type * as models from '../models/index.js';
import type { ClaudeMessage, UnsupportedContent } from '../models/claude-message.js';
import type { ReusableReadableStream } from './reusable-stream.js';
import type { ParsedToolCall, Tool } from './tool-types.js';
/**
 * Extract text deltas from responses stream events
 */
export declare function extractTextDeltas(stream: ReusableReadableStream<models.StreamEvents>): AsyncIterableIterator<string>;
/**
 * Extract reasoning deltas from responses stream events
 */
export declare function extractReasoningDeltas(stream: ReusableReadableStream<models.StreamEvents>): AsyncIterableIterator<string>;
/**
 * Extract tool call argument deltas from responses stream events
 */
export declare function extractToolDeltas(stream: ReusableReadableStream<models.StreamEvents>): AsyncIterableIterator<string>;
/**
 * Build incremental message updates from responses stream events
 * Returns OutputMessage (assistant/responses format)
 */
export declare function buildResponsesMessageStream(stream: ReusableReadableStream<models.StreamEvents>): AsyncIterableIterator<models.OutputMessage>;
/**
 * Output item types that can be streamed from a response.
 * This is the union of all item types that appear in response output,
 * plus function_call_output for tool results.
 */
export type StreamableOutputItem = models.OutputMessage | models.OutputFunctionCallItem | models.OutputReasoningItem | models.OutputWebSearchCallItem | models.OutputFileSearchCallItem | models.OutputImageGenerationCallItem | models.FunctionCallOutputItem;
/**
 * Discriminated union for tracking items in progress.
 * Each variant has only the fields relevant to that item type.
 */
export type ItemInProgress = {
    type: 'message';
    id: string;
    textContent: string;
} | {
    type: 'function_call';
    id: string;
    name: string;
    callId: string;
    argumentsAccumulated: string;
} | {
    type: 'reasoning';
    id: string;
    reasoningContent: string;
};
type ItemsStreamHandler = (event: models.StreamEvents, itemsInProgress: Map<string, ItemInProgress>) => StreamableOutputItem | undefined;
export declare const itemsStreamHandlers: Record<string, ItemsStreamHandler>;
export declare const streamTerminationEvents: Set<string>;
/**
 * Build incremental output item updates from responses stream events.
 * Yields all item types cumulatively - same item may be emitted multiple times
 * with the same ID but progressively updated content as streaming progresses.
 */
export declare function buildItemsStream(stream: ReusableReadableStream<models.StreamEvents>): AsyncIterableIterator<StreamableOutputItem>;
/**
 * Build incremental message updates from responses stream events
 * Returns ChatAssistantMessage (chat format) instead of OutputMessage
 */
export declare function buildMessageStream(stream: ReusableReadableStream<models.StreamEvents>): AsyncIterableIterator<models.ChatAssistantMessage>;
/**
 * Consume stream until completion and return the complete response
 */
export declare function consumeStreamForCompletion(stream: ReusableReadableStream<models.StreamEvents>): Promise<models.OpenResponsesResult>;
/**
 * Extract the first message from a completed response (chat format)
 */
export declare function extractMessageFromResponse(response: models.OpenResponsesResult): models.ChatAssistantMessage;
/**
 * Extract the first message from a completed response (responses format)
 */
export declare function extractResponsesMessageFromResponse(response: models.OpenResponsesResult): models.OutputMessage;
/**
 * Extract text from a response, either from outputText or by concatenating message content
 */
export declare function extractTextFromResponse(response: models.OpenResponsesResult): string;
/**
 * Extract all tool calls from a completed response
 * Returns parsed tool calls with arguments as objects (not JSON strings)
 */
export declare function extractToolCallsFromResponse(response: models.OpenResponsesResult): ParsedToolCall<Tool>[];
/**
 * Build incremental tool call updates from responses stream events
 * Yields structured tool call objects as they're built from deltas
 */
export declare function buildToolCallStream(stream: ReusableReadableStream<models.StreamEvents>): AsyncIterableIterator<ParsedToolCall<Tool>>;
/**
 * Check if a response contains any tool calls
 */
export declare function responseHasToolCalls(response: models.OpenResponsesResult): boolean;
/**
 * Convert OpenResponsesResult to ClaudeMessage format
 * Compatible with the Anthropic SDK BetaMessage type
 */
export declare function convertToClaudeMessage(response: models.OpenResponsesResult): ClaudeMessage;
/**
 * Extract unsupported content by original type
 */
export declare function extractUnsupportedContent(message: ClaudeMessage, originalType: string): UnsupportedContent[];
/**
 * Check if message has any unsupported content
 */
export declare function hasUnsupportedContent(message: ClaudeMessage): boolean;
/**
 * Get summary of unsupported content types
 */
export declare function getUnsupportedContentSummary(message: ClaudeMessage): Record<string, number>;
export {};
//# sourceMappingURL=stream-transformers.d.ts.map