import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { STTUsage } from "./sttusage.js";
/**
 * STT response containing transcribed text and optional usage statistics
 */
export type STTResponse = {
    /**
     * The transcribed text
     */
    text: string;
    /**
     * Aggregated usage statistics for the request
     */
    usage?: STTUsage | undefined;
};
/** @internal */
export declare const STTResponse$inboundSchema: z.ZodType<STTResponse, unknown>;
export declare function sttResponseFromJSON(jsonString: string): SafeParseResult<STTResponse, SDKValidationError>;
//# sourceMappingURL=sttresponse.d.ts.map