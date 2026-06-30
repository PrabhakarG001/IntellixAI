import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputWebFetchServerToolItemType: {
    readonly OpenrouterWebFetch: "openrouter:web_fetch";
};
export type OutputWebFetchServerToolItemType = ClosedEnum<typeof OutputWebFetchServerToolItemType>;
/**
 * An openrouter:web_fetch server tool output item
 */
export type OutputWebFetchServerToolItem = {
    content?: string | undefined;
    /**
     * The error message if the fetch failed.
     */
    error?: string | undefined;
    /**
     * The HTTP status code returned by the upstream URL fetch.
     */
    httpStatus?: number | undefined;
    id?: string | undefined;
    status: ToolCallStatus;
    title?: string | undefined;
    type: OutputWebFetchServerToolItemType;
    url?: string | undefined;
};
/** @internal */
export declare const OutputWebFetchServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputWebFetchServerToolItemType>;
/** @internal */
export declare const OutputWebFetchServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputWebFetchServerToolItemType>;
/** @internal */
export declare const OutputWebFetchServerToolItem$inboundSchema: z.ZodType<OutputWebFetchServerToolItem, unknown>;
/** @internal */
export type OutputWebFetchServerToolItem$Outbound = {
    content?: string | undefined;
    error?: string | undefined;
    httpStatus?: number | undefined;
    id?: string | undefined;
    status: string;
    title?: string | undefined;
    type: string;
    url?: string | undefined;
};
/** @internal */
export declare const OutputWebFetchServerToolItem$outboundSchema: z.ZodType<OutputWebFetchServerToolItem$Outbound, OutputWebFetchServerToolItem>;
export declare function outputWebFetchServerToolItemToJSON(outputWebFetchServerToolItem: OutputWebFetchServerToolItem): string;
export declare function outputWebFetchServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputWebFetchServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputwebfetchservertoolitem.d.ts.map