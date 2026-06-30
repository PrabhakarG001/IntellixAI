import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const Syntax: {
    readonly Lark: "lark";
    readonly Regex: "regex";
};
export type Syntax = OpenEnum<typeof Syntax>;
export type FormatGrammar = {
    definition: string;
    syntax: Syntax;
    type: "grammar";
};
export type FormatText = {
    type: "text";
};
export type Format = FormatText | FormatGrammar | discriminatedUnionTypes.Unknown<"type">;
/**
 * Custom tool configuration
 */
export type CustomTool = {
    description?: string | undefined;
    format?: FormatText | FormatGrammar | discriminatedUnionTypes.Unknown<"type"> | undefined;
    name: string;
    type: "custom";
};
/** @internal */
export declare const Syntax$inboundSchema: z.ZodType<Syntax, unknown>;
/** @internal */
export declare const Syntax$outboundSchema: z.ZodType<string, Syntax>;
/** @internal */
export declare const FormatGrammar$inboundSchema: z.ZodType<FormatGrammar, unknown>;
/** @internal */
export type FormatGrammar$Outbound = {
    definition: string;
    syntax: string;
    type: "grammar";
};
/** @internal */
export declare const FormatGrammar$outboundSchema: z.ZodType<FormatGrammar$Outbound, FormatGrammar>;
export declare function formatGrammarToJSON(formatGrammar: FormatGrammar): string;
export declare function formatGrammarFromJSON(jsonString: string): SafeParseResult<FormatGrammar, SDKValidationError>;
/** @internal */
export declare const FormatText$inboundSchema: z.ZodType<FormatText, unknown>;
/** @internal */
export type FormatText$Outbound = {
    type: "text";
};
/** @internal */
export declare const FormatText$outboundSchema: z.ZodType<FormatText$Outbound, FormatText>;
export declare function formatTextToJSON(formatText: FormatText): string;
export declare function formatTextFromJSON(jsonString: string): SafeParseResult<FormatText, SDKValidationError>;
/** @internal */
export declare const Format$inboundSchema: z.ZodType<Format, unknown>;
/** @internal */
export type Format$Outbound = FormatText$Outbound | FormatGrammar$Outbound;
/** @internal */
export declare const Format$outboundSchema: z.ZodType<Format$Outbound, Format>;
export declare function formatToJSON(format: Format): string;
export declare function formatFromJSON(jsonString: string): SafeParseResult<Format, SDKValidationError>;
/** @internal */
export declare const CustomTool$inboundSchema: z.ZodType<CustomTool, unknown>;
/** @internal */
export type CustomTool$Outbound = {
    description?: string | undefined;
    format?: FormatText$Outbound | FormatGrammar$Outbound | undefined;
    name: string;
    type: "custom";
};
/** @internal */
export declare const CustomTool$outboundSchema: z.ZodType<CustomTool$Outbound, CustomTool>;
export declare function customToolToJSON(customTool: CustomTool): string;
export declare function customToolFromJSON(jsonString: string): SafeParseResult<CustomTool, SDKValidationError>;
//# sourceMappingURL=customtool.d.ts.map