import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const ReasoningTextContentType: {
    readonly ReasoningText: "reasoning_text";
};
export type ReasoningTextContentType = ClosedEnum<typeof ReasoningTextContentType>;
export type ReasoningTextContent = {
    text: string;
    type: ReasoningTextContentType;
};
/** @internal */
export declare const ReasoningTextContentType$inboundSchema: z.ZodEnum<typeof ReasoningTextContentType>;
/** @internal */
export declare const ReasoningTextContentType$outboundSchema: z.ZodEnum<typeof ReasoningTextContentType>;
/** @internal */
export declare const ReasoningTextContent$inboundSchema: z.ZodType<ReasoningTextContent, unknown>;
/** @internal */
export type ReasoningTextContent$Outbound = {
    text: string;
    type: string;
};
/** @internal */
export declare const ReasoningTextContent$outboundSchema: z.ZodType<ReasoningTextContent$Outbound, ReasoningTextContent>;
export declare function reasoningTextContentToJSON(reasoningTextContent: ReasoningTextContent): string;
export declare function reasoningTextContentFromJSON(jsonString: string): SafeParseResult<ReasoningTextContent, SDKValidationError>;
//# sourceMappingURL=reasoningtextcontent.d.ts.map