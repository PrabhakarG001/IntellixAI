import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenAIResponsesAnnotation, OpenAIResponsesAnnotation$Outbound } from "./openairesponsesannotation.js";
export type ResponseOutputTextTopLogprob = {
    bytes: Array<number>;
    logprob: number;
    token: string;
};
export type Logprob = {
    bytes: Array<number>;
    logprob: number;
    token: string;
    topLogprobs: Array<ResponseOutputTextTopLogprob>;
};
export type ResponseOutputText = {
    annotations?: Array<OpenAIResponsesAnnotation> | undefined;
    logprobs?: Array<Logprob> | undefined;
    text: string;
    type: "output_text";
};
/** @internal */
export declare const ResponseOutputTextTopLogprob$inboundSchema: z.ZodType<ResponseOutputTextTopLogprob, unknown>;
/** @internal */
export type ResponseOutputTextTopLogprob$Outbound = {
    bytes: Array<number>;
    logprob: number;
    token: string;
};
/** @internal */
export declare const ResponseOutputTextTopLogprob$outboundSchema: z.ZodType<ResponseOutputTextTopLogprob$Outbound, ResponseOutputTextTopLogprob>;
export declare function responseOutputTextTopLogprobToJSON(responseOutputTextTopLogprob: ResponseOutputTextTopLogprob): string;
export declare function responseOutputTextTopLogprobFromJSON(jsonString: string): SafeParseResult<ResponseOutputTextTopLogprob, SDKValidationError>;
/** @internal */
export declare const Logprob$inboundSchema: z.ZodType<Logprob, unknown>;
/** @internal */
export type Logprob$Outbound = {
    bytes: Array<number>;
    logprob: number;
    token: string;
    top_logprobs: Array<ResponseOutputTextTopLogprob$Outbound>;
};
/** @internal */
export declare const Logprob$outboundSchema: z.ZodType<Logprob$Outbound, Logprob>;
export declare function logprobToJSON(logprob: Logprob): string;
export declare function logprobFromJSON(jsonString: string): SafeParseResult<Logprob, SDKValidationError>;
/** @internal */
export declare const ResponseOutputText$inboundSchema: z.ZodType<ResponseOutputText, unknown>;
/** @internal */
export type ResponseOutputText$Outbound = {
    annotations?: Array<OpenAIResponsesAnnotation$Outbound> | undefined;
    logprobs?: Array<Logprob$Outbound> | undefined;
    text: string;
    type: "output_text";
};
/** @internal */
export declare const ResponseOutputText$outboundSchema: z.ZodType<ResponseOutputText$Outbound, ResponseOutputText>;
export declare function responseOutputTextToJSON(responseOutputText: ResponseOutputText): string;
export declare function responseOutputTextFromJSON(jsonString: string): SafeParseResult<ResponseOutputText, SDKValidationError>;
//# sourceMappingURL=responseoutputtext.d.ts.map