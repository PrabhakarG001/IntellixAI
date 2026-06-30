import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type ChatContentAudioInputAudio = {
    /**
     * Base64 encoded audio data
     */
    data: string;
    /**
     * Audio format (e.g., wav, mp3, flac, m4a, ogg, aiff, aac, pcm16, pcm24). Supported formats vary by provider.
     */
    format: string;
};
/**
 * Audio input content part. Supported audio formats vary by provider.
 */
export type ChatContentAudio = {
    inputAudio: ChatContentAudioInputAudio;
    type: "input_audio";
};
/** @internal */
export declare const ChatContentAudioInputAudio$inboundSchema: z.ZodType<ChatContentAudioInputAudio, unknown>;
/** @internal */
export type ChatContentAudioInputAudio$Outbound = {
    data: string;
    format: string;
};
/** @internal */
export declare const ChatContentAudioInputAudio$outboundSchema: z.ZodType<ChatContentAudioInputAudio$Outbound, ChatContentAudioInputAudio>;
export declare function chatContentAudioInputAudioToJSON(chatContentAudioInputAudio: ChatContentAudioInputAudio): string;
export declare function chatContentAudioInputAudioFromJSON(jsonString: string): SafeParseResult<ChatContentAudioInputAudio, SDKValidationError>;
/** @internal */
export declare const ChatContentAudio$inboundSchema: z.ZodType<ChatContentAudio, unknown>;
/** @internal */
export type ChatContentAudio$Outbound = {
    input_audio: ChatContentAudioInputAudio$Outbound;
    type: "input_audio";
};
/** @internal */
export declare const ChatContentAudio$outboundSchema: z.ZodType<ChatContentAudio$Outbound, ChatContentAudio>;
export declare function chatContentAudioToJSON(chatContentAudio: ChatContentAudio): string;
export declare function chatContentAudioFromJSON(jsonString: string): SafeParseResult<ChatContentAudio, SDKValidationError>;
//# sourceMappingURL=chatcontentaudio.d.ts.map