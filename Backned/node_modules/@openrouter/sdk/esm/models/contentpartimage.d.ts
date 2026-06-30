import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
export type ContentPartImageImageUrl = {
    url: string;
};
export declare const ContentPartImageType: {
    readonly ImageUrl: "image_url";
};
export type ContentPartImageType = ClosedEnum<typeof ContentPartImageType>;
export type ContentPartImage = {
    imageUrl: ContentPartImageImageUrl;
    type: ContentPartImageType;
};
/** @internal */
export type ContentPartImageImageUrl$Outbound = {
    url: string;
};
/** @internal */
export declare const ContentPartImageImageUrl$outboundSchema: z.ZodType<ContentPartImageImageUrl$Outbound, ContentPartImageImageUrl>;
export declare function contentPartImageImageUrlToJSON(contentPartImageImageUrl: ContentPartImageImageUrl): string;
/** @internal */
export declare const ContentPartImageType$outboundSchema: z.ZodEnum<typeof ContentPartImageType>;
/** @internal */
export type ContentPartImage$Outbound = {
    image_url: ContentPartImageImageUrl$Outbound;
    type: string;
};
/** @internal */
export declare const ContentPartImage$outboundSchema: z.ZodType<ContentPartImage$Outbound, ContentPartImage>;
export declare function contentPartImageToJSON(contentPartImage: ContentPartImage): string;
//# sourceMappingURL=contentpartimage.d.ts.map