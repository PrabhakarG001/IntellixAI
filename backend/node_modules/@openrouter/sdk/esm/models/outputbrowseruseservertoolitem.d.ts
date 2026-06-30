import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputBrowserUseServerToolItemType: {
    readonly OpenrouterBrowserUse: "openrouter:browser_use";
};
export type OutputBrowserUseServerToolItemType = ClosedEnum<typeof OutputBrowserUseServerToolItemType>;
/**
 * An openrouter:browser_use server tool output item
 */
export type OutputBrowserUseServerToolItem = {
    action?: string | undefined;
    id?: string | undefined;
    screenshotB64?: string | undefined;
    status: ToolCallStatus;
    type: OutputBrowserUseServerToolItemType;
};
/** @internal */
export declare const OutputBrowserUseServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputBrowserUseServerToolItemType>;
/** @internal */
export declare const OutputBrowserUseServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputBrowserUseServerToolItemType>;
/** @internal */
export declare const OutputBrowserUseServerToolItem$inboundSchema: z.ZodType<OutputBrowserUseServerToolItem, unknown>;
/** @internal */
export type OutputBrowserUseServerToolItem$Outbound = {
    action?: string | undefined;
    id?: string | undefined;
    screenshotB64?: string | undefined;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputBrowserUseServerToolItem$outboundSchema: z.ZodType<OutputBrowserUseServerToolItem$Outbound, OutputBrowserUseServerToolItem>;
export declare function outputBrowserUseServerToolItemToJSON(outputBrowserUseServerToolItem: OutputBrowserUseServerToolItem): string;
export declare function outputBrowserUseServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputBrowserUseServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputbrowseruseservertoolitem.d.ts.map