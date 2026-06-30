import type * as models from '../models/index.js';
import type { ToolContextMapWithShared, ParsedToolCall, StateAccessor, StopWhen, Tool, TurnContext } from './tool-types.js';
import type { OpenResponsesResult } from '../models/index.js';
import type { ContextInput } from './tool-context.js';
export type { Tool } from './tool-types.js';
/**
 * A field can be either a value of type T or a function that computes T
 */
export type FieldOrAsyncFunction<T> = T | ((context: TurnContext) => T | Promise<T>);
/**
 * Base input type for callModel without approval-related fields
 */
type BaseCallModelInput<TTools extends readonly Tool[] = readonly Tool[], TShared extends Record<string, unknown> = Record<string, never>> = {
    [K in keyof Omit<models.ResponsesRequest, 'stream' | 'tools'>]?: FieldOrAsyncFunction<models.ResponsesRequest[K]>;
} & {
    tools?: TTools;
    stopWhen?: StopWhen<TTools>;
    /** Typed context data passed to tools via contextSchema. Includes optional `shared` key. */
    context?: ContextInput<ToolContextMapWithShared<TTools, TShared>>;
    /**
     * Call-level approval check - overrides tool-level requireApproval setting
     * Receives the tool call and turn context, can be sync or async
     */
    requireApproval?: (toolCall: ParsedToolCall<TTools[number]>, context: TurnContext) => boolean | Promise<boolean>;
    /**
     * Callback invoked at the start of each tool execution turn
     * Receives the turn context with the current turn number
     */
    onTurnStart?: (context: TurnContext) => void | Promise<void>;
    /**
     * Callback invoked at the end of each tool execution turn
     * Receives the turn context and the completed response for that turn
     */
    onTurnEnd?: (context: TurnContext, response: OpenResponsesResult) => void | Promise<void>;
};
/**
 * Approval params when state is provided (allows approve/reject)
 */
type ApprovalParamsWithState<TTools extends readonly Tool[] = readonly Tool[]> = {
    /** State accessor for multi-turn persistence and approval gates */
    state: StateAccessor<TTools>;
    /** Tool call IDs to approve (for resuming from awaiting_approval status) */
    approveToolCalls?: string[];
    /** Tool call IDs to reject (for resuming from awaiting_approval status) */
    rejectToolCalls?: string[];
};
/**
 * Approval params when state is NOT provided (forbids approve/reject)
 */
type ApprovalParamsWithoutState = {
    /** State accessor for multi-turn persistence and approval gates */
    state?: undefined;
    /** Not allowed without state - will cause type error */
    approveToolCalls?: never;
    /** Not allowed without state - will cause type error */
    rejectToolCalls?: never;
};
/**
 * Input type for callModel function
 * Each field can independently be a static value or a function that computes the value
 * Generic over TTools to enable proper type inference for stopWhen conditions
 *
 * Type enforcement:
 * - `approveToolCalls` and `rejectToolCalls` are only valid when `state` is provided
 * - Using these without `state` will cause a TypeScript error
 */
export type CallModelInput<TTools extends readonly Tool[] = readonly Tool[], TShared extends Record<string, unknown> = Record<string, never>> = BaseCallModelInput<TTools, TShared> & (ApprovalParamsWithState<TTools> | ApprovalParamsWithoutState);
/**
 * CallModelInput variant that requires state - use when approval workflows are needed
 */
export type CallModelInputWithState<TTools extends readonly Tool[] = readonly Tool[], TShared extends Record<string, unknown> = Record<string, never>> = BaseCallModelInput<TTools, TShared> & ApprovalParamsWithState<TTools>;
/**
 * Resolved CallModelInput (all functions evaluated to values)
 * This is the type after all async functions have been resolved to their values
 */
export type ResolvedCallModelInput = Omit<models.ResponsesRequest, 'stream' | 'tools'> & {
    tools?: never;
};
/**
 * Resolve all async functions in CallModelInput to their values
 *
 * @param input - Input with possible functions
 * @param context - Turn context for function execution
 * @returns Resolved input with all values (no functions)
 *
 * @example
 * ```typescript
 * const resolved = await resolveAsyncFunctions(
 *   {
 *     model: 'gpt-4',
 *     temperature: (ctx) => ctx.numberOfTurns * 0.1,
 *     input: 'Hello',
 *   },
 *   { numberOfTurns: 2 }
 * );
 * // resolved.temperature === 0.2
 * ```
 */
export declare function resolveAsyncFunctions<TTools extends readonly Tool[] = readonly Tool[]>(input: CallModelInput<TTools>, context: TurnContext): Promise<ResolvedCallModelInput>;
/**
 * Check if input has any async functions that need resolution
 *
 * @param input - Input to check
 * @returns True if any field is a function
 */
export declare function hasAsyncFunctions(input: unknown): boolean;
//# sourceMappingURL=async-params.d.ts.map