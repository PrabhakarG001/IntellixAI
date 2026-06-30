import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when refusal streaming is complete
 */
export type RefusalDoneEvent = {
    contentIndex: number;
    itemId: string;
    outputIndex: number;
    refusal: string;
    sequenceNumber: number;
    type: "response.refusal.done";
};
/** @internal */
export declare const RefusalDoneEvent$inboundSchema: z.ZodType<RefusalDoneEvent, unknown>;
export declare function refusalDoneEventFromJSON(jsonString: string): SafeParseResult<RefusalDoneEvent, SDKValidationError>;
//# sourceMappingURL=refusaldoneevent.d.ts.map