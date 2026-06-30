import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningFormat } from "./reasoningformat.js";
/**
 * Reasoning detail encrypted schema
 */
export type ReasoningDetailEncrypted = {
    data: string;
    format?: ReasoningFormat | null | undefined;
    id?: string | null | undefined;
    index?: number | undefined;
    type: "reasoning.encrypted";
};
/** @internal */
export declare const ReasoningDetailEncrypted$inboundSchema: z.ZodType<ReasoningDetailEncrypted, unknown>;
/** @internal */
export type ReasoningDetailEncrypted$Outbound = {
    data: string;
    format?: string | null | undefined;
    id?: string | null | undefined;
    index?: number | undefined;
    type: "reasoning.encrypted";
};
/** @internal */
export declare const ReasoningDetailEncrypted$outboundSchema: z.ZodType<ReasoningDetailEncrypted$Outbound, ReasoningDetailEncrypted>;
export declare function reasoningDetailEncryptedToJSON(reasoningDetailEncrypted: ReasoningDetailEncrypted): string;
export declare function reasoningDetailEncryptedFromJSON(jsonString: string): SafeParseResult<ReasoningDetailEncrypted, SDKValidationError>;
//# sourceMappingURL=reasoningdetailencrypted.d.ts.map