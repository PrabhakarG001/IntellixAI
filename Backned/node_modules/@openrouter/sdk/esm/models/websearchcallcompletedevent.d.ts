import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Web search call completed
 */
export type WebSearchCallCompletedEvent = {
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.web_search_call.completed";
};
/** @internal */
export declare const WebSearchCallCompletedEvent$inboundSchema: z.ZodType<WebSearchCallCompletedEvent, unknown>;
export declare function webSearchCallCompletedEventFromJSON(jsonString: string): SafeParseResult<WebSearchCallCompletedEvent, SDKValidationError>;
//# sourceMappingURL=websearchcallcompletedevent.d.ts.map