import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputBashServerToolItemType: {
    readonly OpenrouterBash: "openrouter:bash";
};
export type OutputBashServerToolItemType = ClosedEnum<typeof OutputBashServerToolItemType>;
/**
 * An openrouter:bash server tool output item
 */
export type OutputBashServerToolItem = {
    command?: string | undefined;
    exitCode?: number | undefined;
    id?: string | undefined;
    status: ToolCallStatus;
    stderr?: string | undefined;
    stdout?: string | undefined;
    type: OutputBashServerToolItemType;
};
/** @internal */
export declare const OutputBashServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputBashServerToolItemType>;
/** @internal */
export declare const OutputBashServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputBashServerToolItemType>;
/** @internal */
export declare const OutputBashServerToolItem$inboundSchema: z.ZodType<OutputBashServerToolItem, unknown>;
/** @internal */
export type OutputBashServerToolItem$Outbound = {
    command?: string | undefined;
    exitCode?: number | undefined;
    id?: string | undefined;
    status: string;
    stderr?: string | undefined;
    stdout?: string | undefined;
    type: string;
};
/** @internal */
export declare const OutputBashServerToolItem$outboundSchema: z.ZodType<OutputBashServerToolItem$Outbound, OutputBashServerToolItem>;
export declare function outputBashServerToolItemToJSON(outputBashServerToolItem: OutputBashServerToolItem): string;
export declare function outputBashServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputBashServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputbashservertoolitem.d.ts.map