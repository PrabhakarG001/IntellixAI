import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenAIResponsesAnnotation } from "./openairesponsesannotation.js";
/**
 * Event emitted when a text annotation is added to output
 */
export type AnnotationAddedEvent = {
    annotation: OpenAIResponsesAnnotation;
    annotationIndex: number;
    contentIndex: number;
    itemId: string;
    outputIndex: number;
    sequenceNumber: number;
    type: "response.output_text.annotation.added";
};
/** @internal */
export declare const AnnotationAddedEvent$inboundSchema: z.ZodType<AnnotationAddedEvent, unknown>;
export declare function annotationAddedEventFromJSON(jsonString: string): SafeParseResult<AnnotationAddedEvent, SDKValidationError>;
//# sourceMappingURL=annotationaddedevent.d.ts.map