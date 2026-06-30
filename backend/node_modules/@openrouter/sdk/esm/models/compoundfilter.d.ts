import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const CompoundFilterType: {
    readonly And: "and";
    readonly Or: "or";
};
export type CompoundFilterType = OpenEnum<typeof CompoundFilterType>;
/**
 * A compound filter that combines multiple comparison or compound filters
 */
export type CompoundFilter = {
    filters: Array<{
        [k: string]: any | null;
    }>;
    type: CompoundFilterType;
};
/** @internal */
export declare const CompoundFilterType$inboundSchema: z.ZodType<CompoundFilterType, unknown>;
/** @internal */
export declare const CompoundFilterType$outboundSchema: z.ZodType<string, CompoundFilterType>;
/** @internal */
export declare const CompoundFilter$inboundSchema: z.ZodType<CompoundFilter, unknown>;
/** @internal */
export type CompoundFilter$Outbound = {
    filters: Array<{
        [k: string]: any | null;
    }>;
    type: string;
};
/** @internal */
export declare const CompoundFilter$outboundSchema: z.ZodType<CompoundFilter$Outbound, CompoundFilter>;
export declare function compoundFilterToJSON(compoundFilter: CompoundFilter): string;
export declare function compoundFilterFromJSON(jsonString: string): SafeParseResult<CompoundFilter, SDKValidationError>;
//# sourceMappingURL=compoundfilter.d.ts.map