import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { StreamLogprob } from "./streamlogprob.js";
/**
 * Event emitted when text streaming is complete
 */
export type TextDoneEvent = {
    contentIndex: number;
    itemId: string;
    logprobs: Array<StreamLogprob>;
    outputIndex: number;
    sequenceNumber: number;
    text: string;
    type: "response.output_text.done";
};
/** @internal */
export declare const TextDoneEvent$inboundSchema: z.ZodType<TextDoneEvent, unknown>;
export declare function textDoneEventFromJSON(jsonString: string): SafeParseResult<TextDoneEvent, SDKValidationError>;
//# sourceMappingURL=textdoneevent.d.ts.map