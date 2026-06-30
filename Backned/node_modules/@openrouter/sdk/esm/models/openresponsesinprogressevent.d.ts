import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenResponsesResult } from "./openresponsesresult.js";
/**
 * Event emitted when a response is in progress
 */
export type OpenResponsesInProgressEvent = {
    /**
     * Complete non-streaming response from the Responses API
     */
    response: OpenResponsesResult;
    sequenceNumber: number;
    type: "response.in_progress";
};
/** @internal */
export declare const OpenResponsesInProgressEvent$inboundSchema: z.ZodType<OpenResponsesInProgressEvent, unknown>;
export declare function openResponsesInProgressEventFromJSON(jsonString: string): SafeParseResult<OpenResponsesInProgressEvent, SDKValidationError>;
//# sourceMappingURL=openresponsesinprogressevent.d.ts.map