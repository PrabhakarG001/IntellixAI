import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningSummaryText } from "./reasoningsummarytext.js";
/**
 * Event emitted when a reasoning summary part is added
 */
export type ReasoningSummaryPartAddedEvent = {
    itemId: string;
    outputIndex: number;
    part: ReasoningSummaryText;
    sequenceNumber: number;
    summaryIndex: number;
    type: "response.reasoning_summary_part.added";
};
/** @internal */
export declare const ReasoningSummaryPartAddedEvent$inboundSchema: z.ZodType<ReasoningSummaryPartAddedEvent, unknown>;
export declare function reasoningSummaryPartAddedEventFromJSON(jsonString: string): SafeParseResult<ReasoningSummaryPartAddedEvent, SDKValidationError>;
//# sourceMappingURL=reasoningsummarypartaddedevent.d.ts.map