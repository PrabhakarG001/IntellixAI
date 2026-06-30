import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { WebSearchStatus } from "./websearchstatus.js";
export declare const OutputFileSearchCallItemType: {
    readonly FileSearchCall: "file_search_call";
};
export type OutputFileSearchCallItemType = ClosedEnum<typeof OutputFileSearchCallItemType>;
export type OutputFileSearchCallItem = {
    id: string;
    queries: Array<string>;
    status: WebSearchStatus;
    type: OutputFileSearchCallItemType;
};
/** @internal */
export declare const OutputFileSearchCallItemType$inboundSchema: z.ZodEnum<typeof OutputFileSearchCallItemType>;
/** @internal */
export declare const OutputFileSearchCallItemType$outboundSchema: z.ZodEnum<typeof OutputFileSearchCallItemType>;
/** @internal */
export declare const OutputFileSearchCallItem$inboundSchema: z.ZodType<OutputFileSearchCallItem, unknown>;
/** @internal */
export type OutputFileSearchCallItem$Outbound = {
    id: string;
    queries: Array<string>;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputFileSearchCallItem$outboundSchema: z.ZodType<OutputFileSearchCallItem$Outbound, OutputFileSearchCallItem>;
export declare function outputFileSearchCallItemToJSON(outputFileSearchCallItem: OutputFileSearchCallItem): string;
export declare function outputFileSearchCallItemFromJSON(jsonString: string): SafeParseResult<OutputFileSearchCallItem, SDKValidationError>;
//# sourceMappingURL=outputfilesearchcallitem.d.ts.map