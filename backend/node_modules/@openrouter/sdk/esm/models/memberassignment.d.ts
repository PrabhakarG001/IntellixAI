import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type MemberAssignment = {
    /**
     * User ID of who made the assignment
     */
    assignedBy: string | null;
    /**
     * ISO 8601 timestamp of when the assignment was created
     */
    createdAt: string;
    /**
     * ID of the guardrail
     */
    guardrailId: string;
    /**
     * Unique identifier for the assignment
     */
    id: string;
    /**
     * Organization ID
     */
    organizationId: string;
    /**
     * Clerk user ID of the assigned member
     */
    userId: string;
};
/** @internal */
export declare const MemberAssignment$inboundSchema: z.ZodType<MemberAssignment, unknown>;
export declare function memberAssignmentFromJSON(jsonString: string): SafeParseResult<MemberAssignment, SDKValidationError>;
//# sourceMappingURL=memberassignment.d.ts.map