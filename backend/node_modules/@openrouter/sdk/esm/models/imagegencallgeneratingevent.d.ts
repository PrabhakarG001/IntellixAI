import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Image generation call is generating
 */
export type ImageGenCallGeneratingEvent = {
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.image_generation_call.generating";
};
/** @internal */
export declare const ImageGenCallGeneratingEvent$inboundSchema: z.ZodType<ImageGenCallGeneratingEvent, unknown>;
export declare function imageGenCallGeneratingEventFromJSON(jsonString: string): SafeParseResult<ImageGenCallGeneratingEvent, SDKValidationError>;
//# sourceMappingURL=imagegencallgeneratingevent.d.ts.map