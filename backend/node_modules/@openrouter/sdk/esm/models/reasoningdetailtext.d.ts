import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningFormat } from "./reasoningformat.js";
/**
 * Reasoning detail text schema
 */
export type ReasoningDetailText = {
    format?: ReasoningFormat | null | undefined;
    id?: string | null | undefined;
    index?: number | undefined;
    signature?: string | null | undefined;
    text?: string | null | undefined;
    type: "reasoning.text";
};
/** @internal */
export declare const ReasoningDetailText$inboundSchema: z.ZodType<ReasoningDetailText, unknown>;
/** @internal */
export type ReasoningDetailText$Outbound = {
    format?: string | null | undefined;
    id?: string | null | undefined;
    index?: number | undefined;
    signature?: string | null | undefined;
    text?: string | null | undefined;
    type: "reasoning.text";
};
/** @internal */
export declare const ReasoningDetailText$outboundSchema: z.ZodType<ReasoningDetailText$Outbound, ReasoningDetailText>;
export declare function reasoningDetailTextToJSON(reasoningDetailText: ReasoningDetailText): string;
export declare function reasoningDetailTextFromJSON(jsonString: string): SafeParseResult<ReasoningDetailText, SDKValidationError>;
//# sourceMappingURL=reasoningdetailtext.d.ts.map