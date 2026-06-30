import type * as models from '../models/index.js';
/**
 * Type guards for OpenResponses stream events
 * These enable proper TypeScript narrowing without type casts
 */
export declare function isOutputTextDeltaEvent(event: models.StreamEvents): event is models.TextDeltaEvent;
export declare function isReasoningDeltaEvent(event: models.StreamEvents): event is models.ReasoningDeltaEvent;
export declare function isFunctionCallArgumentsDeltaEvent(event: models.StreamEvents): event is models.FunctionCallArgsDeltaEvent;
export declare function isOutputItemAddedEvent(event: models.StreamEvents): event is models.StreamEventsResponseOutputItemAdded;
export declare function isOutputItemDoneEvent(event: models.StreamEvents): event is models.StreamEventsResponseOutputItemDone;
export declare function isResponseCompletedEvent(event: models.StreamEvents): event is models.StreamEventsResponseCompleted;
export declare function isResponseFailedEvent(event: models.StreamEvents): event is models.StreamEventsResponseFailed;
export declare function isResponseIncompleteEvent(event: models.StreamEvents): event is models.StreamEventsResponseIncomplete;
export declare function isFunctionCallArgumentsDoneEvent(event: models.StreamEvents): event is models.FunctionCallArgsDoneEvent;
export declare function isOutputMessage(item: unknown): item is models.OutputMessage;
export declare function isFunctionCallItem(item: unknown): item is models.OutputFunctionCallItem;
export declare function isReasoningOutputItem(item: unknown): item is models.OutputReasoningItem;
export declare function isWebSearchCallOutputItem(item: unknown): item is models.OutputWebSearchCallItem;
export declare function isFileSearchCallOutputItem(item: unknown): item is models.OutputFileSearchCallItem;
export declare function isImageGenerationCallOutputItem(item: unknown): item is models.OutputImageGenerationCallItem;
export declare function isOutputTextPart(part: unknown): part is models.ResponseOutputText;
export declare function isRefusalPart(part: unknown): part is models.OpenAIResponsesRefusalContent;
export declare function isFileCitationAnnotation(annotation: unknown): annotation is models.FileCitation;
export declare function isURLCitationAnnotation(annotation: unknown): annotation is models.URLCitation;
export declare function isFilePathAnnotation(annotation: unknown): annotation is models.FilePath;
export declare function hasTypeProperty(item: unknown): item is {
    type: string;
};
//# sourceMappingURL=stream-type-guards.d.ts.map