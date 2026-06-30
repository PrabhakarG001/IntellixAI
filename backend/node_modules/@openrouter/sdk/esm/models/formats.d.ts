import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { FormatJsonObjectConfig, FormatJsonObjectConfig$Outbound } from "./formatjsonobjectconfig.js";
import { FormatJsonSchemaConfig, FormatJsonSchemaConfig$Outbound } from "./formatjsonschemaconfig.js";
import { FormatTextConfig, FormatTextConfig$Outbound } from "./formattextconfig.js";
/**
 * Text response format configuration
 */
export type Formats = FormatTextConfig | FormatJsonObjectConfig | FormatJsonSchemaConfig | discriminatedUnionTypes.Unknown<"type">;
/** @internal */
export declare const Formats$inboundSchema: z.ZodType<Formats, unknown>;
/** @internal */
export type Formats$Outbound = FormatTextConfig$Outbound | FormatJsonObjectConfig$Outbound | FormatJsonSchemaConfig$Outbound;
/** @internal */
export declare const Formats$outboundSchema: z.ZodType<Formats$Outbound, Formats>;
export declare function formatsToJSON(formats: Formats): string;
export declare function formatsFromJSON(jsonString: string): SafeParseResult<Formats, SDKValidationError>;
//# sourceMappingURL=formats.d.ts.map