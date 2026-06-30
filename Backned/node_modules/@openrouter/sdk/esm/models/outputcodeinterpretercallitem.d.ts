import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export type OutputLogs = {
    logs: string;
    type: "logs";
};
export type OutputImage = {
    type: "image";
    url: string;
};
export type OutputCodeInterpreterCallItemOutputUnion = OutputImage | OutputLogs | discriminatedUnionTypes.Unknown<"type">;
export declare const TypeCodeInterpreterCall: {
    readonly CodeInterpreterCall: "code_interpreter_call";
};
export type TypeCodeInterpreterCall = ClosedEnum<typeof TypeCodeInterpreterCall>;
/**
 * A code interpreter execution call with outputs
 */
export type OutputCodeInterpreterCallItem = {
    code: string | null;
    containerId: string;
    id: string;
    outputs: Array<OutputImage | OutputLogs | discriminatedUnionTypes.Unknown<"type">> | null;
    status: ToolCallStatus;
    type: TypeCodeInterpreterCall;
};
/** @internal */
export declare const OutputLogs$inboundSchema: z.ZodType<OutputLogs, unknown>;
/** @internal */
export type OutputLogs$Outbound = {
    logs: string;
    type: "logs";
};
/** @internal */
export declare const OutputLogs$outboundSchema: z.ZodType<OutputLogs$Outbound, OutputLogs>;
export declare function outputLogsToJSON(outputLogs: OutputLogs): string;
export declare function outputLogsFromJSON(jsonString: string): SafeParseResult<OutputLogs, SDKValidationError>;
/** @internal */
export declare const OutputImage$inboundSchema: z.ZodType<OutputImage, unknown>;
/** @internal */
export type OutputImage$Outbound = {
    type: "image";
    url: string;
};
/** @internal */
export declare const OutputImage$outboundSchema: z.ZodType<OutputImage$Outbound, OutputImage>;
export declare function outputImageToJSON(outputImage: OutputImage): string;
export declare function outputImageFromJSON(jsonString: string): SafeParseResult<OutputImage, SDKValidationError>;
/** @internal */
export declare const OutputCodeInterpreterCallItemOutputUnion$inboundSchema: z.ZodType<OutputCodeInterpreterCallItemOutputUnion, unknown>;
/** @internal */
export type OutputCodeInterpreterCallItemOutputUnion$Outbound = OutputImage$Outbound | OutputLogs$Outbound;
/** @internal */
export declare const OutputCodeInterpreterCallItemOutputUnion$outboundSchema: z.ZodType<OutputCodeInterpreterCallItemOutputUnion$Outbound, OutputCodeInterpreterCallItemOutputUnion>;
export declare function outputCodeInterpreterCallItemOutputUnionToJSON(outputCodeInterpreterCallItemOutputUnion: OutputCodeInterpreterCallItemOutputUnion): string;
export declare function outputCodeInterpreterCallItemOutputUnionFromJSON(jsonString: string): SafeParseResult<OutputCodeInterpreterCallItemOutputUnion, SDKValidationError>;
/** @internal */
export declare const TypeCodeInterpreterCall$inboundSchema: z.ZodEnum<typeof TypeCodeInterpreterCall>;
/** @internal */
export declare const TypeCodeInterpreterCall$outboundSchema: z.ZodEnum<typeof TypeCodeInterpreterCall>;
/** @internal */
export declare const OutputCodeInterpreterCallItem$inboundSchema: z.ZodType<OutputCodeInterpreterCallItem, unknown>;
/** @internal */
export type OutputCodeInterpreterCallItem$Outbound = {
    code: string | null;
    container_id: string;
    id: string;
    outputs: Array<OutputImage$Outbound | OutputLogs$Outbound> | null;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputCodeInterpreterCallItem$outboundSchema: z.ZodType<OutputCodeInterpreterCallItem$Outbound, OutputCodeInterpreterCallItem>;
export declare function outputCodeInterpreterCallItemToJSON(outputCodeInterpreterCallItem: OutputCodeInterpreterCallItem): string;
export declare function outputCodeInterpreterCallItemFromJSON(jsonString: string): SafeParseResult<OutputCodeInterpreterCallItem, SDKValidationError>;
//# sourceMappingURL=outputcodeinterpretercallitem.d.ts.map