import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OutputItems } from "./outputitems.js";
/**
 * Event emitted when a new output item is added to the response
 */
export type StreamEventsResponseOutputItemAdded = {
    /**
     * An output item from the response
     */
    item: OutputItems;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.output_item.added";
};
/** @internal */
export declare const StreamEventsResponseOutputItemAdded$inboundSchema: z.ZodType<StreamEventsResponseOutputItemAdded, unknown>;
export declare function streamEventsResponseOutputItemAddedFromJSON(jsonString: string): SafeParseResult<StreamEventsResponseOutputItemAdded, SDKValidationError>;
//# sourceMappingURL=streameventsresponseoutputitemadded.d.ts.map