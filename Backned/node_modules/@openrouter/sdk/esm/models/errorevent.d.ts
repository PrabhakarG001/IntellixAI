import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Event emitted when an error occurs during streaming
 */
export type ErrorEvent = {
    code: string | null;
    message: string;
    param: string | null;
    sequenceNumber: number;
    type: "error";
};
/** @internal */
export declare const ErrorEvent$inboundSchema: z.ZodType<ErrorEvent, unknown>;
export declare function errorEventFromJSON(jsonString: string): SafeParseResult<ErrorEvent, SDKValidationError>;
//# sourceMappingURL=errorevent.d.ts.map