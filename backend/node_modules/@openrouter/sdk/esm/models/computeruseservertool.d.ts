import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const Environment: {
    readonly Windows: "windows";
    readonly Mac: "mac";
    readonly Linux: "linux";
    readonly Ubuntu: "ubuntu";
    readonly Browser: "browser";
};
export type Environment = OpenEnum<typeof Environment>;
/**
 * Computer use preview tool configuration
 */
export type ComputerUseServerTool = {
    displayHeight: number;
    displayWidth: number;
    environment: Environment;
    type: "computer_use_preview";
};
/** @internal */
export declare const Environment$inboundSchema: z.ZodType<Environment, unknown>;
/** @internal */
export declare const Environment$outboundSchema: z.ZodType<string, Environment>;
/** @internal */
export declare const ComputerUseServerTool$inboundSchema: z.ZodType<ComputerUseServerTool, unknown>;
/** @internal */
export type ComputerUseServerTool$Outbound = {
    display_height: number;
    display_width: number;
    environment: string;
    type: "computer_use_preview";
};
/** @internal */
export declare const ComputerUseServerTool$outboundSchema: z.ZodType<ComputerUseServerTool$Outbound, ComputerUseServerTool>;
export declare function computerUseServerToolToJSON(computerUseServerTool: ComputerUseServerTool): string;
export declare function computerUseServerToolFromJSON(jsonString: string): SafeParseResult<ComputerUseServerTool, SDKValidationError>;
//# sourceMappingURL=computeruseservertool.d.ts.map