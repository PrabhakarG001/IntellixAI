import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatFinishReasonEnum } from "./chatfinishreasonenum.js";
import { ChatStreamDelta } from "./chatstreamdelta.js";
import { ChatTokenLogprobs } from "./chattokenlogprobs.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Streaming completion choice chunk
 */
export type ChatStreamChoice = {
    /**
     * Delta changes in streaming response
     */
    delta: ChatStreamDelta;
    finishReason: ChatFinishReasonEnum | null;
    /**
     * Choice index
     */
    index: number;
    /**
     * Log probabilities for the completion
     */
    logprobs?: ChatTokenLogprobs | null | undefined;
};
/** @internal */
export declare const ChatStreamChoice$inboundSchema: z.ZodType<ChatStreamChoice, unknown>;
export declare function chatStreamChoiceFromJSON(jsonString: string): SafeParseResult<ChatStreamChoice, SDKValidationError>;
//# sourceMappingURL=chatstreamchoice.d.ts.map