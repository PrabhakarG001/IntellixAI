import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const OutputDatetimeItemType: {
    readonly OpenrouterDatetime: "openrouter:datetime";
};
export type OutputDatetimeItemType = ClosedEnum<typeof OutputDatetimeItemType>;
/**
 * An openrouter:datetime server tool output item
 */
export type OutputDatetimeItem = {
    /**
     * ISO 8601 datetime string
     */
    datetime: string;
    id?: string | undefined;
    status: ToolCallStatus;
    /**
     * IANA timezone name
     */
    timezone: string;
    type: OutputDatetimeItemType;
};
/** @internal */
export declare const OutputDatetimeItemType$inboundSchema: z.ZodEnum<typeof OutputDatetimeItemType>;
/** @internal */
export declare const OutputDatetimeItemType$outboundSchema: z.ZodEnum<typeof OutputDatetimeItemType>;
/** @internal */
export declare const OutputDatetimeItem$inboundSchema: z.ZodType<OutputDatetimeItem, unknown>;
/** @internal */
export type OutputDatetimeItem$Outbound = {
    datetime: string;
    id?: string | undefined;
    status: string;
    timezone: string;
    type: string;
};
/** @internal */
export declare const OutputDatetimeItem$outboundSchema: z.ZodType<OutputDatetimeItem$Outbound, OutputDatetimeItem>;
export declare function outputDatetimeItemToJSON(outputDatetimeItem: OutputDatetimeItem): string;
export declare function outputDatetimeItemFromJSON(jsonString: string): SafeParseResult<OutputDatetimeItem, SDKValidationError>;
//# sourceMappingURL=outputdatetimeitem.d.ts.map