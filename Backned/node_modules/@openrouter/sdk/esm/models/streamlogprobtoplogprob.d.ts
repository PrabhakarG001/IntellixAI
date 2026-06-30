import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Alternative token with its log probability
 */
export type StreamLogprobTopLogprob = {
    bytes?: Array<number> | undefined;
    logprob?: number | undefined;
    token?: string | undefined;
};
/** @internal */
export declare const StreamLogprobTopLogprob$inboundSchema: z.ZodType<StreamLogprobTopLogprob, unknown>;
export declare function streamLogprobTopLogprobFromJSON(jsonString: string): SafeParseResult<StreamLogprobTopLogprob, SDKValidationError>;
//# sourceMappingURL=streamlogprobtoplogprob.d.ts.map