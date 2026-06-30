import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { StreamLogprobTopLogprob } from "./streamlogprobtoplogprob.js";
/**
 * Log probability information for a token
 */
export type StreamLogprob = {
    bytes?: Array<number> | undefined;
    logprob: number;
    token: string;
    topLogprobs?: Array<StreamLogprobTopLogprob> | undefined;
};
/** @internal */
export declare const StreamLogprob$inboundSchema: z.ZodType<StreamLogprob, unknown>;
export declare function streamLogprobFromJSON(jsonString: string): SafeParseResult<StreamLogprob, SDKValidationError>;
//# sourceMappingURL=streamlogprob.d.ts.map