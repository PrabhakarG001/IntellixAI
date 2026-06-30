import type { OpenRouterCore } from '../core.js';
import type * as models from '../models/index.js';
import type { CallModelInput } from './async-params.js';
import type { RequestOptions } from './sdks.js';
import type { $ZodObject, $ZodShape } from 'zod/v4/core';
import type { ConversationState, ToolContextMapWithShared, ResponseStreamEvent, InferToolEventsUnion, InferToolOutputsUnion, ParsedToolCall, StateAccessor, StopWhen, Tool, ToolStreamEvent, TurnContext } from './tool-types.js';
import { type ContextInput } from './tool-context.js';
import { type StreamableOutputItem } from './stream-transformers.js';
export interface GetResponseOptions<TTools extends readonly Tool[], TShared extends Record<string, unknown> = Record<string, never>> {
    request: CallModelInput<TTools, TShared>;
    client: OpenRouterCore;
    options?: RequestOptions;
    tools?: TTools;
    stopWhen?: StopWhen<TTools>;
    state?: StateAccessor<TTools>;
    /** Typed context data passed to tools via contextSchema. `shared` key for shared context. */
    context?: ContextInput<ToolContextMapWithShared<TTools, TShared>>;
    /** Zod schema for shared context validation */
    sharedContextSchema?: $ZodObject<$ZodShape>;
    /**
     * Call-level approval check - overrides tool-level requireApproval setting
     * Receives the tool call and turn context, can be sync or async
     */
    requireApproval?: (toolCall: ParsedToolCall<TTools[number]>, context: TurnContext) => boolean | Promise<boolean>;
    approveToolCalls?: string[];
    rejectToolCalls?: string[];
    /** Callback invoked at the start of each tool execution turn */
    onTurnStart?: (context: TurnContext) => void | Promise<void>;
    /** Callback invoked at the end of each tool execution turn */
    onTurnEnd?: (context: TurnContext, response: models.OpenResponsesResult) => void | Promise<void>;
}
/**
 * A wrapper around a streaming response that provides multiple consumption patterns.
 *
 * Allows consuming the response in multiple ways:
 * - `await result.getText()` - Get just the text
 * - `await result.getResponse()` - Get the full response object
 * - `for await (const delta of result.getTextStream())` - Stream text deltas
 * - `for await (const msg of result.getNewMessagesStream())` - Stream cumulative message snapshots
 * - `for await (const event of result.getFullResponsesStream())` - Stream all response events
 *
 * For message format conversion, use the helper functions:
 * - `toChatMessage(response)` for OpenAI chat format
 * - `toClaudeMessage(response)` for Anthropic Claude format
 *
 * All consumption patterns can be used concurrently thanks to the underlying
 * ReusableReadableStream implementation.
 *
 * @template TTools - The tools array type to enable typed tool calls and results
 * @template TShared - The shape of the shared context (inferred from sharedContextSchema)
 */
export declare class ModelResult<TTools extends readonly Tool[], TShared extends Record<string, unknown> = Record<string, never>> {
    private reusableStream;
    private textPromise;
    private options;
    private initPromise;
    private toolExecutionPromise;
    private finalResponse;
    private toolEventBroadcaster;
    private allToolExecutionRounds;
    private resolvedRequest;
    private stateAccessor;
    private currentState;
    private requireApprovalFn;
    private approvedToolCalls;
    private rejectedToolCalls;
    private isResumingFromApproval;
    private turnBroadcaster;
    private initialStreamPipeStarted;
    private initialPipePromise;
    private contextStore;
    constructor(options: GetResponseOptions<TTools, TShared>);
    /**
     * Get or create the unified turn broadcaster (lazy initialization).
     * Broadcasts all API stream events, tool events, and turn delimiters across turns.
     */
    private ensureTurnBroadcaster;
    /**
     * Start piping the initial stream into the turn broadcaster.
     * Idempotent — only starts once even if called multiple times.
     * Wraps the initial stream events with turn.start(0) / turn.end(0) delimiters.
     */
    private startInitialStreamPipe;
    /**
     * Pipe a follow-up stream into the turn broadcaster and capture the completed response.
     * Emits turn.start / turn.end delimiters around the stream events.
     */
    private pipeAndConsumeStream;
    /**
     * Push a tool result event to both the legacy tool event broadcaster
     * and the unified turn broadcaster.
     */
    private broadcastToolResult;
    /**
     * Push a preliminary result event to both the legacy tool event broadcaster
     * and the unified turn broadcaster.
     */
    private broadcastPreliminaryResult;
    /**
     * Set up the turn broadcaster with tool execution and return the consumer.
     * Used by stream methods that need to iterate over all turns.
     */
    private startTurnBroadcasterExecution;
    /**
     * Type guard to check if a value is a non-streaming response
     * Only requires 'output' field and absence of 'toReadableStream' method
     */
    private isNonStreamingResponse;
    /**
     * Get initial response from stream or cached final response.
     * Consumes the stream to completion if needed to extract the response.
     *
     * @returns The complete non-streaming response
     * @throws Error if neither stream nor response has been initialized
     */
    private getInitialResponse;
    /**
     * Save response output to state.
     * Appends the response output to the message history and records the response ID.
     *
     * @param response - The API response to save
     */
    private saveResponseToState;
    /**
     * Mark state as complete.
     * Sets the conversation status to 'complete' indicating no further tool execution is needed.
     */
    private markStateComplete;
    /**
     * Save tool results to state.
     * Appends tool execution results to the message history for multi-turn context.
     *
     * @param toolResults - The tool execution results to save
     */
    private saveToolResultsToState;
    /**
     * Check if execution should be interrupted by external signal.
     * Polls the state accessor for interruption flags set by external processes.
     *
     * @param currentResponse - The current response to save as partial state
     * @returns True if interrupted and caller should exit, false to continue
     */
    private checkForInterruption;
    /**
     * Check if stop conditions are met.
     * Returns true if execution should stop.
     *
     * @remarks
     * Default: stepCountIs(DEFAULT_MAX_STEPS) if no stopWhen is specified.
     * This evaluates stop conditions against the complete step history.
     */
    private shouldStopExecution;
    /**
     * Check if any tool calls have execute functions.
     * Used to determine if automatic tool execution should be attempted.
     *
     * @param toolCalls - The tool calls to check
     * @returns True if at least one tool call has an executable function
     */
    private hasExecutableToolCalls;
    /**
     * Execute tools that can auto-execute (don't require approval) in parallel.
     *
     * @param toolCalls - The tool calls to execute
     * @param turnContext - The current turn context
     * @returns Array of unsent tool results for later submission
     */
    private executeAutoApproveTools;
    /**
     * Check for tools requiring approval and handle accordingly.
     * Partitions tool calls into those needing approval and those that can auto-execute.
     *
     * @param toolCalls - The tool calls to check
     * @param currentRound - The current execution round (1-indexed)
     * @param currentResponse - The current response to save if pausing
     * @returns True if execution should pause for approval, false to continue
     * @throws Error if approval is required but no state accessor is configured
     */
    private handleApprovalCheck;
    /**
     * Execute all tools in a single round in parallel.
     * Emits tool.result events after tool execution completes.
     *
     * @param toolCalls - The tool calls to execute
     * @param turnContext - The current turn context
     * @returns Array of function call outputs formatted for the API
     */
    private executeToolRound;
    /**
     * Resolve async functions for the current turn.
     * Updates the resolved request with turn-specific parameter values.
     *
     * @param turnContext - The turn context for parameter resolution
     */
    private resolveAsyncFunctionsForTurn;
    /**
     * Apply nextTurnParams from executed tools.
     * Allows tools to modify request parameters for subsequent turns.
     *
     * @param toolCalls - The tool calls that were just executed
     */
    private applyNextTurnParams;
    /**
     * Make a follow-up API request with tool results.
     * Uses streaming and pipes events through the turn broadcaster when available.
     */
    private makeFollowupRequest;
    /**
     * Validate the final response has required fields.
     *
     * @param response - The response to validate
     * @throws Error if response is missing required fields or has invalid output
     */
    private validateFinalResponse;
    /**
     * Resolve async functions in the request for a given turn context.
     * Extracts non-function fields and resolves any async parameter functions.
     *
     * @param context - The turn context for parameter resolution
     * @returns The resolved request without async functions
     */
    private resolveRequestForContext;
    /**
     * Safely persist state with error handling.
     * Wraps state save operations to ensure failures are properly reported.
     *
     * @param updates - Optional partial state updates to apply before saving
     * @throws Error if state persistence fails
     */
    private saveStateSafely;
    /**
     * Remove optional properties from state when they should be cleared.
     * Uses delete to properly remove optional properties rather than setting undefined.
     *
     * @param props - Array of property names to remove from current state
     */
    private clearOptionalStateProperties;
    /**
     * Initialize the stream if not already started
     * This is idempotent - multiple calls will return the same promise
     */
    private initStream;
    /**
     * Process approval/rejection decisions and resume execution
     */
    private processApprovalDecisions;
    /**
     * Continue execution with unsent tool results
     */
    private continueWithUnsentResults;
    /**
     * Execute tools automatically if they are provided and have execute functions
     * This is idempotent - multiple calls will return the same promise
     */
    private executeToolsIfNeeded;
    /**
     * Internal helper to get the text after tool execution
     */
    private getTextInternal;
    /**
     * Get just the text content from the response.
     * This will consume the stream until completion, execute any tools, and extract the text.
     */
    getText(): Promise<string>;
    /**
     * Get the complete response object including usage information.
     * This will consume the stream until completion and execute any tools.
     * Returns the full OpenResponsesResult with usage data (inputTokens, outputTokens, cachedTokens, etc.)
     */
    getResponse(): Promise<models.OpenResponsesResult>;
    /**
     * Stream all response events as they arrive across all turns.
     * Multiple consumers can iterate over this stream concurrently.
     * Includes API events, tool events, and turn.start/turn.end delimiters.
     */
    getFullResponsesStream(): AsyncIterableIterator<ResponseStreamEvent<InferToolEventsUnion<TTools>, InferToolOutputsUnion<TTools>>>;
    /**
     * Stream only text deltas as they arrive from all turns.
     * This filters the full event stream to only yield text content,
     * including text from follow-up responses in multi-turn tool loops.
     */
    getTextStream(): AsyncIterableIterator<string>;
    /**
     * Stream all output items cumulatively as they arrive.
     * Items are emitted with the same ID but progressively updated content as streaming progresses.
     * Also yields tool results (function_call_output) after tool execution completes.
     *
     * Item types include:
     * - message: Assistant text responses (emitted cumulatively as text streams)
     * - function_call: Tool calls (emitted cumulatively as arguments stream)
     * - reasoning: Model reasoning (emitted cumulatively as thinking streams)
     * - web_search_call: Web search operations
     * - file_search_call: File search operations
     * - image_generation_call: Image generation operations
     * - function_call_output: Results from executed tools
     */
    getItemsStream(): AsyncIterableIterator<StreamableOutputItem>;
    /**
     * @deprecated Use `getItemsStream()` instead. This method only streams messages,
     * while `getItemsStream()` streams all output item types (messages, function_calls,
     * reasoning, etc.) with cumulative updates.
     *
     * Stream cumulative message snapshots as content is added in responses format.
     * Each iteration yields an updated version of the message with new content.
     * Also yields function_call items and FunctionCallOutputItem after tool execution completes.
     * Returns OutputMessage, OutputFunctionCallItem, or FunctionCallOutputItem
     * compatible with OpenAI Responses API format.
     */
    getNewMessagesStream(): AsyncIterableIterator<models.OutputMessage | models.FunctionCallOutputItem | models.OutputFunctionCallItem>;
    /**
     * Stream only reasoning deltas as they arrive from all turns.
     * This filters the full event stream to only yield reasoning content,
     * including reasoning from follow-up responses in multi-turn tool loops.
     */
    getReasoningStream(): AsyncIterableIterator<string>;
    /**
     * Stream tool call argument deltas and preliminary results from all turns.
     * Preliminary results are streamed in REAL-TIME as generator tools yield.
     * - Tool call argument deltas as { type: "delta", content: string }
     * - Preliminary results as { type: "preliminary_result", toolCallId, result }
     */
    getToolStream(): AsyncIterableIterator<ToolStreamEvent<InferToolEventsUnion<TTools>>>;
    /**
     * Get all tool calls from the completed response (before auto-execution).
     * Note: If tools have execute functions, they will be automatically executed
     * and this will return the tool calls from the initial response.
     * Returns structured tool calls with parsed arguments.
     */
    getToolCalls(): Promise<ParsedToolCall<TTools[number]>[]>;
    /**
     * Stream structured tool call objects as they're completed.
     * Each iteration yields a complete tool call with parsed arguments.
     */
    getToolCallsStream(): AsyncIterableIterator<ParsedToolCall<TTools[number]>>;
    /**
     * Returns an async iterable that emits a full context snapshot every time
     * any tool calls ctx.update(). Can be consumed concurrently with getText(),
     * getToolStream(), etc.
     *
     * @example
     * ```typescript
     * for await (const snapshot of result.getContextUpdates()) {
     *   console.log('Context changed:', snapshot);
     * }
     * ```
     */
    getContextUpdates(): AsyncGenerator<ToolContextMapWithShared<TTools, TShared>>;
    /**
     * Cancel the underlying stream and all consumers
     */
    cancel(): Promise<void>;
    /**
     * Check if the conversation requires human approval to continue.
     * Returns true if there are pending tool calls awaiting approval.
     */
    requiresApproval(): Promise<boolean>;
    /**
     * Get the pending tool calls that require approval.
     * Returns empty array if no approvals needed.
     */
    getPendingToolCalls(): Promise<ParsedToolCall<TTools[number]>[]>;
    /**
     * Get the current conversation state.
     * Useful for inspection, debugging, or custom persistence.
     * Note: This returns the raw ConversationState for inspection only.
     * To resume a conversation, use the StateAccessor pattern.
     */
    getState(): Promise<ConversationState<TTools>>;
}
//# sourceMappingURL=model-result.d.ts.map