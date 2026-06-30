import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { ImageGenerationServerToolConfig, ImageGenerationServerToolConfig$Outbound } from "./imagegenerationservertoolconfig.js";
export declare const ImageGenerationServerToolOpenRouterType: {
    readonly OpenrouterImageGeneration: "openrouter:image_generation";
};
export type ImageGenerationServerToolOpenRouterType = ClosedEnum<typeof ImageGenerationServerToolOpenRouterType>;
/**
 * OpenRouter built-in server tool: generates images from text prompts using an image generation model
 */
export type ImageGenerationServerToolOpenRouter = {
    /**
     * Configuration for the openrouter:image_generation server tool. Accepts all image_config params (aspect_ratio, quality, size, background, output_format, output_compression, moderation, etc.) plus a model field.
     */
    parameters?: ImageGenerationServerToolConfig | undefined;
    type: ImageGenerationServerToolOpenRouterType;
};
/** @internal */
export declare const ImageGenerationServerToolOpenRouterType$outboundSchema: z.ZodEnum<typeof ImageGenerationServerToolOpenRouterType>;
/** @internal */
export type ImageGenerationServerToolOpenRouter$Outbound = {
    parameters?: ImageGenerationServerToolConfig$Outbound | undefined;
    type: string;
};
/** @internal */
export declare const ImageGenerationServerToolOpenRouter$outboundSchema: z.ZodType<ImageGenerationServerToolOpenRouter$Outbound, ImageGenerationServerToolOpenRouter>;
export declare function imageGenerationServerToolOpenRouterToJSON(imageGenerationServerToolOpenRouter: ImageGenerationServerToolOpenRouter): string;
//# sourceMappingURL=imagegenerationservertoolopenrouter.d.ts.map