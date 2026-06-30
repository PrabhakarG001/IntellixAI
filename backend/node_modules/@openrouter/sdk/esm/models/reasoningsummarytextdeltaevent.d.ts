import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when reasoning summary text delta is streamed
 */
export type ReasoningSummaryTextDeltaEvent = {
    delta: string;
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    summaryIndex: number;
    type: "response.reasoning_summary_text.delta";
};
/** @internal */
export declare const ReasoningSummaryTextDeltaEvent$inboundSchema: z.ZodType<ReasoningSummaryTextDeltaEvent, unknown>;
export declare function reasoningSummaryTextDeltaEventFromJSON(jsonString: string): SafeParseResult<ReasoningSummaryTextDeltaEvent, SDKValidationError>;
//# sourceMappingURL=reasoningsummarytextdeltaevent.d.ts.map