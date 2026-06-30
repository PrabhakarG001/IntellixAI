import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputToolSearchServerToolItemType: {
    readonly OpenrouterToolSearch: "openrouter:tool_search";
};
export type OutputToolSearchServerToolItemType = ClosedEnum<typeof OutputToolSearchServerToolItemType>;
/**
 * An openrouter:tool_search server tool output item
 */
export type OutputToolSearchServerToolItem = {
    id?: string | undefined;
    query?: string | undefined;
    status: ToolCallStatus;
    type: OutputToolSearchServerToolItemType;
};
/** @internal */
export declare const OutputToolSearchServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputToolSearchServerToolItemType>;
/** @internal */
export declare const OutputToolSearchServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputToolSearchServerToolItemType>;
/** @internal */
export declare const OutputToolSearchServerToolItem$inboundSchema: z.ZodType<OutputToolSearchServerToolItem, unknown>;
/** @internal */
export type OutputToolSearchServerToolItem$Outbound = {
    id?: string | undefined;
    query?: string | undefined;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputToolSearchServerToolItem$outboundSchema: z.ZodType<OutputToolSearchServerToolItem$Outbound, OutputToolSearchServerToolItem>;
export declare function outputToolSearchServerToolItemToJSON(outputToolSearchServerToolItem: OutputToolSearchServerToolItem): string;
export declare function outputToolSearchServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputToolSearchServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputtoolsearchservertoolitem.d.ts.map