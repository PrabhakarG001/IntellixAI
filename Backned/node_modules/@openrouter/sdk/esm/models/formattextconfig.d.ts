import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Plain text response format
 */
export type FormatTextConfig = {
    type: "text";
};
/** @internal */
export declare const FormatTextConfig$inboundSchema: z.ZodType<FormatTextConfig, unknown>;
/** @internal */
export type FormatTextConfig$Outbound = {
    type: "text";
};
/** @internal */
export declare const FormatTextConfig$outboundSchema: z.ZodType<FormatTextConfig$Outbound, FormatTextConfig>;
export declare function formatTextConfigToJSON(formatTextConfig: FormatTextConfig): string;
export declare function formatTextConfigFromJSON(jsonString: string): SafeParseResult<FormatTextConfig, SDKValidationError>;
//# sourceMappingURL=formattextconfig.d.ts.map