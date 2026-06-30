import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Image generation call with partial image
 */
export type ImageGenCallPartialImageEvent = {
    itemId: string;
    outputIndex: number;
    partialImageB64: string;
    partialImageIndex: number;
    sequenceNumber: number;
    type: "response.image_generation_call.partial_image";
};
/** @internal */
export declare const ImageGenCallPartialImageEvent$inboundSchema: z.ZodType<ImageGenCallPartialImageEvent, unknown>;
export declare function imageGenCallPartialImageEventFromJSON(jsonString: string): SafeParseResult<ImageGenCallPartialImageEvent, SDKValidationError>;
//# sourceMappingURL=imagegencallpartialimageevent.d.ts.map