import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when function call arguments are being streamed
 */
export type FunctionCallArgsDeltaEvent = {
    delta: string;
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.function_call_arguments.delta";
};
/** @internal */
export declare const FunctionCallArgsDeltaEvent$inboundSchema: z.ZodType<FunctionCallArgsDeltaEvent, unknown>;
export declare function functionCallArgsDeltaEventFromJSON(jsonString: string): SafeParseResult<FunctionCallArgsDeltaEvent, SDKValidationError>;
//# sourceMappingURL=functioncallargsdeltaevent.d.ts.map