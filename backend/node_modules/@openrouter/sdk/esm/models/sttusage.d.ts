import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Aggregated usage statistics for the request
 */
export type STTUsage = {
    /**
     * Total cost of the request in USD
     */
    cost?: number | undefined;
    /**
     * Number of input tokens billed for this request
     */
    inputTokens?: number | undefined;
    /**
     * Number of output tokens generated
     */
    outputTokens?: number | undefined;
    /**
     * Duration of the input audio in seconds
     */
    seconds?: number | undefined;
    /**
     * Total number of tokens used (input + output)
     */
    totalTokens?: number | undefined;
};
/** @internal */
export declare const STTUsage$inboundSchema: z.ZodType<STTUsage, unknown>;
export declare function sttUsageFromJSON(jsonString: string): SafeParseResult<STTUsage, SDKValidationError>;
//# sourceMappingURL=sttusage.d.ts.map