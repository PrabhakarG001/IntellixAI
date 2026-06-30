import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Workspace } from "./workspace.js";
export type ListWorkspacesResponse = {
    /**
     * List of workspaces
     */
    data: Array<Workspace>;
    /**
     * Total number of workspaces
     */
    totalCount: number;
};
/** @internal */
export declare const ListWorkspacesResponse$inboundSchema: z.ZodType<ListWorkspacesResponse, unknown>;
export declare function listWorkspacesResponseFromJSON(jsonString: string): SafeParseResult<ListWorkspacesResponse, SDKValidationError>;
//# sourceMappingURL=listworkspacesresponse.d.ts.map