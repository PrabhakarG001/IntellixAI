import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type ChatTokenLogprobTopLogprob = {
    bytes: Array<number> | null;
    logprob: number;
    token: string;
};
/**
 * Token log probability information
 */
export type ChatTokenLogprob = {
    /**
     * UTF-8 bytes of the token
     */
    bytes: Array<number> | null;
    /**
     * Log probability of the token
     */
    logprob: number;
    /**
     * The token
     */
    token: string;
    /**
     * Top alternative tokens with probabilities
     */
    topLogprobs: Array<ChatTokenLogprobTopLogprob>;
};
/** @internal */
export declare const ChatTokenLogprobTopLogprob$inboundSchema: z.ZodType<ChatTokenLogprobTopLogprob, unknown>;
export declare function chatTokenLogprobTopLogprobFromJSON(jsonString: string): SafeParseResult<ChatTokenLogprobTopLogprob, SDKValidationError>;
/** @internal */
export declare const ChatTokenLogprob$inboundSchema: z.ZodType<ChatTokenLogprob, unknown>;
export declare function chatTokenLogprobFromJSON(jsonString: string): SafeParseResult<ChatTokenLogprob, SDKValidationError>;
//# sourceMappingURL=chattokenlogprob.d.ts.map