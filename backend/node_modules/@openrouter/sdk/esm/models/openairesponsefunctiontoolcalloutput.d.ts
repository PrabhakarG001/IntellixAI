import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { InputFile } from "./inputfile.js";
import { InputImage } from "./inputimage.js";
import { InputText } from "./inputtext.js";
export type OpenAIResponseFunctionToolCallOutputOutput1 = InputFile | (InputImage & {
    type: "input_image";
}) | InputText | discriminatedUnionTypes.Unknown<"type">;
export type OpenAIResponseFunctionToolCallOutputOutput2 = string | Array<InputFile | (InputImage & {
    type: "input_image";
}) | InputText | discriminatedUnionTypes.Unknown<"type">>;
export declare const OpenAIResponseFunctionToolCallOutputStatus: {
    readonly InProgress: "in_progress";
    readonly Completed: "completed";
    readonly Incomplete: "incomplete";
};
export type OpenAIResponseFunctionToolCallOutputStatus = OpenEnum<typeof OpenAIResponseFunctionToolCallOutputStatus>;
export declare const OpenAIResponseFunctionToolCallOutputType: {
    readonly FunctionCallOutput: "function_call_output";
};
export type OpenAIResponseFunctionToolCallOutputType = ClosedEnum<typeof OpenAIResponseFunctionToolCallOutputType>;
export type OpenAIResponseFunctionToolCallOutput = {
    callId: string;
    id?: string | null | undefined;
    output: string | Array<InputFile | (InputImage & {
        type: "input_image";
    }) | InputText | discriminatedUnionTypes.Unknown<"type">>;
    status?: OpenAIResponseFunctionToolCallOutputStatus | null | undefined;
    type: OpenAIResponseFunctionToolCallOutputType;
};
/** @internal */
export declare const OpenAIResponseFunctionToolCallOutputOutput1$inboundSchema: z.ZodType<OpenAIResponseFunctionToolCallOutputOutput1, unknown>;
export declare function openAIResponseFunctionToolCallOutputOutput1FromJSON(jsonString: string): SafeParseResult<OpenAIResponseFunctionToolCallOutputOutput1, SDKValidationError>;
/** @internal */
export declare const OpenAIResponseFunctionToolCallOutputOutput2$inboundSchema: z.ZodType<OpenAIResponseFunctionToolCallOutputOutput2, unknown>;
export declare function openAIResponseFunctionToolCallOutputOutput2FromJSON(jsonString: string): SafeParseResult<OpenAIResponseFunctionToolCallOutputOutput2, SDKValidationError>;
/** @internal */
export declare const OpenAIResponseFunctionToolCallOutputStatus$inboundSchema: z.ZodType<OpenAIResponseFunctionToolCallOutputStatus, unknown>;
/** @internal */
export declare const OpenAIResponseFunctionToolCallOutputType$inboundSchema: z.ZodEnum<typeof OpenAIResponseFunctionToolCallOutputType>;
/** @internal */
export declare const OpenAIResponseFunctionToolCallOutput$inboundSchema: z.ZodType<OpenAIResponseFunctionToolCallOutput, unknown>;
export declare function openAIResponseFunctionToolCallOutputFromJSON(jsonString: string): SafeParseResult<OpenAIResponseFunctionToolCallOutput, SDKValidationError>;
//# sourceMappingURL=openairesponsefunctiontoolcalloutput.d.ts.map