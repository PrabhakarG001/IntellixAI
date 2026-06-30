import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenAIResponsesRefusalContent } from "./openairesponsesrefusalcontent.js";
import { ResponseOutputText } from "./responseoutputtext.js";
export type OutputMessageContent = ResponseOutputText | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">;
export declare const OutputMessagePhaseFinalAnswer: {
    readonly FinalAnswer: "final_answer";
};
export type OutputMessagePhaseFinalAnswer = ClosedEnum<typeof OutputMessagePhaseFinalAnswer>;
export declare const OutputMessagePhaseCommentary: {
    readonly Commentary: "commentary";
};
export type OutputMessagePhaseCommentary = ClosedEnum<typeof OutputMessagePhaseCommentary>;
/**
 * The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages.
 */
export type OutputMessagePhaseUnion = OutputMessagePhaseCommentary | OutputMessagePhaseFinalAnswer | any;
export declare const OutputMessageRole: {
    readonly Assistant: "assistant";
};
export type OutputMessageRole = ClosedEnum<typeof OutputMessageRole>;
export declare const OutputMessageStatusInProgress: {
    readonly InProgress: "in_progress";
};
export type OutputMessageStatusInProgress = ClosedEnum<typeof OutputMessageStatusInProgress>;
export declare const OutputMessageStatusIncomplete: {
    readonly Incomplete: "incomplete";
};
export type OutputMessageStatusIncomplete = ClosedEnum<typeof OutputMessageStatusIncomplete>;
export declare const OutputMessageStatusCompleted: {
    readonly Completed: "completed";
};
export type OutputMessageStatusCompleted = ClosedEnum<typeof OutputMessageStatusCompleted>;
export type OutputMessageStatusUnion = OutputMessageStatusCompleted | OutputMessageStatusIncomplete | OutputMessageStatusInProgress;
export declare const OutputMessageType: {
    readonly Message: "message";
};
export type OutputMessageType = ClosedEnum<typeof OutputMessageType>;
export type OutputMessage = {
    content: Array<ResponseOutputText | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">>;
    id: string;
    /**
     * The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages.
     */
    phase?: OutputMessagePhaseCommentary | OutputMessagePhaseFinalAnswer | any | null | undefined;
    role: OutputMessageRole;
    status?: OutputMessageStatusCompleted | OutputMessageStatusIncomplete | OutputMessageStatusInProgress | undefined;
    type: OutputMessageType;
};
/** @internal */
export declare const OutputMessageContent$inboundSchema: z.ZodType<OutputMessageContent, unknown>;
export declare function outputMessageContentFromJSON(jsonString: string): SafeParseResult<OutputMessageContent, SDKValidationError>;
/** @internal */
export declare const OutputMessagePhaseFinalAnswer$inboundSchema: z.ZodEnum<typeof OutputMessagePhaseFinalAnswer>;
/** @internal */
export declare const OutputMessagePhaseCommentary$inboundSchema: z.ZodEnum<typeof OutputMessagePhaseCommentary>;
/** @internal */
export declare const OutputMessagePhaseUnion$inboundSchema: z.ZodType<OutputMessagePhaseUnion, unknown>;
export declare function outputMessagePhaseUnionFromJSON(jsonString: string): SafeParseResult<OutputMessagePhaseUnion, SDKValidationError>;
/** @internal */
export declare const OutputMessageRole$inboundSchema: z.ZodEnum<typeof OutputMessageRole>;
/** @internal */
export declare const OutputMessageStatusInProgress$inboundSchema: z.ZodEnum<typeof OutputMessageStatusInProgress>;
/** @internal */
export declare const OutputMessageStatusIncomplete$inboundSchema: z.ZodEnum<typeof OutputMessageStatusIncomplete>;
/** @internal */
export declare const OutputMessageStatusCompleted$inboundSchema: z.ZodEnum<typeof OutputMessageStatusCompleted>;
/** @internal */
export declare const OutputMessageStatusUnion$inboundSchema: z.ZodType<OutputMessageStatusUnion, unknown>;
export declare function outputMessageStatusUnionFromJSON(jsonString: string): SafeParseResult<OutputMessageStatusUnion, SDKValidationError>;
/** @internal */
export declare const OutputMessageType$inboundSchema: z.ZodEnum<typeof OutputMessageType>;
/** @internal */
export declare const OutputMessage$inboundSchema: z.ZodType<OutputMessage, unknown>;
export declare function outputMessageFromJSON(jsonString: string): SafeParseResult<OutputMessage, SDKValidationError>;
//# sourceMappingURL=outputmessage.d.ts.map