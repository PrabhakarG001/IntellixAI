import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type BulkUnassignMembersResponse = {
    /**
     * Number of members successfully unassigned
     */
    unassignedCount: number;
};
/** @internal */
export declare const BulkUnassignMembersResponse$inboundSchema: z.ZodType<BulkUnassignMembersResponse, unknown>;
export declare function bulkUnassignMembersResponseFromJSON(jsonString: string): SafeParseResult<BulkUnassignMembersResponse, SDKValidationError>;
//# sourceMappingURL=bulkunassignmembersresponse.d.ts.map