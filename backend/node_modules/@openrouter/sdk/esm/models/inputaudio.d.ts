import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const FormatEnum: {
    readonly Mp3: "mp3";
    readonly Wav: "wav";
};
export type FormatEnum = OpenEnum<typeof FormatEnum>;
export type InputAudioInputAudio = {
    data: string;
    format: FormatEnum;
};
/**
 * Audio input content item
 */
export type InputAudio = {
    inputAudio: InputAudioInputAudio;
    type: "input_audio";
};
/** @internal */
export declare const FormatEnum$inboundSchema: z.ZodType<FormatEnum, unknown>;
/** @internal */
export declare const FormatEnum$outboundSchema: z.ZodType<string, FormatEnum>;
/** @internal */
export declare const InputAudioInputAudio$inboundSchema: z.ZodType<InputAudioInputAudio, unknown>;
/** @internal */
export type InputAudioInputAudio$Outbound = {
    data: string;
    format: string;
};
/** @internal */
export declare const InputAudioInputAudio$outboundSchema: z.ZodType<InputAudioInputAudio$Outbound, InputAudioInputAudio>;
export declare function inputAudioInputAudioToJSON(inputAudioInputAudio: InputAudioInputAudio): string;
export declare function inputAudioInputAudioFromJSON(jsonString: string): SafeParseResult<InputAudioInputAudio, SDKValidationError>;
/** @internal */
export declare const InputAudio$inboundSchema: z.ZodType<InputAudio, unknown>;
/** @internal */
export type InputAudio$Outbound = {
    input_audio: InputAudioInputAudio$Outbound;
    type: "input_audio";
};
/** @internal */
export declare const InputAudio$outboundSchema: z.ZodType<InputAudio$Outbound, InputAudio>;
export declare function inputAudioToJSON(inputAudio: InputAudio): string;
export declare function inputAudioFromJSON(jsonString: string): SafeParseResult<InputAudio, SDKValidationError>;
//# sourceMappingURL=inputaudio.d.ts.map