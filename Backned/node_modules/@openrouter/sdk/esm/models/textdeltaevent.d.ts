import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { StreamLogprob } from "./streamlogprob.js";
/**
 * Event emitted when a text delta is streamed
 */
export type TextDeltaEvent = {
    contentIndex: number;
    delta: string;
    itemId: string;
    logprobs: Array<StreamLogprob>;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.output_text.delta";
};
/** @internal */
export declare const TextDeltaEvent$inboundSchema: z.ZodType<TextDeltaEvent, unknown>;
export declare function textDeltaEventFromJSON(jsonString: string): SafeParseResult<TextDeltaEvent, SDKValidationError>;
//# sourceMappingURL=textdeltaevent.d.ts.map