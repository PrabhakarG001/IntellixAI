import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { MemberAssignment } from "./memberassignment.js";
export type ListMemberAssignmentsResponse = {
    /**
     * List of member assignments
     */
    data: Array<MemberAssignment>;
    /**
     * Total number of member assignments
     */
    totalCount: number;
};
/** @internal */
export declare const ListMemberAssignmentsResponse$inboundSchema: z.ZodType<ListMemberAssignmentsResponse, unknown>;
export declare function listMemberAssignmentsResponseFromJSON(jsonString: string): SafeParseResult<ListMemberAssignmentsResponse, SDKValidationError>;
//# sourceMappingURL=listmemberassignmentsresponse.d.ts.map