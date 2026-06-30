import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningFormat } from "./reasoningformat.js";
/**
 * Reasoning detail summary schema
 */
export type ReasoningDetailSummary = {
    format?: ReasoningFormat | null | undefined;
    id?: string | null | undefined;
    index?: number | undefined;
    summary: string;
    type: "reasoning.summary";
};
/** @internal */
export declare const ReasoningDetailSummary$inboundSchema: z.ZodType<ReasoningDetailSummary, unknown>;
/** @internal */
export type ReasoningDetailSummary$Outbound = {
    format?: string | null | undefined;
    id?: string | null | undefined;
    index?: number | undefined;
    summary: string;
    type: "reasoning.summary";
};
/** @internal */
export declare const ReasoningDetailSummary$outboundSchema: z.ZodType<ReasoningDetailSummary$Outbound, ReasoningDetailSummary>;
export declare function reasoningDetailSummaryToJSON(reasoningDetailSummary: ReasoningDetailSummary): string;
export declare function reasoningDetailSummaryFromJSON(jsonString: string): SafeParseResult<ReasoningDetailSummary, SDKValidationError>;
//# sourceMappingURL=reasoningdetailsummary.d.ts.map