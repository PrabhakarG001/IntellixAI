import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type KeyAssignment = {
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
     * Hash of the assigned API key
     */
    keyHash: string;
    /**
     * Label of the API key
     */
    keyLabel: string;
    /**
     * Name of the API key
     */
    keyName: string;
};
/** @internal */
export declare const KeyAssignment$inboundSchema: z.ZodType<KeyAssignment, unknown>;
export declare function keyAssignmentFromJSON(jsonString: string): SafeParseResult<KeyAssignment, SDKValidationError>;
//# sourceMappingURL=keyassignment.d.ts.map