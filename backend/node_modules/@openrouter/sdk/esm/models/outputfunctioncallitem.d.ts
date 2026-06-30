import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const OutputFunctionCallItemStatusInProgress: {
    readonly InProgress: "in_progress";
};
export type OutputFunctionCallItemStatusInProgress = ClosedEnum<typeof OutputFunctionCallItemStatusInProgress>;
export declare const OutputFunctionCallItemStatusIncomplete: {
    readonly Incomplete: "incomplete";
};
export type OutputFunctionCallItemStatusIncomplete = ClosedEnum<typeof OutputFunctionCallItemStatusIncomplete>;
export declare const OutputFunctionCallItemStatusCompleted: {
    readonly Completed: "completed";
};
export type OutputFunctionCallItemStatusCompleted = ClosedEnum<typeof OutputFunctionCallItemStatusCompleted>;
export type OutputFunctionCallItemStatusUnion = OutputFunctionCallItemStatusCompleted | OutputFunctionCallItemStatusIncomplete | OutputFunctionCallItemStatusInProgress;
export declare const OutputFunctionCallItemType: {
    readonly FunctionCall: "function_call";
};
export type OutputFunctionCallItemType = ClosedEnum<typeof OutputFunctionCallItemType>;
export type OutputFunctionCallItem = {
    arguments: string;
    callId: string;
    id?: string | undefined;
    name: string;
    /**
     * Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server)
     */
    namespace?: string | undefined;
    status?: OutputFunctionCallItemStatusCompleted | OutputFunctionCallItemStatusIncomplete | OutputFunctionCallItemStatusInProgress | undefined;
    type: OutputFunctionCallItemType;
};
/** @internal */
export declare const OutputFunctionCallItemStatusInProgress$inboundSchema: z.ZodEnum<typeof OutputFunctionCallItemStatusInProgress>;
/** @internal */
export declare const OutputFunctionCallItemStatusInProgress$outboundSchema: z.ZodEnum<typeof OutputFunctionCallItemStatusInProgress>;
/** @internal */
export declare const OutputFunctionCallItemStatusIncomplete$inboundSchema: z.ZodEnum<typeof OutputFunctionCallItemStatusIncomplete>;
/** @internal */
export declare const OutputFunctionCallItemStatusIncomplete$outboundSchema: z.ZodEnum<typeof OutputFunctionCallItemStatusIncomplete>;
/** @internal */
export declare const OutputFunctionCallItemStatusCompleted$inboundSchema: z.ZodEnum<typeof OutputFunctionCallItemStatusCompleted>;
/** @internal */
export declare const OutputFunctionCallItemStatusCompleted$outboundSchema: z.ZodEnum<typeof OutputFunctionCallItemStatusCompleted>;
/** @internal */
export declare const OutputFunctionCallItemStatusUnion$inboundSchema: z.ZodType<OutputFunctionCallItemStatusUnion, unknown>;
/** @internal */
export type OutputFunctionCallItemStatusUnion$Outbound = string | string | string;
/** @internal */
export declare const OutputFunctionCallItemStatusUnion$outboundSchema: z.ZodType<OutputFunctionCallItemStatusUnion$Outbound, OutputFunctionCallItemStatusUnion>;
export declare function outputFunctionCallItemStatusUnionToJSON(outputFunctionCallItemStatusUnion: OutputFunctionCallItemStatusUnion): string;
export declare function outputFunctionCallItemStatusUnionFromJSON(jsonString: string): SafeParseResult<OutputFunctionCallItemStatusUnion, SDKValidationError>;
/** @internal */
export declare const OutputFunctionCallItemType$inboundSchema: z.ZodEnum<typeof OutputFunctionCallItemType>;
/** @internal */
export declare const OutputFunctionCallItemType$outboundSchema: z.ZodEnum<typeof OutputFunctionCallItemType>;
/** @internal */
export declare const OutputFunctionCallItem$inboundSchema: z.ZodType<OutputFunctionCallItem, unknown>;
/** @internal */
export type OutputFunctionCallItem$Outbound = {
    arguments: string;
    call_id: string;
    id?: string | undefined;
    name: string;
    namespace?: string | undefined;
    status?: string | string | string | undefined;
    type: string;
};
/** @internal */
export declare const OutputFunctionCallItem$outboundSchema: z.ZodType<OutputFunctionCallItem$Outbound, OutputFunctionCallItem>;
export declare function outputFunctionCallItemToJSON(outputFunctionCallItem: OutputFunctionCallItem): string;
export declare function outputFunctionCallItemFromJSON(jsonString: string): SafeParseResult<OutputFunctionCallItem, SDKValidationError>;
//# sourceMappingURL=outputfunctioncallitem.d.ts.map