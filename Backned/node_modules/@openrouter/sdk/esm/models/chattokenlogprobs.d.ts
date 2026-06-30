import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatTokenLogprob } from "./chattokenlogprob.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Log probabilities for the completion
 */
export type ChatTokenLogprobs = {
    /**
     * Log probabilities for content tokens
     */
    content: Array<ChatTokenLogprob> | null;
    /**
     * Log probabilities for refusal tokens
     */
    refusal?: Array<ChatTokenLogprob> | null | undefined;
};
/** @internal */
export declare const ChatTokenLogprobs$inboundSchema: z.ZodType<ChatTokenLogprobs, unknown>;
export declare function chatTokenLogprobsFromJSON(jsonString: string): SafeParseResult<ChatTokenLogprobs, SDKValidationError>;
//# sourceMappingURL=chattokenlogprobs.d.ts.map