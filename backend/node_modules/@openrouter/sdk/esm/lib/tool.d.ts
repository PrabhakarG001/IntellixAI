import type { $ZodObject, $ZodShape, $ZodType, infer as zodInfer } from 'zod/v4/core';
import { type Tool, type ToolExecuteContext, type ToolWithExecute, type ToolWithGenerator, type ManualTool, type NextTurnParamsFunctions, type ToolApprovalCheck } from "./tool-types.js";
/**
 * Configuration for a regular tool with outputSchema
 */
type RegularToolConfigWithOutput<TInput extends $ZodObject<$ZodShape>, TOutput extends $ZodType, TContext extends Record<string, unknown> = Record<string, unknown>, TName extends string = string> = {
    name: TName;
    description?: string;
    inputSchema: TInput;
    outputSchema: TOutput;
    eventSchema?: undefined;
    /** Zod schema declaring the context data this tool needs */
    contextSchema?: $ZodObject<$ZodShape>;
    nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
    requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
    execute: (params: zodInfer<TInput>, context?: ToolExecuteContext<TName, TContext>) => Promise<zodInfer<TOutput>> | zodInfer<TOutput>;
};
/**
 * Configuration for a regular tool without outputSchema (infers return type from execute)
 */
type RegularToolConfigWithoutOutput<TInput extends $ZodObject<$ZodShape>, TReturn, TContext extends Record<string, unknown> = Record<string, unknown>, TName extends string = string> = {
    name: TName;
    description?: string;
    inputSchema: TInput;
    outputSchema?: undefined;
    eventSchema?: undefined;
    /** Zod schema declaring the context data this tool needs */
    contextSchema?: $ZodObject<$ZodShape>;
    nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
    requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
    execute: (params: zodInfer<TInput>, context?: ToolExecuteContext<TName, TContext>) => Promise<TReturn> | TReturn;
};
/**
 * Configuration for a generator tool (with eventSchema)
 */
type GeneratorToolConfig<TInput extends $ZodObject<$ZodShape>, TEvent extends $ZodType, TOutput extends $ZodType, TContext extends Record<string, unknown> = Record<string, unknown>, TName extends string = string> = {
    name: TName;
    description?: string;
    inputSchema: TInput;
    eventSchema: TEvent;
    outputSchema: TOutput;
    /** Zod schema declaring the context data this tool needs */
    contextSchema?: $ZodObject<$ZodShape>;
    nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
    requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
    execute: (params: zodInfer<TInput>, context?: ToolExecuteContext<TName, TContext>) => AsyncGenerator<zodInfer<TEvent> | zodInfer<TOutput>>;
};
/**
 * Configuration for a manual tool (execute: false, no eventSchema or outputSchema)
 */
type ManualToolConfig<TInput extends $ZodObject<$ZodShape>> = {
    name: string;
    description?: string;
    inputSchema: TInput;
    /** Zod schema declaring the context data this tool needs */
    contextSchema?: $ZodObject<$ZodShape>;
    nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
    requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
    execute: false;
};
/**
 * Loose config type for the `tool<TShared>()` overload.
 * Accepts any valid tool config while typing `ctx.shared` from TShared.
 */
type ToolConfigWithSharedContext<TShared extends Record<string, unknown>> = {
    name: string;
    description?: string;
    inputSchema: $ZodObject<$ZodShape>;
    outputSchema?: $ZodType;
    eventSchema?: $ZodType;
    contextSchema?: $ZodObject<$ZodShape>;
    nextTurnParams?: NextTurnParamsFunctions<Record<string, unknown>>;
    requireApproval?: boolean | ToolApprovalCheck<Record<string, unknown>>;
    execute: ((params: Record<string, unknown>, context?: ToolExecuteContext<string, Record<string, unknown>, TShared>) => unknown) | ((params: Record<string, unknown>, context?: ToolExecuteContext<string, Record<string, unknown>, TShared>) => AsyncGenerator<unknown>) | false;
};
/**
 * Creates a tool with full type inference from Zod schemas.
 *
 * The tool type is automatically determined based on the configuration:
 * - **Generator tool**: When `eventSchema` is provided
 * - **Regular tool**: When `execute` is a function (no `eventSchema`)
 * - **Manual tool**: When `execute: false` is set
 *
 * Shared context typing: Pass a type parameter to type `ctx.shared`
 * in the execute callback. Runtime validation happens at callModel
 * via `sharedContextSchema`.
 *
 * @example Regular tool with typed shared context:
 * ```typescript
 * type SharedCtx = z.infer<typeof SharedContextSchema>;
 *
 * const execTool = tool<SharedCtx>({
 *   name: "sandbox_exec",
 *   inputSchema: z.object({ command: z.string() }),
 *   execute: async (params, ctx) => {
 *     ctx?.shared._sessionId;       // string | undefined
 *     return { output: '...' };
 *   },
 * });
 * ```
 */
export declare function tool<TInput extends $ZodObject<$ZodShape>, TEvent extends $ZodType, TOutput extends $ZodType, TContext extends Record<string, unknown> = Record<string, unknown>, TName extends string = string>(config: GeneratorToolConfig<TInput, TEvent, TOutput, TContext, TName>): ToolWithGenerator<TInput, TEvent, TOutput, TContext>;
export declare function tool<TInput extends $ZodObject<$ZodShape>>(config: ManualToolConfig<TInput>): ManualTool<TInput>;
export declare function tool<TInput extends $ZodObject<$ZodShape>, TOutput extends $ZodType, TContext extends Record<string, unknown> = Record<string, unknown>, TName extends string = string>(config: RegularToolConfigWithOutput<TInput, TOutput, TContext, TName>): ToolWithExecute<TInput, TOutput, TContext>;
export declare function tool<TInput extends $ZodObject<$ZodShape>, TReturn, TContext extends Record<string, unknown> = Record<string, unknown>, TName extends string = string>(config: RegularToolConfigWithoutOutput<TInput, TReturn, TContext, TName>): ToolWithExecute<TInput, $ZodType<TReturn>, TContext>;
export declare function tool<TShared extends Record<string, unknown>>(config: ToolConfigWithSharedContext<TShared>): Tool;
export {};
//# sourceMappingURL=tool.d.ts.map