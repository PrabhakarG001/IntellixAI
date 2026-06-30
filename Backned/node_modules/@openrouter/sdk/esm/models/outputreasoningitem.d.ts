import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningFormat } from "./reasoningformat.js";
import { ReasoningSummaryText } from "./reasoningsummarytext.js";
import { ReasoningTextContent } from "./reasoningtextcontent.js";
export declare const OutputReasoningItemStatusInProgress: {
    readonly InProgress: "in_progress";
};
export type OutputReasoningItemStatusInProgress = ClosedEnum<typeof OutputReasoningItemStatusInProgress>;
export declare const OutputReasoningItemStatusIncomplete: {
    readonly Incomplete: "incomplete";
};
export type OutputReasoningItemStatusIncomplete = ClosedEnum<typeof OutputReasoningItemStatusIncomplete>;
export declare const OutputReasoningItemStatusCompleted: {
    readonly Completed: "completed";
};
export type OutputReasoningItemStatusCompleted = ClosedEnum<typeof OutputReasoningItemStatusCompleted>;
export type OutputReasoningItemStatusUnion = OutputReasoningItemStatusCompleted | OutputReasoningItemStatusIncomplete | OutputReasoningItemStatusInProgress;
/**
 * An output item containing reasoning
 */
export type OutputReasoningItem = {
    content?: Array<ReasoningTextContent> | null | undefined;
    encryptedContent?: string | null | undefined;
    id: string;
    status?: OutputReasoningItemStatusCompleted | OutputReasoningItemStatusIncomplete | OutputReasoningItemStatusInProgress | undefined;
    summary: Array<ReasoningSummaryText>;
    type: "reasoning";
    format?: ReasoningFormat | null | undefined;
    /**
     * A signature for the reasoning content, used for verification
     */
    signature?: string | null | undefined;
};
/** @internal */
export declare const OutputReasoningItemStatusInProgress$inboundSchema: z.ZodEnum<typeof OutputReasoningItemStatusInProgress>;
/** @internal */
export declare const OutputReasoningItemStatusIncomplete$inboundSchema: z.ZodEnum<typeof OutputReasoningItemStatusIncomplete>;
/** @internal */
export declare const OutputReasoningItemStatusCompleted$inboundSchema: z.ZodEnum<typeof OutputReasoningItemStatusCompleted>;
/** @internal */
export declare const OutputReasoningItemStatusUnion$inboundSchema: z.ZodType<OutputReasoningItemStatusUnion, unknown>;
export declare function outputReasoningItemStatusUnionFromJSON(jsonString: string): SafeParseResult<OutputReasoningItemStatusUnion, SDKValidationError>;
/** @internal */
export declare const OutputReasoningItem$inboundSchema: z.ZodType<OutputReasoningItem, unknown>;
export declare function outputReasoningItemFromJSON(jsonString: string): SafeParseResult<OutputReasoningItem, SDKValidationError>;
//# sourceMappingURL=outputreasoningitem.d.ts.map