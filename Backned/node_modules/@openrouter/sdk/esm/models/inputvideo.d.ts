import * as z from "zod/v4";
/**
 * Video input content item
 */
export type InputVideo = {
    type: "input_video";
    /**
     * A base64 data URL or remote URL that resolves to a video file
     */
    videoUrl: string;
};
/** @internal */
export type InputVideo$Outbound = {
    type: "input_video";
    video_url: string;
};
/** @internal */
export declare const InputVideo$outboundSchema: z.ZodType<InputVideo$Outbound, InputVideo>;
export declare function inputVideoToJSON(inputVideo: InputVideo): string;
//# sourceMappingURL=inputvideo.d.ts.map