import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Apply patch tool configuration
 */
export type ApplyPatchServerTool = {
    type: "apply_patch";
};
/** @internal */
export declare const ApplyPatchServerTool$inboundSchema: z.ZodType<ApplyPatchServerTool, unknown>;
/** @internal */
export type ApplyPatchServerTool$Outbound = {
    type: "apply_patch";
};
/** @internal */
export declare const ApplyPatchServerTool$outboundSchema: z.ZodType<ApplyPatchServerTool$Outbound, ApplyPatchServerTool>;
export declare function applyPatchServerToolToJSON(applyPatchServerTool: ApplyPatchServerTool): string;
export declare function applyPatchServerToolFromJSON(jsonString: string): SafeParseResult<ApplyPatchServerTool, SDKValidationError>;
//# sourceMappingURL=applypatchservertool.d.ts.map