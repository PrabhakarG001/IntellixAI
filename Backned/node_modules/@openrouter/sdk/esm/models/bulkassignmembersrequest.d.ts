import * as z from "zod/v4";
export type BulkAssignMembersRequest = {
    /**
     * Array of member user IDs to assign to the guardrail
     */
    memberUserIds: Array<string>;
};
/** @internal */
export type BulkAssignMembersRequest$Outbound = {
    member_user_ids: Array<string>;
};
/** @internal */
export declare const BulkAssignMembersRequest$outboundSchema: z.ZodType<BulkAssignMembersRequest$Outbound, BulkAssignMembersRequest>;
export declare function bulkAssignMembersRequestToJSON(bulkAssignMembersRequest: BulkAssignMembersRequest): string;
//# sourceMappingURL=bulkassignmembersrequest.d.ts.map