import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Image generation call in progress
 */
export type ImageGenCallInProgressEvent = {
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.image_generation_call.in_progress";
};
/** @internal */
export declare const ImageGenCallInProgressEvent$inboundSchema: z.ZodType<ImageGenCallInProgressEvent, unknown>;
export declare function imageGenCallInProgressEventFromJSON(jsonString: string): SafeParseResult<ImageGenCallInProgressEvent, SDKValidationError>;
//# sourceMappingURL=imagegencallinprogressevent.d.ts.map