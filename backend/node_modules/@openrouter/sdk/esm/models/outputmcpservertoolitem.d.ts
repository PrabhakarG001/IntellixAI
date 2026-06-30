import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputMcpServerToolItemType: {
    readonly OpenrouterMcp: "openrouter:mcp";
};
export type OutputMcpServerToolItemType = ClosedEnum<typeof OutputMcpServerToolItemType>;
/**
 * An openrouter:mcp server tool output item
 */
export type OutputMcpServerToolItem = {
    id?: string | undefined;
    serverLabel?: string | undefined;
    status: ToolCallStatus;
    toolName?: string | undefined;
    type: OutputMcpServerToolItemType;
};
/** @internal */
export declare const OutputMcpServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputMcpServerToolItemType>;
/** @internal */
export declare const OutputMcpServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputMcpServerToolItemType>;
/** @internal */
export declare const OutputMcpServerToolItem$inboundSchema: z.ZodType<OutputMcpServerToolItem, unknown>;
/** @internal */
export type OutputMcpServerToolItem$Outbound = {
    id?: string | undefined;
    serverLabel?: string | undefined;
    status: string;
    toolName?: string | undefined;
    type: string;
};
/** @internal */
export declare const OutputMcpServerToolItem$outboundSchema: z.ZodType<OutputMcpServerToolItem$Outbound, OutputMcpServerToolItem>;
export declare function outputMcpServerToolItemToJSON(outputMcpServerToolItem: OutputMcpServerToolItem): string;
export declare function outputMcpServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputMcpServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputmcpservertoolitem.d.ts.map