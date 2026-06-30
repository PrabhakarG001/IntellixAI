import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Formats, Formats$Outbound } from "./formats.js";
export declare const Verbosity: {
    readonly Low: "low";
    readonly Medium: "medium";
    readonly High: "high";
    readonly Xhigh: "xhigh";
    readonly Max: "max";
};
export type Verbosity = OpenEnum<typeof Verbosity>;
/**
 * Text output configuration including format and verbosity
 */
export type TextExtendedConfig = {
    /**
     * Text response format configuration
     */
    format?: Formats | undefined;
    verbosity?: Verbosity | null | undefined;
};
/** @internal */
export declare const Verbosity$inboundSchema: z.ZodType<Verbosity, unknown>;
/** @internal */
export declare const Verbosity$outboundSchema: z.ZodType<string, Verbosity>;
/** @internal */
export declare const TextExtendedConfig$inboundSchema: z.ZodType<TextExtendedConfig, unknown>;
/** @internal */
export type TextExtendedConfig$Outbound = {
    format?: Formats$Outbound | undefined;
    verbosity?: string | null | undefined;
};
/** @internal */
export declare const TextExtendedConfig$outboundSchema: z.ZodType<TextExtendedConfig$Outbound, TextExtendedConfig>;
export declare function textExtendedConfigToJSON(textExtendedConfig: TextExtendedConfig): string;
export declare function textExtendedConfigFromJSON(jsonString: string): SafeParseResult<TextExtendedConfig, SDKValidationError>;
//# sourceMappingURL=textextendedconfig.d.ts.map