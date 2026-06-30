import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Role of the member in the workspace
 */
export declare const WorkspaceMemberRole: {
    readonly Admin: "admin";
    readonly Member: "member";
};
/**
 * Role of the member in the workspace
 */
export type WorkspaceMemberRole = OpenEnum<typeof WorkspaceMemberRole>;
export type WorkspaceMember = {
    /**
     * ISO 8601 timestamp of when the membership was created
     */
    createdAt: string;
    /**
     * Unique identifier for the workspace membership
     */
    id: string;
    /**
     * Role of the member in the workspace
     */
    role: WorkspaceMemberRole;
    /**
     * Clerk user ID of the member
     */
    userId: string;
    /**
     * ID of the workspace
     */
    workspaceId: string;
};
/** @internal */
export declare const WorkspaceMemberRole$inboundSchema: z.ZodType<WorkspaceMemberRole, unknown>;
/** @internal */
export declare const WorkspaceMember$inboundSchema: z.ZodType<WorkspaceMember, unknown>;
export declare function workspaceMemberFromJSON(jsonString: string): SafeParseResult<WorkspaceMember, SDKValidationError>;
//# sourceMappingURL=workspacemember.d.ts.map