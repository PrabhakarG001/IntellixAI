import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Web search call is searching
 */
export type WebSearchCallSearchingEvent = {
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.web_search_call.searching";
};
/** @internal */
export declare const WebSearchCallSearchingEvent$inboundSchema: z.ZodType<WebSearchCallSearchingEvent, unknown>;
export declare function webSearchCallSearchingEventFromJSON(jsonString: string): SafeParseResult<WebSearchCallSearchingEvent, SDKValidationError>;
//# sourceMappingURL=websearchcallsearchingevent.d.ts.map