import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const FunctionCallItemType: {
    readonly FunctionCall: "function_call";
};
export type FunctionCallItemType = ClosedEnum<typeof FunctionCallItemType>;
/**
 * A function call initiated by the model
 */
export type FunctionCallItem = {
    arguments: string;
    callId: string;
    id: string;
    name: string;
    /**
     * Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server)
     */
    namespace?: string | undefined;
    status?: ToolCallStatus | undefined;
    type: FunctionCallItemType;
};
/** @internal */
export declare const FunctionCallItemType$outboundSchema: z.ZodEnum<typeof FunctionCallItemType>;
/** @internal */
export type FunctionCallItem$Outbound = {
    arguments: string;
    call_id: string;
    id: string;
    name: string;
    namespace?: string | undefined;
    status?: string | undefined;
    type: string;
};
/** @internal */
export declare const FunctionCallItem$outboundSchema: z.ZodType<FunctionCallItem$Outbound, FunctionCallItem>;
export declare function functionCallItemToJSON(functionCallItem: FunctionCallItem): string;
//# sourceMappingURL=functioncallitem.d.ts.map