import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type ChatToolCallFunction = {
    /**
     * Function arguments as JSON string
     */
    arguments: string;
    /**
     * Function name to call
     */
    name: string;
};
export declare const ChatToolCallType: {
    readonly Function: "function";
};
export type ChatToolCallType = ClosedEnum<typeof ChatToolCallType>;
/**
 * Tool call made by the assistant
 */
export type ChatToolCall = {
    function: ChatToolCallFunction;
    /**
     * Tool call identifier
     */
    id: string;
    type: ChatToolCallType;
};
/** @internal */
export declare const ChatToolCallFunction$inboundSchema: z.ZodType<ChatToolCallFunction, unknown>;
/** @internal */
export type ChatToolCallFunction$Outbound = {
    arguments: string;
    name: string;
};
/** @internal */
export declare const ChatToolCallFunction$outboundSchema: z.ZodType<ChatToolCallFunction$Outbound, ChatToolCallFunction>;
export declare function chatToolCallFunctionToJSON(chatToolCallFunction: ChatToolCallFunction): string;
export declare function chatToolCallFunctionFromJSON(jsonString: string): SafeParseResult<ChatToolCallFunction, SDKValidationError>;
/** @internal */
export declare const ChatToolCallType$inboundSchema: z.ZodEnum<typeof ChatToolCallType>;
/** @internal */
export declare const ChatToolCallType$outboundSchema: z.ZodEnum<typeof ChatToolCallType>;
/** @internal */
export declare const ChatToolCall$inboundSchema: z.ZodType<ChatToolCall, unknown>;
/** @internal */
export type ChatToolCall$Outbound = {
    function: ChatToolCallFunction$Outbound;
    id: string;
    type: string;
};
/** @internal */
export declare const ChatToolCall$outboundSchema: z.ZodType<ChatToolCall$Outbound, ChatToolCall>;
export declare function chatToolCallToJSON(chatToolCall: ChatToolCall): string;
export declare function chatToolCallFromJSON(jsonString: string): SafeParseResult<ChatToolCall, SDKValidationError>;
//# sourceMappingURL=chattoolcall.d.ts.map