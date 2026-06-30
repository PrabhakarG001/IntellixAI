import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Workspace } from "./workspace.js";
export type CreateWorkspaceResponse = {
    data: Workspace;
};
/** @internal */
export declare const CreateWorkspaceResponse$inboundSchema: z.ZodType<CreateWorkspaceResponse, unknown>;
export declare function createWorkspaceResponseFromJSON(jsonString: string): SafeParseResult<CreateWorkspaceResponse, SDKValidationError>;
//# sourceMappingURL=createworkspaceresponse.d.ts.map