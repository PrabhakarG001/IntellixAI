import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when reasoning text delta is streamed
 */
export type ReasoningDeltaEvent = {
    contentIndex: number;
    delta: string;
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.reasoning_text.delta";
};
/** @internal */
export declare const ReasoningDeltaEvent$inboundSchema: z.ZodType<ReasoningDeltaEvent, unknown>;
export declare function reasoningDeltaEventFromJSON(jsonString: string): SafeParseResult<ReasoningDeltaEvent, SDKValidationError>;
//# sourceMappingURL=reasoningdeltaevent.d.ts.map