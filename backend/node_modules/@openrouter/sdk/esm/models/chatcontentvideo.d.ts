import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatContentVideoInput, ChatContentVideoInput$Outbound } from "./chatcontentvideoinput.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Video input content part
 */
export type ChatContentVideo = {
    type: "video_url";
    /**
     * Video input object
     */
    videoUrl: ChatContentVideoInput;
};
/** @internal */
export declare const ChatContentVideo$inboundSchema: z.ZodType<ChatContentVideo, unknown>;
/** @internal */
export type ChatContentVideo$Outbound = {
    type: "video_url";
    video_url: ChatContentVideoInput$Outbound;
};
/** @internal */
export declare const ChatContentVideo$outboundSchema: z.ZodType<ChatContentVideo$Outbound, ChatContentVideo>;
export declare function chatContentVideoToJSON(chatContentVideo: ChatContentVideo): string;
export declare function chatContentVideoFromJSON(jsonString: string): SafeParseResult<ChatContentVideo, SDKValidationError>;
//# sourceMappingURL=chatcontentvideo.d.ts.map