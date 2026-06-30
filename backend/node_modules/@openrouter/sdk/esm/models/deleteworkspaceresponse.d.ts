import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type DeleteWorkspaceResponse = {
    /**
     * Confirmation that the workspace was deleted
     */
    deleted: true;
};
/** @internal */
export declare const DeleteWorkspaceResponse$inboundSchema: z.ZodType<DeleteWorkspaceResponse, unknown>;
export declare function deleteWorkspaceResponseFromJSON(jsonString: string): SafeParseResult<DeleteWorkspaceResponse, SDKValidationError>;
//# sourceMappingURL=deleteworkspaceresponse.d.ts.map