import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when a refusal delta is streamed
 */
export type RefusalDeltaEvent = {
    contentIndex: number;
    delta: string;
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.refusal.delta";
};
/** @internal */
export declare const RefusalDeltaEvent$inboundSchema: z.ZodType<RefusalDeltaEvent, unknown>;
export declare function refusalDeltaEventFromJSON(jsonString: string): SafeParseResult<RefusalDeltaEvent, SDKValidationError>;
//# sourceMappingURL=refusaldeltaevent.d.ts.map