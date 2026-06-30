import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Workspace } from "./workspace.js";
export type UpdateWorkspaceResponse = {
    data: Workspace;
};
/** @internal */
export declare const UpdateWorkspaceResponse$inboundSchema: z.ZodType<UpdateWorkspaceResponse, unknown>;
export declare function updateWorkspaceResponseFromJSON(jsonString: string): SafeParseResult<UpdateWorkspaceResponse, SDKValidationError>;
//# sourceMappingURL=updateworkspaceresponse.d.ts.map