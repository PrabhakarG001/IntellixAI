import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when reasoning text streaming is complete
 */
export type ReasoningDoneEvent = {
    contentIndex: number;
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    text: string;
    type: "response.reasoning_text.done";
};
/** @internal */
export declare const ReasoningDoneEvent$inboundSchema: z.ZodType<ReasoningDoneEvent, unknown>;
export declare function reasoningDoneEventFromJSON(jsonString: string): SafeParseResult<ReasoningDoneEvent, SDKValidationError>;
//# sourceMappingURL=reasoningdoneevent.d.ts.map