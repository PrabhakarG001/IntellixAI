import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * JSON schema constrained response format
 */
export type FormatJsonSchemaConfig = {
    description?: string | undefined;
    name: string;
    schema: {
        [k: string]: any | null;
    };
    strict?: boolean | null | undefined;
    type: "json_schema";
};
/** @internal */
export declare const FormatJsonSchemaConfig$inboundSchema: z.ZodType<FormatJsonSchemaConfig, unknown>;
/** @internal */
export type FormatJsonSchemaConfig$Outbound = {
    description?: string | undefined;
    name: string;
    schema: {
        [k: string]: any | null;
    };
    strict?: boolean | null | undefined;
    type: "json_schema";
};
/** @internal */
export declare const FormatJsonSchemaConfig$outboundSchema: z.ZodType<FormatJsonSchemaConfig$Outbound, FormatJsonSchemaConfig>;
export declare function formatJsonSchemaConfigToJSON(formatJsonSchemaConfig: FormatJsonSchemaConfig): string;
export declare function formatJsonSchemaConfigFromJSON(jsonString: string): SafeParseResult<FormatJsonSchemaConfig, SDKValidationError>;
//# sourceMappingURL=formatjsonschemaconfig.d.ts.map