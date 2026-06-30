import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatContentVideoInput, ChatContentVideoInput$Outbound } from "./chatcontentvideoinput.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Video input content part (legacy format - deprecated)
 *
 * @deprecated class: This will be removed in a future release, please migrate away from it as soon as possible.
 */
export type LegacyChatContentVideo = {
    type: "input_video";
    /**
     * Video input object
     */
    videoUrl: ChatContentVideoInput;
};
/** @internal */
export declare const LegacyChatContentVideo$inboundSchema: z.ZodType<LegacyChatContentVideo, unknown>;
/** @internal */
export type LegacyChatContentVideo$Outbound = {
    type: "input_video";
    video_url: ChatContentVideoInput$Outbound;
};
/** @internal */
export declare const LegacyChatContentVideo$outboundSchema: z.ZodType<LegacyChatContentVideo$Outbound, LegacyChatContentVideo>;
export declare function legacyChatContentVideoToJSON(legacyChatContentVideo: LegacyChatContentVideo): string;
export declare function legacyChatContentVideoFromJSON(jsonString: string): SafeParseResult<LegacyChatContentVideo, SDKValidationError>;
//# sourceMappingURL=legacychatcontentvideo.d.ts.map