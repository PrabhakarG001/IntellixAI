import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type InputTokensDetails = {
    cachedTokens: number;
};
export type OutputTokensDetails = {
    reasoningTokens: number;
};
export type UsageCostDetails = {
    upstreamInferenceCost?: number | null | undefined;
    upstreamInferenceInputCost: number;
    upstreamInferenceOutputCost: number;
};
/**
 * Token usage information for the response
 */
export type Usage = {
    inputTokens: number;
    inputTokensDetails: InputTokensDetails;
    outputTokens: number;
    outputTokensDetails: OutputTokensDetails;
    totalTokens: number;
    /**
     * Cost of the completion
     */
    cost?: number | null | undefined;
    costDetails?: UsageCostDetails | undefined;
    /**
     * Whether a request was made using a Bring Your Own Key configuration
     */
    isByok?: boolean | undefined;
};
/** @internal */
export declare const InputTokensDetails$inboundSchema: z.ZodType<InputTokensDetails, unknown>;
export declare function inputTokensDetailsFromJSON(jsonString: string): SafeParseResult<InputTokensDetails, SDKValidationError>;
/** @internal */
export declare const OutputTokensDetails$inboundSchema: z.ZodType<OutputTokensDetails, unknown>;
export declare function outputTokensDetailsFromJSON(jsonString: string): SafeParseResult<OutputTokensDetails, SDKValidationError>;
/** @internal */
export declare const UsageCostDetails$inboundSchema: z.ZodType<UsageCostDetails, unknown>;
export declare function usageCostDetailsFromJSON(jsonString: string): SafeParseResult<UsageCostDetails, SDKValidationError>;
/** @internal */
export declare const Usage$inboundSchema: z.ZodType<Usage, unknown>;
export declare function usageFromJSON(jsonString: string): SafeParseResult<Usage, SDKValidationError>;
//# sourceMappingURL=usage.d.ts.map