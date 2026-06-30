import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type BulkRemoveWorkspaceMembersResponse = {
    /**
     * Number of members removed
     */
    removedCount: number;
};
/** @internal */
export declare const BulkRemoveWorkspaceMembersResponse$inboundSchema: z.ZodType<BulkRemoveWorkspaceMembersResponse, unknown>;
export declare function bulkRemoveWorkspaceMembersResponseFromJSON(jsonString: string): SafeParseResult<BulkRemoveWorkspaceMembersResponse, SDKValidationError>;
//# sourceMappingURL=bulkremoveworkspacemembersresponse.d.ts.map