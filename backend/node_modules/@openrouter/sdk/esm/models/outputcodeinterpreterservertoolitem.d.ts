import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputCodeInterpreterServerToolItemType: {
    readonly OpenrouterCodeInterpreter: "openrouter:code_interpreter";
};
export type OutputCodeInterpreterServerToolItemType = ClosedEnum<typeof OutputCodeInterpreterServerToolItemType>;
/**
 * An openrouter:code_interpreter server tool output item
 */
export type OutputCodeInterpreterServerToolItem = {
    code?: string | undefined;
    exitCode?: number | undefined;
    id?: string | undefined;
    language?: string | undefined;
    status: ToolCallStatus;
    stderr?: string | undefined;
    stdout?: string | undefined;
    type: OutputCodeInterpreterServerToolItemType;
};
/** @internal */
export declare const OutputCodeInterpreterServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputCodeInterpreterServerToolItemType>;
/** @internal */
export declare const OutputCodeInterpreterServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputCodeInterpreterServerToolItemType>;
/** @internal */
export declare const OutputCodeInterpreterServerToolItem$inboundSchema: z.ZodType<OutputCodeInterpreterServerToolItem, unknown>;
/** @internal */
export type OutputCodeInterpreterServerToolItem$Outbound = {
    code?: string | undefined;
    exitCode?: number | undefined;
    id?: string | undefined;
    language?: string | undefined;
    status: string;
    stderr?: string | undefined;
    stdout?: string | undefined;
    type: string;
};
/** @internal */
export declare const OutputCodeInterpreterServerToolItem$outboundSchema: z.ZodType<OutputCodeInterpreterServerToolItem$Outbound, OutputCodeInterpreterServerToolItem>;
export declare function outputCodeInterpreterServerToolItemToJSON(outputCodeInterpreterServerToolItem: OutputCodeInterpreterServerToolItem): string;
export declare function outputCodeInterpreterServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputCodeInterpreterServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputcodeinterpreterservertoolitem.d.ts.map