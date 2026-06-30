import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Function call details
 */
export type ChatStreamToolCallFunction = {
    /**
     * Function arguments as JSON string
     */
    arguments?: string | undefined;
    /**
     * Function name
     */
    name?: string | undefined;
};
/**
 * Tool call type
 */
export declare const ChatStreamToolCallType: {
    readonly Function: "function";
};
/**
 * Tool call type
 */
export type ChatStreamToolCallType = ClosedEnum<typeof ChatStreamToolCallType>;
/**
 * Tool call delta for streaming responses
 */
export type ChatStreamToolCall = {
    /**
     * Function call details
     */
    function?: ChatStreamToolCallFunction | undefined;
    /**
     * Tool call identifier
     */
    id?: string | undefined;
    /**
     * Tool call index in the array
     */
    index: number;
    /**
     * Tool call type
     */
    type?: ChatStreamToolCallType | undefined;
};
/** @internal */
export declare const ChatStreamToolCallFunction$inboundSchema: z.ZodType<ChatStreamToolCallFunction, unknown>;
export declare function chatStreamToolCallFunctionFromJSON(jsonString: string): SafeParseResult<ChatStreamToolCallFunction, SDKValidationError>;
/** @internal */
export declare const ChatStreamToolCallType$inboundSchema: z.ZodEnum<typeof ChatStreamToolCallType>;
/** @internal */
export declare const ChatStreamToolCall$inboundSchema: z.ZodType<ChatStreamToolCall, unknown>;
export declare function chatStreamToolCallFromJSON(jsonString: string): SafeParseResult<ChatStreamToolCall, SDKValidationError>;
//# sourceMappingURL=chatstreamtoolcall.d.ts.map