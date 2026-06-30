import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when reasoning summary text streaming is complete
 */
export type ReasoningSummaryTextDoneEvent = {
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    summaryIndex: number;
    text: string;
    type: "response.reasoning_summary_text.done";
};
/** @internal */
export declare const ReasoningSummaryTextDoneEvent$inboundSchema: z.ZodType<ReasoningSummaryTextDoneEvent, unknown>;
export declare function reasoningSummaryTextDoneEventFromJSON(jsonString: string): SafeParseResult<ReasoningSummaryTextDoneEvent, SDKValidationError>;
//# sourceMappingURL=reasoningsummarytextdoneevent.d.ts.map