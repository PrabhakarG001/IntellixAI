import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenAIResponsesRefusalContent } from "./openairesponsesrefusalcontent.js";
import { ResponseOutputText } from "./responseoutputtext.js";
export type OutputMessageItemContent = ResponseOutputText | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">;
export declare const OutputMessageItemPhaseFinalAnswer: {
    readonly FinalAnswer: "final_answer";
};
export type OutputMessageItemPhaseFinalAnswer = ClosedEnum<typeof OutputMessageItemPhaseFinalAnswer>;
export declare const OutputMessageItemPhaseCommentary: {
    readonly Commentary: "commentary";
};
export type OutputMessageItemPhaseCommentary = ClosedEnum<typeof OutputMessageItemPhaseCommentary>;
/**
 * The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages.
 */
export type OutputMessageItemPhaseUnion = OutputMessageItemPhaseCommentary | OutputMessageItemPhaseFinalAnswer | any;
export declare const OutputMessageItemRole: {
    readonly Assistant: "assistant";
};
export type OutputMessageItemRole = ClosedEnum<typeof OutputMessageItemRole>;
export declare const OutputMessageItemStatusInProgress: {
    readonly InProgress: "in_progress";
};
export type OutputMessageItemStatusInProgress = ClosedEnum<typeof OutputMessageItemStatusInProgress>;
export declare const OutputMessageItemStatusIncomplete: {
    readonly Incomplete: "incomplete";
};
export type OutputMessageItemStatusIncomplete = ClosedEnum<typeof OutputMessageItemStatusIncomplete>;
export declare const OutputMessageItemStatusCompleted: {
    readonly Completed: "completed";
};
export type OutputMessageItemStatusCompleted = ClosedEnum<typeof OutputMessageItemStatusCompleted>;
export type OutputMessageItemStatusUnion = OutputMessageItemStatusCompleted | OutputMessageItemStatusIncomplete | OutputMessageItemStatusInProgress;
/**
 * An output message item
 */
export type OutputMessageItem = {
    content: Array<ResponseOutputText | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">>;
    id: string;
    /**
     * The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages.
     */
    phase?: OutputMessageItemPhaseCommentary | OutputMessageItemPhaseFinalAnswer | any | null | undefined;
    role: OutputMessageItemRole;
    status?: OutputMessageItemStatusCompleted | OutputMessageItemStatusIncomplete | OutputMessageItemStatusInProgress | undefined;
    type: "message";
};
/** @internal */
export declare const OutputMessageItemContent$inboundSchema: z.ZodType<OutputMessageItemContent, unknown>;
export declare function outputMessageItemContentFromJSON(jsonString: string): SafeParseResult<OutputMessageItemContent, SDKValidationError>;
/** @internal */
export declare const OutputMessageItemPhaseFinalAnswer$inboundSchema: z.ZodEnum<typeof OutputMessageItemPhaseFinalAnswer>;
/** @internal */
export declare const OutputMessageItemPhaseCommentary$inboundSchema: z.ZodEnum<typeof OutputMessageItemPhaseCommentary>;
/** @internal */
export declare const OutputMessageItemPhaseUnion$inboundSchema: z.ZodType<OutputMessageItemPhaseUnion, unknown>;
export declare function outputMessageItemPhaseUnionFromJSON(jsonString: string): SafeParseResult<OutputMessageItemPhaseUnion, SDKValidationError>;
/** @internal */
export declare const OutputMessageItemRole$inboundSchema: z.ZodEnum<typeof OutputMessageItemRole>;
/** @internal */
export declare const OutputMessageItemStatusInProgress$inboundSchema: z.ZodEnum<typeof OutputMessageItemStatusInProgress>;
/** @internal */
export declare const OutputMessageItemStatusIncomplete$inboundSchema: z.ZodEnum<typeof OutputMessageItemStatusIncomplete>;
/** @internal */
export declare const OutputMessageItemStatusCompleted$inboundSchema: z.ZodEnum<typeof OutputMessageItemStatusCompleted>;
/** @internal */
export declare const OutputMessageItemStatusUnion$inboundSchema: z.ZodType<OutputMessageItemStatusUnion, unknown>;
export declare function outputMessageItemStatusUnionFromJSON(jsonString: string): SafeParseResult<OutputMessageItemStatusUnion, SDKValidationError>;
/** @internal */
export declare const OutputMessageItem$inboundSchema: z.ZodType<OutputMessageItem, unknown>;
export declare function outputMessageItemFromJSON(jsonString: string): SafeParseResult<OutputMessageItem, SDKValidationError>;
//# sourceMappingURL=outputmessageitem.d.ts.map