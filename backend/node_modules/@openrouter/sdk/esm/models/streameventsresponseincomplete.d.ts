import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenResponsesResult } from "./openresponsesresult.js";
/**
 * Event emitted when a response is incomplete
 */
export type StreamEventsResponseIncomplete = {
    /**
     * Complete non-streaming response from the Responses API
     */
    response: OpenResponsesResult;
    sequenceNumber: number;
    type: "response.incomplete";
};
/** @internal */
export declare const StreamEventsResponseIncomplete$inboundSchema: z.ZodType<StreamEventsResponseIncomplete, unknown>;
export declare function streamEventsResponseIncompleteFromJSON(jsonString: string): SafeParseResult<StreamEventsResponseIncomplete, SDKValidationError>;
//# sourceMappingURL=streameventsresponseincomplete.d.ts.map