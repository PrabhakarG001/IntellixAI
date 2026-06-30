import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type Input2 = {
    messages: Array<any | null>;
};
export type Input1 = {
    prompt: string;
};
/**
 * The input to the generation — either a prompt string or an array of messages
 */
export type InputUnion = Input1 | Input2;
/**
 * The output from the generation
 */
export type GenerationContentDataOutput = {
    /**
     * The completion output
     */
    completion: string | null;
    /**
     * Reasoning/thinking output, if any
     */
    reasoning: string | null;
};
/**
 * Stored prompt and completion content
 */
export type GenerationContentData = {
    /**
     * The input to the generation — either a prompt string or an array of messages
     */
    input: Input1 | Input2;
    /**
     * The output from the generation
     */
    output: GenerationContentDataOutput;
};
/** @internal */
export declare const Input2$inboundSchema: z.ZodType<Input2, unknown>;
export declare function input2FromJSON(jsonString: string): SafeParseResult<Input2, SDKValidationError>;
/** @internal */
export declare const Input1$inboundSchema: z.ZodType<Input1, unknown>;
export declare function input1FromJSON(jsonString: string): SafeParseResult<Input1, SDKValidationError>;
/** @internal */
export declare const InputUnion$inboundSchema: z.ZodType<InputUnion, unknown>;
export declare function inputUnionFromJSON(jsonString: string): SafeParseResult<InputUnion, SDKValidationError>;
/** @internal */
export declare const GenerationContentDataOutput$inboundSchema: z.ZodType<GenerationContentDataOutput, unknown>;
export declare function generationContentDataOutputFromJSON(jsonString: string): SafeParseResult<GenerationContentDataOutput, SDKValidationError>;
/** @internal */
export declare const GenerationContentData$inboundSchema: z.ZodType<GenerationContentData, unknown>;
export declare function generationContentDataFromJSON(jsonString: string): SafeParseResult<GenerationContentData, SDKValidationError>;
//# sourceMappingURL=generationcontentdata.d.ts.map