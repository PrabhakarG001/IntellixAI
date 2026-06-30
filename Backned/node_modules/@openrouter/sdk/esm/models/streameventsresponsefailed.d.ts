import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenResponsesResult } from "./openresponsesresult.js";
/**
 * Event emitted when a response has failed
 */
export type StreamEventsResponseFailed = {
    /**
     * Complete non-streaming response from the Responses API
     */
    response: OpenResponsesResult;
    sequenceNumber: number;
    type: "response.failed";
};
/** @internal */
export declare const StreamEventsResponseFailed$inboundSchema: z.ZodType<StreamEventsResponseFailed, unknown>;
export declare function streamEventsResponseFailedFromJSON(jsonString: string): SafeParseResult<StreamEventsResponseFailed, SDKValidationError>;
//# sourceMappingURL=streameventsresponsefailed.d.ts.map