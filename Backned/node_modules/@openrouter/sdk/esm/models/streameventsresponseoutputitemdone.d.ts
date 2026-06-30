import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OutputItems } from "./outputitems.js";
/**
 * Event emitted when an output item is complete
 */
export type StreamEventsResponseOutputItemDone = {
    /**
     * An output item from the response
     */
    item: OutputItems;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.output_item.done";
};
/** @internal */
export declare const StreamEventsResponseOutputItemDone$inboundSchema: z.ZodType<StreamEventsResponseOutputItemDone, unknown>;
export declare function streamEventsResponseOutputItemDoneFromJSON(jsonString: string): SafeParseResult<StreamEventsResponseOutputItemDone, SDKValidationError>;
//# sourceMappingURL=streameventsresponseoutputitemdone.d.ts.map