import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Audio output data or reference
 */
export type ChatAudioOutput = {
    /**
     * Base64 encoded audio data
     */
    data?: string | undefined;
    /**
     * Audio expiration timestamp
     */
    expiresAt?: number | undefined;
    /**
     * Audio output identifier
     */
    id?: string | undefined;
    /**
     * Audio transcript
     */
    transcript?: string | undefined;
};
/** @internal */
export declare const ChatAudioOutput$inboundSchema: z.ZodType<ChatAudioOutput, unknown>;
/** @internal */
export type ChatAudioOutput$Outbound = {
    data?: string | undefined;
    expires_at?: number | undefined;
    id?: string | undefined;
    transcript?: string | undefined;
};
/** @internal */
export declare const ChatAudioOutput$outboundSchema: z.ZodType<ChatAudioOutput$Outbound, ChatAudioOutput>;
export declare function chatAudioOutputToJSON(chatAudioOutput: ChatAudioOutput): string;
export declare function chatAudioOutputFromJSON(jsonString: string): SafeParseResult<ChatAudioOutput, SDKValidationError>;
//# sourceMappingURL=chataudiooutput.d.ts.map