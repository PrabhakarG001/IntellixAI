import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * JSON object response format
 */
export type FormatJsonObjectConfig = {
    type: "json_object";
};
/** @internal */
export declare const FormatJsonObjectConfig$inboundSchema: z.ZodType<FormatJsonObjectConfig, unknown>;
/** @internal */
export type FormatJsonObjectConfig$Outbound = {
    type: "json_object";
};
/** @internal */
export declare const FormatJsonObjectConfig$outboundSchema: z.ZodType<FormatJsonObjectConfig$Outbound, FormatJsonObjectConfig>;
export declare function formatJsonObjectConfigToJSON(formatJsonObjectConfig: FormatJsonObjectConfig): string;
export declare function formatJsonObjectConfigFromJSON(jsonString: string): SafeParseResult<FormatJsonObjectConfig, SDKValidationError>;
//# sourceMappingURL=formatjsonobjectconfig.d.ts.map