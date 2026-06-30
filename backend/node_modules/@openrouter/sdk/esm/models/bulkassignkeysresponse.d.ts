import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type BulkAssignKeysResponse = {
    /**
     * Number of keys successfully assigned
     */
    assignedCount: number;
};
/** @internal */
export declare const BulkAssignKeysResponse$inboundSchema: z.ZodType<BulkAssignKeysResponse, unknown>;
export declare function bulkAssignKeysResponseFromJSON(jsonString: string): SafeParseResult<BulkAssignKeysResponse, SDKValidationError>;
//# sourceMappingURL=bulkassignkeysresponse.d.ts.map