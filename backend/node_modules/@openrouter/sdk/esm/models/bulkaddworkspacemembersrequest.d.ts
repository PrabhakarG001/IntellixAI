import * as z from "zod/v4";
export type BulkAddWorkspaceMembersRequest = {
    /**
     * List of user IDs to add to the workspace. Members are assigned the same role they hold in the organization.
     */
    userIds: Array<string>;
};
/** @internal */
export type BulkAddWorkspaceMembersRequest$Outbound = {
    user_ids: Array<string>;
};
/** @internal */
export declare const BulkAddWorkspaceMembersRequest$outboundSchema: z.ZodType<BulkAddWorkspaceMembersRequest$Outbound, BulkAddWorkspaceMembersRequest>;
export declare function bulkAddWorkspaceMembersRequestToJSON(bulkAddWorkspaceMembersRequest: BulkAddWorkspaceMembersRequest): string;
//# sourceMappingURL=bulkaddworkspacemembersrequest.d.ts.map