import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { WorkspaceMember } from "./workspacemember.js";
export type BulkAddWorkspaceMembersResponse = {
    /**
     * Number of workspace memberships created or updated
     */
    addedCount: number;
    /**
     * List of added workspace memberships
     */
    data: Array<WorkspaceMember>;
};
/** @internal */
export declare const BulkAddWorkspaceMembersResponse$inboundSchema: z.ZodType<BulkAddWorkspaceMembersResponse, unknown>;
export declare function bulkAddWorkspaceMembersResponseFromJSON(jsonString: string): SafeParseResult<BulkAddWorkspaceMembersResponse, SDKValidationError>;
//# sourceMappingURL=bulkaddworkspacemembersresponse.d.ts.map