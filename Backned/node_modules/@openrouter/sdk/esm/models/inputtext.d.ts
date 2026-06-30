import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Text input content item
 */
export type InputText = {
    text: string;
    type: "input_text";
};
/** @internal */
export declare const InputText$inboundSchema: z.ZodType<InputText, unknown>;
/** @internal */
export type InputText$Outbound = {
    text: string;
    type: "input_text";
};
/** @internal */
export declare const InputText$outboundSchema: z.ZodType<InputText$Outbound, InputText>;
export declare function inputTextToJSON(inputText: InputText): string;
export declare function inputTextFromJSON(jsonString: string): SafeParseResult<InputText, SDKValidationError>;
//# sourceMappingURL=inputtext.d.ts.map