import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Web search call in progress
 */
export type WebSearchCallInProgressEvent = {
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.web_search_call.in_progress";
};
/** @internal */
export declare const WebSearchCallInProgressEvent$inboundSchema: z.ZodType<WebSearchCallInProgressEvent, unknown>;
export declare function webSearchCallInProgressEventFromJSON(jsonString: string): SafeParseResult<WebSearchCallInProgressEvent, SDKValidationError>;
//# sourceMappingURL=websearchcallinprogressevent.d.ts.map