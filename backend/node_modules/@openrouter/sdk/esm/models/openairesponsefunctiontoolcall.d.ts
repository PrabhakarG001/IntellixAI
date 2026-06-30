import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OpenAIResponseFunctionToolCallType: {
    readonly FunctionCall: "function_call";
};
export type OpenAIResponseFunctionToolCallType = ClosedEnum<typeof OpenAIResponseFunctionToolCallType>;
export type OpenAIResponseFunctionToolCall = {
    arguments: string;
    callId: string;
    id?: string | undefined;
    name: string;
    /**
     * Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server)
     */
    namespace?: string | undefined;
    status?: ToolCallStatus | undefined;
    type: OpenAIResponseFunctionToolCallType;
};
/** @internal */
export declare const OpenAIResponseFunctionToolCallType$inboundSchema: z.ZodEnum<typeof OpenAIResponseFunctionToolCallType>;
/** @internal */
export declare const OpenAIResponseFunctionToolCall$inboundSchema: z.ZodType<OpenAIResponseFunctionToolCall, unknown>;
export declare function openAIResponseFunctionToolCallFromJSON(jsonString: string): SafeParseResult<OpenAIResponseFunctionToolCall, SDKValidationError>;
//# sourceMappingURL=openairesponsefunctiontoolcall.d.ts.map