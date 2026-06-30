import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenAIResponsesRefusalContent } from "./openairesponsesrefusalcontent.js";
import { ReasoningTextContent } from "./reasoningtextcontent.js";
import { ResponseOutputText } from "./responseoutputtext.js";
export type ContentPartDoneEventPart = ResponseOutputText | (ReasoningTextContent & {
    type: "reasoning_text";
}) | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">;
/**
 * Event emitted when a content part is complete
 */
export type ContentPartDoneEvent = {
    contentIndex: number;
    itemId: string;
    outputIndex: number;
    part: ResponseOutputText | (ReasoningTextContent & {
        type: "reasoning_text";
    }) | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">;
    sequenceNumber: number;
    type: "response.content_part.done";
};
/** @internal */
export declare const ContentPartDoneEventPart$inboundSchema: z.ZodType<ContentPartDoneEventPart, unknown>;
export declare function contentPartDoneEventPartFromJSON(jsonString: string): SafeParseResult<ContentPartDoneEventPart, SDKValidationError>;
/** @internal */
export declare const ContentPartDoneEvent$inboundSchema: z.ZodType<ContentPartDoneEvent, unknown>;
export declare function contentPartDoneEventFromJSON(jsonString: string): SafeParseResult<ContentPartDoneEvent, SDKValidationError>;
//# sourceMappingURL=contentpartdoneevent.d.ts.map