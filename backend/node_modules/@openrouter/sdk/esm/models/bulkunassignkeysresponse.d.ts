import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type BulkUnassignKeysResponse = {
    /**
     * Number of keys successfully unassigned
     */
    unassignedCount: number;
};
/** @internal */
export declare const BulkUnassignKeysResponse$inboundSchema: z.ZodType<BulkUnassignKeysResponse, unknown>;
export declare function bulkUnassignKeysResponseFromJSON(jsonString: string): SafeParseResult<BulkUnassignKeysResponse, SDKValidationError>;
//# sourceMappingURL=bulkunassignkeysresponse.d.ts.map