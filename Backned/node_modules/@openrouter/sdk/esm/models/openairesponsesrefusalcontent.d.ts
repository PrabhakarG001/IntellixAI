import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type OpenAIResponsesRefusalContent = {
    refusal: string;
    type: "refusal";
};
/** @internal */
export declare const OpenAIResponsesRefusalContent$inboundSchema: z.ZodType<OpenAIResponsesRefusalContent, unknown>;
/** @internal */
export type OpenAIResponsesRefusalContent$Outbound = {
    refusal: string;
    type: "refusal";
};
/** @internal */
export declare const OpenAIResponsesRefusalContent$outboundSchema: z.ZodType<OpenAIResponsesRefusalContent$Outbound, OpenAIResponsesRefusalContent>;
export declare function openAIResponsesRefusalContentToJSON(openAIResponsesRefusalContent: OpenAIResponsesRefusalContent): string;
export declare function openAIResponsesRefusalContentFromJSON(jsonString: string): SafeParseResult<OpenAIResponsesRefusalContent, SDKValidationError>;
//# sourceMappingURL=openairesponsesrefusalcontent.d.ts.map