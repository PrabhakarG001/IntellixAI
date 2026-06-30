import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenAIResponsesRefusalContent } from "./openairesponsesrefusalcontent.js";
import { ReasoningTextContent } from "./reasoningtextcontent.js";
import { ResponseOutputText } from "./responseoutputtext.js";
export type ContentPartAddedEventPart = ResponseOutputText | (ReasoningTextContent & {
    type: "reasoning_text";
}) | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">;
/**
 * Event emitted when a new content part is added to an output item
 */
export type ContentPartAddedEvent = {
    contentIndex: number;
    itemId: string;
    outputIndex: number;
    part: ResponseOutputText | (ReasoningTextContent & {
        type: "reasoning_text";
    }) | OpenAIResponsesRefusalContent | discriminatedUnionTypes.Unknown<"type">;
    sequenceNumber: number;
    type: "response.content_part.added";
};
/** @internal */
export declare const ContentPartAddedEventPart$inboundSchema: z.ZodType<ContentPartAddedEventPart, unknown>;
export declare function contentPartAddedEventPartFromJSON(jsonString: string): SafeParseResult<ContentPartAddedEventPart, SDKValidationError>;
/** @internal */
export declare const ContentPartAddedEvent$inboundSchema: z.ZodType<ContentPartAddedEvent, unknown>;
export declare function contentPartAddedEventFromJSON(jsonString: string): SafeParseResult<ContentPartAddedEvent, SDKValidationError>;
//# sourceMappingURL=contentpartaddedevent.d.ts.map