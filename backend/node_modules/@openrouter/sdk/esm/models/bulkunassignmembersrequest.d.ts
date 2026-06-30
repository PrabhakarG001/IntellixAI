import * as z from "zod/v4";
export type BulkUnassignMembersRequest = {
    /**
     * Array of member user IDs to unassign from the guardrail
     */
    memberUserIds: Array<string>;
};
/** @internal */
export type BulkUnassignMembersRequest$Outbound = {
    member_user_ids: Array<string>;
};
/** @internal */
export declare const BulkUnassignMembersRequest$outboundSchema: z.ZodType<BulkUnassignMembersRequest$Outbound, BulkUnassignMembersRequest>;
export declare function bulkUnassignMembersRequestToJSON(bulkUnassignMembersRequest: BulkUnassignMembersRequest): string;
//# sourceMappingURL=bulkunassignmembersrequest.d.ts.map