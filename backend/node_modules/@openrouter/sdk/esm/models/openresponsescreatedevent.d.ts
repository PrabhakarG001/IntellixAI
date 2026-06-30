import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenResponsesResult } from "./openresponsesresult.js";
/**
 * Event emitted when a response is created
 */
export type OpenResponsesCreatedEvent = {
    /**
     * Complete non-streaming response from the Responses API
     */
    response: OpenResponsesResult;
    sequenceNumber: number;
    type: "response.created";
};
/** @internal */
export declare const OpenResponsesCreatedEvent$inboundSchema: z.ZodType<OpenResponsesCreatedEvent, unknown>;
export declare function openResponsesCreatedEventFromJSON(jsonString: string): SafeParseResult<OpenResponsesCreatedEvent, SDKValidationError>;
//# sourceMappingURL=openresponsescreatedevent.d.ts.map