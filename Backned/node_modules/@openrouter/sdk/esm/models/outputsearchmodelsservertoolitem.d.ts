import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputSearchModelsServerToolItemType: {
    readonly OpenrouterExperimentalSearchModels: "openrouter:experimental__search_models";
};
export type OutputSearchModelsServerToolItemType = ClosedEnum<typeof OutputSearchModelsServerToolItemType>;
/**
 * An openrouter:experimental__search_models server tool output item
 */
export type OutputSearchModelsServerToolItem = {
    /**
     * The JSON arguments submitted to the search tool (e.g. {"query":"Claude"})
     */
    arguments?: string | undefined;
    id?: string | undefined;
    query?: string | undefined;
    status: ToolCallStatus;
    type: OutputSearchModelsServerToolItemType;
};
/** @internal */
export declare const OutputSearchModelsServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputSearchModelsServerToolItemType>;
/** @internal */
export declare const OutputSearchModelsServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputSearchModelsServerToolItemType>;
/** @internal */
export declare const OutputSearchModelsServerToolItem$inboundSchema: z.ZodType<OutputSearchModelsServerToolItem, unknown>;
/** @internal */
export type OutputSearchModelsServerToolItem$Outbound = {
    arguments?: string | undefined;
    id?: string | undefined;
    query?: string | undefined;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputSearchModelsServerToolItem$outboundSchema: z.ZodType<OutputSearchModelsServerToolItem$Outbound, OutputSearchModelsServerToolItem>;
export declare function outputSearchModelsServerToolItemToJSON(outputSearchModelsServerToolItem: OutputSearchModelsServerToolItem): string;
export declare function outputSearchModelsServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputSearchModelsServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputsearchmodelsservertoolitem.d.ts.map