import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { KeyAssignment } from "./keyassignment.js";
export type ListKeyAssignmentsResponse = {
    /**
     * List of key assignments
     */
    data: Array<KeyAssignment>;
    /**
     * Total number of key assignments for this guardrail
     */
    totalCount: number;
};
/** @internal */
export declare const ListKeyAssignmentsResponse$inboundSchema: z.ZodType<ListKeyAssignmentsResponse, unknown>;
export declare function listKeyAssignmentsResponseFromJSON(jsonString: string): SafeParseResult<ListKeyAssignmentsResponse, SDKValidationError>;
//# sourceMappingURL=listkeyassignmentsresponse.d.ts.map