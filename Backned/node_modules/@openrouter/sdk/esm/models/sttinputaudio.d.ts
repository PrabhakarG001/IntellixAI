import * as z from "zod/v4";
/**
 * Base64-encoded audio to transcribe
 */
export type STTInputAudio = {
    /**
     * Base64-encoded audio data (raw bytes, not a data URI)
     */
    data: string;
    /**
     * Audio format (e.g., wav, mp3, flac, m4a, ogg, webm, aac). Supported formats vary by provider.
     */
    format: string;
};
/** @internal */
export type STTInputAudio$Outbound = {
    data: string;
    format: string;
};
/** @internal */
export declare const STTInputAudio$outboundSchema: z.ZodType<STTInputAudio$Outbound, STTInputAudio>;
export declare function sttInputAudioToJSON(sttInputAudio: STTInputAudio): string;
//# sourceMappingURL=sttinputaudio.d.ts.map