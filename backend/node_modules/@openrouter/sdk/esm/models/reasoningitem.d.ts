import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { ReasoningFormat } from "./reasoningformat.js";
import { ReasoningSummaryText, ReasoningSummaryText$Outbound } from "./reasoningsummarytext.js";
import { ReasoningTextContent, ReasoningTextContent$Outbound } from "./reasoningtextcontent.js";
export declare const ReasoningItemStatusInProgress: {
    readonly InProgress: "in_progress";
};
export type ReasoningItemStatusInProgress = ClosedEnum<typeof ReasoningItemStatusInProgress>;
export declare const ReasoningItemStatusIncomplete: {
    readonly Incomplete: "incomplete";
};
export type ReasoningItemStatusIncomplete = ClosedEnum<typeof ReasoningItemStatusIncomplete>;
export declare const ReasoningItemStatusCompleted: {
    readonly Completed: "completed";
};
export type ReasoningItemStatusCompleted = ClosedEnum<typeof ReasoningItemStatusCompleted>;
export type ReasoningItemStatusUnion = ReasoningItemStatusCompleted | ReasoningItemStatusIncomplete | ReasoningItemStatusInProgress;
export declare const ReasoningItemType: {
    readonly Reasoning: "reasoning";
};
export type ReasoningItemType = ClosedEnum<typeof ReasoningItemType>;
/**
 * Reasoning output item with signature and format extensions
 */
export type ReasoningItem = {
    content?: Array<ReasoningTextContent> | null | undefined;
    encryptedContent?: string | null | undefined;
    id: string;
    status?: ReasoningItemStatusCompleted | ReasoningItemStatusIncomplete | ReasoningItemStatusInProgress | undefined;
    summary: Array<ReasoningSummaryText>;
    type: ReasoningItemType;
    format?: ReasoningFormat | null | undefined;
    signature?: string | null | undefined;
};
/** @internal */
export declare const ReasoningItemStatusInProgress$outboundSchema: z.ZodEnum<typeof ReasoningItemStatusInProgress>;
/** @internal */
export declare const ReasoningItemStatusIncomplete$outboundSchema: z.ZodEnum<typeof ReasoningItemStatusIncomplete>;
/** @internal */
export declare const ReasoningItemStatusCompleted$outboundSchema: z.ZodEnum<typeof ReasoningItemStatusCompleted>;
/** @internal */
export type ReasoningItemStatusUnion$Outbound = string | string | string;
/** @internal */
export declare const ReasoningItemStatusUnion$outboundSchema: z.ZodType<ReasoningItemStatusUnion$Outbound, ReasoningItemStatusUnion>;
export declare function reasoningItemStatusUnionToJSON(reasoningItemStatusUnion: ReasoningItemStatusUnion): string;
/** @internal */
export declare const ReasoningItemType$outboundSchema: z.ZodEnum<typeof ReasoningItemType>;
/** @internal */
export type ReasoningItem$Outbound = {
    content?: Array<ReasoningTextContent$Outbound> | null | undefined;
    encrypted_content?: string | null | undefined;
    id: string;
    status?: string | string | string | undefined;
    summary: Array<ReasoningSummaryText$Outbound>;
    type: string;
    format?: string | null | undefined;
    signature?: string | null | undefined;
};
/** @internal */
export declare const ReasoningItem$outboundSchema: z.ZodType<ReasoningItem$Outbound, ReasoningItem>;
export declare function reasoningItemToJSON(reasoningItem: ReasoningItem): string;
//# sourceMappingURL=reasoningitem.d.ts.map