import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputImageGenerationServerToolItemType: {
    readonly OpenrouterImageGeneration: "openrouter:image_generation";
};
export type OutputImageGenerationServerToolItemType = ClosedEnum<typeof OutputImageGenerationServerToolItemType>;
/**
 * An openrouter:image_generation server tool output item
 */
export type OutputImageGenerationServerToolItem = {
    id?: string | undefined;
    imageB64?: string | undefined;
    imageUrl?: string | undefined;
    /**
     * The generated image as a base64-encoded string or URL, matching OpenAI image_generation_call format
     */
    result?: string | null | undefined;
    revisedPrompt?: string | undefined;
    status: ToolCallStatus;
    type: OutputImageGenerationServerToolItemType;
};
/** @internal */
export declare const OutputImageGenerationServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputImageGenerationServerToolItemType>;
/** @internal */
export declare const OutputImageGenerationServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputImageGenerationServerToolItemType>;
/** @internal */
export declare const OutputImageGenerationServerToolItem$inboundSchema: z.ZodType<OutputImageGenerationServerToolItem, unknown>;
/** @internal */
export type OutputImageGenerationServerToolItem$Outbound = {
    id?: string | undefined;
    imageB64?: string | undefined;
    imageUrl?: string | undefined;
    result?: string | null | undefined;
    revisedPrompt?: string | undefined;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputImageGenerationServerToolItem$outboundSchema: z.ZodType<OutputImageGenerationServerToolItem$Outbound, OutputImageGenerationServerToolItem>;
export declare function outputImageGenerationServerToolItemToJSON(outputImageGenerationServerToolItem: OutputImageGenerationServerToolItem): string;
export declare function outputImageGenerationServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputImageGenerationServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputimagegenerationservertoolitem.d.ts.map