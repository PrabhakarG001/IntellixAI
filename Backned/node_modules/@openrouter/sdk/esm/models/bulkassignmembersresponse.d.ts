import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type BulkAssignMembersResponse = {
    /**
     * Number of members successfully assigned
     */
    assignedCount: number;
};
/** @internal */
export declare const BulkAssignMembersResponse$inboundSchema: z.ZodType<BulkAssignMembersResponse, unknown>;
export declare function bulkAssignMembersResponseFromJSON(jsonString: string): SafeParseResult<BulkAssignMembersResponse, SDKValidationError>;
//# sourceMappingURL=bulkassignmembersresponse.d.ts.map