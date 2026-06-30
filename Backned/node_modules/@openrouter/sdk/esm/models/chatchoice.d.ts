import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatAssistantMessage } from "./chatassistantmessage.js";
import { ChatFinishReasonEnum } from "./chatfinishreasonenum.js";
import { ChatTokenLogprobs } from "./chattokenlogprobs.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Chat completion choice
 */
export type ChatChoice = {
    finishReason: ChatFinishReasonEnum | null;
    /**
     * Choice index
     */
    index: number;
    /**
     * Log probabilities for the completion
     */
    logprobs?: ChatTokenLogprobs | null | undefined;
    /**
     * Assistant message for requests and responses
     */
    message: ChatAssistantMessage;
};
/** @internal */
export declare const ChatChoice$inboundSchema: z.ZodType<ChatChoice, unknown>;
export declare function chatChoiceFromJSON(jsonString: string): SafeParseResult<ChatChoice, SDKValidationError>;
//# sourceMappingURL=chatchoice.d.ts.map