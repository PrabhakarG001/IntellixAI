import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { InputFile, InputFile$Outbound } from "./inputfile.js";
import { InputImage, InputImage$Outbound } from "./inputimage.js";
import { InputText, InputText$Outbound } from "./inputtext.js";
export type Variables = InputText | InputImage | InputFile | string;
export type StoredPromptTemplate = {
    id: string;
    variables?: {
        [k: string]: InputText | InputImage | InputFile | string;
    } | null | undefined;
};
/** @internal */
export declare const Variables$inboundSchema: z.ZodType<Variables, unknown>;
/** @internal */
export type Variables$Outbound = InputText$Outbound | InputImage$Outbound | InputFile$Outbound | string;
/** @internal */
export declare const Variables$outboundSchema: z.ZodType<Variables$Outbound, Variables>;
export declare function variablesToJSON(variables: Variables): string;
export declare function variablesFromJSON(jsonString: string): SafeParseResult<Variables, SDKValidationError>;
/** @internal */
export declare const StoredPromptTemplate$inboundSchema: z.ZodType<StoredPromptTemplate, unknown>;
/** @internal */
export type StoredPromptTemplate$Outbound = {
    id: string;
    variables?: {
        [k: string]: InputText$Outbound | InputImage$Outbound | InputFile$Outbound | string;
    } | null | undefined;
};
/** @internal */
export declare const StoredPromptTemplate$outboundSchema: z.ZodType<StoredPromptTemplate$Outbound, StoredPromptTemplate>;
export declare function storedPromptTemplateToJSON(storedPromptTemplate: StoredPromptTemplate): string;
export declare function storedPromptTemplateFromJSON(jsonString: string): SafeParseResult<StoredPromptTemplate, SDKValidationError>;
//# sourceMappingURL=storedprompttemplate.d.ts.map