import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenResponsesResult } from "./openresponsesresult.js";
/**
 * Event emitted when a response has completed successfully
 */
export type StreamEventsResponseCompleted = {
    /**
     * Complete non-streaming response from the Responses API
     */
    response: OpenResponsesResult;
    sequenceNumber: number;
    type: "response.completed";
};
/** @internal */
export declare const StreamEventsResponseCompleted$inboundSchema: z.ZodType<StreamEventsResponseCompleted, unknown>;
export declare function streamEventsResponseCompletedFromJSON(jsonString: string): SafeParseResult<StreamEventsResponseCompleted, SDKValidationError>;
//# sourceMappingURL=streameventsresponsecompleted.d.ts.map