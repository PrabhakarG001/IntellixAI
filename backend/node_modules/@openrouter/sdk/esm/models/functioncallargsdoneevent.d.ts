import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when function call arguments streaming is complete
 */
export type FunctionCallArgsDoneEvent = {
    arguments: string;
    itemId: string;
    name: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.function_call_arguments.done";
};
/** @internal */
export declare const FunctionCallArgsDoneEvent$inboundSchema: z.ZodType<FunctionCallArgsDoneEvent, unknown>;
export declare function functionCallArgsDoneEventFromJSON(jsonString: string): SafeParseResult<FunctionCallArgsDoneEvent, SDKValidationError>;
//# sourceMappingURL=functioncallargsdoneevent.d.ts.map