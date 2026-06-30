import * as z from "zod/v4";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
export type FrameImageImageUrl = {
    url: string;
};
export declare const FrameImageType: {
    readonly ImageUrl: "image_url";
};
export type FrameImageType = ClosedEnum<typeof FrameImageType>;
/**
 * Whether this image represents the first or last frame of the video
 */
export declare const FrameType: {
    readonly FirstFrame: "first_frame";
    readonly LastFrame: "last_frame";
};
/**
 * Whether this image represents the first or last frame of the video
 */
export type FrameType = OpenEnum<typeof FrameType>;
export type FrameImage = {
    imageUrl: FrameImageImageUrl;
    type: FrameImageType;
    /**
     * Whether this image represents the first or last frame of the video
     */
    frameType: FrameType;
};
/** @internal */
export type FrameImageImageUrl$Outbound = {
    url: string;
};
/** @internal */
export declare const FrameImageImageUrl$outboundSchema: z.ZodType<FrameImageImageUrl$Outbound, FrameImageImageUrl>;
export declare function frameImageImageUrlToJSON(frameImageImageUrl: FrameImageImageUrl): string;
/** @internal */
export declare const FrameImageType$outboundSchema: z.ZodEnum<typeof FrameImageType>;
/** @internal */
export declare const FrameType$outboundSchema: z.ZodType<string, FrameType>;
/** @internal */
export type FrameImage$Outbound = {
    image_url: FrameImageImageUrl$Outbound;
    type: string;
    frame_type: string;
};
/** @internal */
export declare const FrameImage$outboundSchema: z.ZodType<FrameImage$Outbound, FrameImage>;
export declare function frameImageToJSON(frameImage: FrameImage): string;
//# sourceMappingURL=frameimage.d.ts.map