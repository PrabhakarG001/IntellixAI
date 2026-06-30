import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Image generation call completed
 */
export type ImageGenCallCompletedEvent = {
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.image_generation_call.completed";
};
/** @internal */
export declare const ImageGenCallCompletedEvent$inboundSchema: z.ZodType<ImageGenCallCompletedEvent, unknown>;
export declare function imageGenCallCompletedEventFromJSON(jsonString: string): SafeParseResult<ImageGenCallCompletedEvent, SDKValidationError>;
//# sourceMappingURL=imagegencallcompletedevent.d.ts.map