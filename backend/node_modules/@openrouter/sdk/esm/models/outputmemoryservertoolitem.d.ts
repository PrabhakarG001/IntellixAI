import * as z from "zod/v4";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const ActionEnum: {
    readonly Read: "read";
    readonly Write: "write";
    readonly Delete: "delete";
};
export type ActionEnum = OpenEnum<typeof ActionEnum>;
export declare const OutputMemoryServerToolItemType: {
    readonly OpenrouterMemory: "openrouter:memory";
};
export type OutputMemoryServerToolItemType = ClosedEnum<typeof OutputMemoryServerToolItemType>;
/**
 * An openrouter:memory server tool output item
 */
export type OutputMemoryServerToolItem = {
    action?: ActionEnum | undefined;
    id?: string | undefined;
    key?: string | undefined;
    status: ToolCallStatus;
    type: OutputMemoryServerToolItemType;
    value?: any | null | undefined;
};
/** @internal */
export declare const ActionEnum$inboundSchema: z.ZodType<ActionEnum, unknown>;
/** @internal */
export declare const ActionEnum$outboundSchema: z.ZodType<string, ActionEnum>;
/** @internal */
export declare const OutputMemoryServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputMemoryServerToolItemType>;
/** @internal */
export declare const OutputMemoryServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputMemoryServerToolItemType>;
/** @internal */
export declare const OutputMemoryServerToolItem$inboundSchema: z.ZodType<OutputMemoryServerToolItem, unknown>;
/** @internal */
export type OutputMemoryServerToolItem$Outbound = {
    action?: string | undefined;
    id?: string | undefined;
    key?: string | undefined;
    status: string;
    type: string;
    value?: any | null | undefined;
};
/** @internal */
export declare const OutputMemoryServerToolItem$outboundSchema: z.ZodType<OutputMemoryServerToolItem$Outbound, OutputMemoryServerToolItem>;
export declare function outputMemoryServerToolItemToJSON(outputMemoryServerToolItem: OutputMemoryServerToolItem): string;
export declare function outputMemoryServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputMemoryServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputmemoryservertoolitem.d.ts.map