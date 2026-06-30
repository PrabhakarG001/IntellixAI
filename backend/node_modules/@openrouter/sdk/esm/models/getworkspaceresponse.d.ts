import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Workspace } from "./workspace.js";
export type GetWorkspaceResponse = {
    data: Workspace;
};
/** @internal */
export declare const GetWorkspaceResponse$inboundSchema: z.ZodType<GetWorkspaceResponse, unknown>;
export declare function getWorkspaceResponseFromJSON(jsonString: string): SafeParseResult<GetWorkspaceResponse, SDKValidationError>;
//# sourceMappingURL=getworkspaceresponse.d.ts.map