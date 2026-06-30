import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Breakdown of upstream inference costs
 */
export type CostDetails = {
    upstreamInferenceCompletionsCost: number;
    upstreamInferenceCost?: number | null | undefined;
    upstreamInferencePromptCost: number;
};
/** @internal */
export declare const CostDetails$inboundSchema: z.ZodType<CostDetails, unknown>;
export declare function costDetailsFromJSON(jsonString: string): SafeParseResult<CostDetails, SDKValidationError>;
//# sourceMappingURL=costdetails.d.ts.map