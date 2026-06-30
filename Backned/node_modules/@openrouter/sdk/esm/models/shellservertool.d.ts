import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Shell tool configuration
 */
export type ShellServerTool = {
    type: "shell";
};
/** @internal */
export declare const ShellServerTool$inboundSchema: z.ZodType<ShellServerTool, unknown>;
/** @internal */
export type ShellServerTool$Outbound = {
    type: "shell";
};
/** @internal */
export declare const ShellServerTool$outboundSchema: z.ZodType<ShellServerTool$Outbound, ShellServerTool>;
export declare function shellServerToolToJSON(shellServerTool: ShellServerTool): string;
export declare function shellServerToolFromJSON(jsonString: string): SafeParseResult<ShellServerTool, SDKValidationError>;
//# sourceMappingURL=shellservertool.d.ts.map