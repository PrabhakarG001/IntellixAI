import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Error data for ConflictResponse
 */
export type ConflictResponseErrorData = {
    code: number;
    message: string;
    metadata?: {
        [k: string]: any | null;
    } | null | undefined;
};
/** @internal */
export declare const ConflictResponseErrorData$inboundSchema: z.ZodType<ConflictResponseErrorData, unknown>;
export declare function conflictResponseErrorDataFromJSON(jsonString: string): SafeParseResult<ConflictResponseErrorData, SDKValidationError>;
//# sourceMappingURL=conflictresponseerrordata.d.ts.map