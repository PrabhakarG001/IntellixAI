import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const Reason: {
    readonly MaxOutputTokens: "max_output_tokens";
    readonly ContentFilter: "content_filter";
};
export type Reason = OpenEnum<typeof Reason>;
export type IncompleteDetails = {
    reason?: Reason | undefined;
};
/** @internal */
export declare const Reason$inboundSchema: z.ZodType<Reason, unknown>;
/** @internal */
export declare const IncompleteDetails$inboundSchema: z.ZodType<IncompleteDetails, unknown>;
export declare function incompleteDetailsFromJSON(jsonString: string): SafeParseResult<IncompleteDetails, SDKValidationError>;
//# sourceMappingURL=incompletedetails.d.ts.map