import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningDetailEncrypted, ReasoningDetailEncrypted$Outbound } from "./reasoningdetailencrypted.js";
import { ReasoningDetailSummary, ReasoningDetailSummary$Outbound } from "./reasoningdetailsummary.js";
import { ReasoningDetailText, ReasoningDetailText$Outbound } from "./reasoningdetailtext.js";
/**
 * Reasoning detail union schema
 */
export type ReasoningDetailUnion = ReasoningDetailEncrypted | ReasoningDetailSummary | ReasoningDetailText | discriminatedUnionTypes.Unknown<"type">;
/** @internal */
export declare const ReasoningDetailUnion$inboundSchema: z.ZodType<ReasoningDetailUnion, unknown>;
/** @internal */
export type ReasoningDetailUnion$Outbound = ReasoningDetailEncrypted$Outbound | ReasoningDetailSummary$Outbound | ReasoningDetailText$Outbound;
/** @internal */
export declare const ReasoningDetailUnion$outboundSchema: z.ZodType<ReasoningDetailUnion$Outbound, ReasoningDetailUnion>;
export declare function reasoningDetailUnionToJSON(reasoningDetailUnion: ReasoningDetailUnion): string;
export declare function reasoningDetailUnionFromJSON(jsonString: string): SafeParseResult<ReasoningDetailUnion, SDKValidationError>;
//# sourceMappingURL=reasoningdetailunion.d.ts.map