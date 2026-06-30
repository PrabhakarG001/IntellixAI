import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ImageGenerationStatus } from "./imagegenerationstatus.js";
export declare const OutputImageGenerationCallItemType: {
    readonly ImageGenerationCall: "image_generation_call";
};
export type OutputImageGenerationCallItemType = ClosedEnum<typeof OutputImageGenerationCallItemType>;
export type OutputImageGenerationCallItem = {
    id: string;
    result?: string | null | undefined;
    status: ImageGenerationStatus;
    type: OutputImageGenerationCallItemType;
};
/** @internal */
export declare const OutputImageGenerationCallItemType$inboundSchema: z.ZodEnum<typeof OutputImageGenerationCallItemType>;
/** @internal */
export declare const OutputImageGenerationCallItemType$outboundSchema: z.ZodEnum<typeof OutputImageGenerationCallItemType>;
/** @internal */
export declare const OutputImageGenerationCallItem$inboundSchema: z.ZodType<OutputImageGenerationCallItem, unknown>;
/** @internal */
export type OutputImageGenerationCallItem$Outbound = {
    id: string;
    result: string | null;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputImageGenerationCallItem$outboundSchema: z.ZodType<OutputImageGenerationCallItem$Outbound, OutputImageGenerationCallItem>;
export declare function outputImageGenerationCallItemToJSON(outputImageGenerationCallItem: OutputImageGenerationCallItem): string;
export declare function outputImageGenerationCallItemFromJSON(jsonString: string): SafeParseResult<OutputImageGenerationCallItem, SDKValidationError>;
//# sourceMappingURL=outputimagegenerationcallitem.d.ts.map