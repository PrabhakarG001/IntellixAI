import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningSummaryText } from "./reasoningsummarytext.js";
/**
 * Event emitted when a reasoning summary part is complete
 */
export type ReasoningSummaryPartDoneEvent = {
    itemId: string;
    outputIndex: number;
    part: ReasoningSummaryText;
    sequenceNumber: number;
    summaryIndex: number;
    type: "response.reasoning_summary_part.done";
};
/** @internal */
export declare const ReasoningSummaryPartDoneEvent$inboundSchema: z.ZodType<ReasoningSummaryPartDoneEvent, unknown>;
export declare function reasoningSummaryPartDoneEventFromJSON(jsonString: string): SafeParseResult<ReasoningSummaryPartDoneEvent, SDKValidationError>;
//# sourceMappingURL=reasoningsummarypartdoneevent.d.ts.map