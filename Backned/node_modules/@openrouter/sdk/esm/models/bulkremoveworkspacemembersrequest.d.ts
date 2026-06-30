import * as z from "zod/v4";
export type BulkRemoveWorkspaceMembersRequest = {
    /**
     * List of user IDs to remove from the workspace
     */
    userIds: Array<string>;
};
/** @internal */
export type BulkRemoveWorkspaceMembersRequest$Outbound = {
    user_ids: Array<string>;
};
/** @internal */
export declare const BulkRemoveWorkspaceMembersRequest$outboundSchema: z.ZodType<BulkRemoveWorkspaceMembersRequest$Outbound, BulkRemoveWorkspaceMembersRequest>;
export declare function bulkRemoveWorkspaceMembersRequestToJSON(bulkRemoveWorkspaceMembersRequest: BulkRemoveWorkspaceMembersRequest): string;
//# sourceMappingURL=bulkremoveworkspacemembersrequest.d.ts.map