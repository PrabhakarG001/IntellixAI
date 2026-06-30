import * as z from "zod/v4";
import { ImageGenerationServerToolConfigUnion } from "./imagegenerationservertoolconfigunion.js";
/**
 * Configuration for the openrouter:image_generation server tool. Accepts all image_config params (aspect_ratio, quality, size, background, output_format, output_compression, moderation, etc.) plus a model field.
 */
export type ImageGenerationServerToolConfig = {
    /**
     * Which image generation model to use (e.g. "openai/gpt-5-image"). Defaults to "openai/gpt-5-image".
     */
    model?: string | undefined;
    additionalProperties?: {
        [k: string]: ImageGenerationServerToolConfigUnion;
    } | undefined;
};
/** @internal */
export type ImageGenerationServerToolConfig$Outbound = {
    model?: string | undefined;
    [additionalProperties: string]: unknown;
};
/** @internal */
export declare const ImageGenerationServerToolConfig$outboundSchema: z.ZodType<ImageGenerationServerToolConfig$Outbound, ImageGenerationServerToolConfig>;
export declare function imageGenerationServerToolConfigToJSON(imageGenerationServerToolConfig: ImageGenerationServerToolConfig): string;
//# sourceMappingURL=imagegenerationservertoolconfig.d.ts.map