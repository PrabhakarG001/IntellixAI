import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputFileSearchServerToolItemType: {
    readonly OpenrouterFileSearch: "openrouter:file_search";
};
export type OutputFileSearchServerToolItemType = ClosedEnum<typeof OutputFileSearchServerToolItemType>;
/**
 * An openrouter:file_search server tool output item
 */
export type OutputFileSearchServerToolItem = {
    id?: string | undefined;
    queries?: Array<string> | undefined;
    status: ToolCallStatus;
    type: OutputFileSearchServerToolItemType;
};
/** @internal */
export declare const OutputFileSearchServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputFileSearchServerToolItemType>;
/** @internal */
export declare const OutputFileSearchServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputFileSearchServerToolItemType>;
/** @internal */
export declare const OutputFileSearchServerToolItem$inboundSchema: z.ZodType<OutputFileSearchServerToolItem, unknown>;
/** @internal */
export type OutputFileSearchServerToolItem$Outbound = {
    id?: string | undefined;
    queries?: Array<string> | undefined;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputFileSearchServerToolItem$outboundSchema: z.ZodType<OutputFileSearchServerToolItem$Outbound, OutputFileSearchServerToolItem>;
export declare function outputFileSearchServerToolItemToJSON(outputFileSearchServerToolItem: OutputFileSearchServerToolItem): string;
export declare function outputFileSearchServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputFileSearchServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputfilesearchservertoolitem.d.ts.map