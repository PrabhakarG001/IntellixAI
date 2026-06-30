import * as z from "zod/v4";
export type ImageConfig = string | number | Array<any | null>;
/** @internal */
export type ImageConfig$Outbound = string | number | Array<any | null>;
/** @internal */
export declare const ImageConfig$outboundSchema: z.ZodType<ImageConfig$Outbound, ImageConfig>;
export declare function imageConfigToJSON(imageConfig: ImageConfig): string;
//# sourceMappingURL=imageconfig.d.ts.map