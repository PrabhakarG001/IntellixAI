import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Local shell tool configuration
 */
export type CodexLocalShellTool = {
    type: "local_shell";
};
/** @internal */
export declare const CodexLocalShellTool$inboundSchema: z.ZodType<CodexLocalShellTool, unknown>;
/** @internal */
export type CodexLocalShellTool$Outbound = {
    type: "local_shell";
};
/** @internal */
export declare const CodexLocalShellTool$outboundSchema: z.ZodType<CodexLocalShellTool$Outbound, CodexLocalShellTool>;
export declare function codexLocalShellToolToJSON(codexLocalShellTool: CodexLocalShellTool): string;
export declare function codexLocalShellToolFromJSON(jsonString: string): SafeParseResult<CodexLocalShellTool, SDKValidationError>;
//# sourceMappingURL=codexlocalshelltool.d.ts.map