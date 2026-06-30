import * as z from "zod/v4";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const MemoryLimit: {
    readonly Oneg: "1g";
    readonly Fourg: "4g";
    readonly Sixteeng: "16g";
    readonly SixtyFourg: "64g";
};
export type MemoryLimit = OpenEnum<typeof MemoryLimit>;
export declare const ContainerType: {
    readonly Auto: "auto";
};
export type ContainerType = ClosedEnum<typeof ContainerType>;
export type ContainerAuto = {
    fileIds?: Array<string> | undefined;
    memoryLimit?: MemoryLimit | null | undefined;
    type: ContainerType;
};
export type Container = ContainerAuto | string;
/**
 * Code interpreter tool configuration
 */
export type CodeInterpreterServerTool = {
    container: ContainerAuto | string;
    type: "code_interpreter";
};
/** @internal */
export declare const MemoryLimit$inboundSchema: z.ZodType<MemoryLimit, unknown>;
/** @internal */
export declare const MemoryLimit$outboundSchema: z.ZodType<string, MemoryLimit>;
/** @internal */
export declare const ContainerType$inboundSchema: z.ZodEnum<typeof ContainerType>;
/** @internal */
export declare const ContainerType$outboundSchema: z.ZodEnum<typeof ContainerType>;
/** @internal */
export declare const ContainerAuto$inboundSchema: z.ZodType<ContainerAuto, unknown>;
/** @internal */
export type ContainerAuto$Outbound = {
    file_ids?: Array<string> | undefined;
    memory_limit?: string | null | undefined;
    type: string;
};
/** @internal */
export declare const ContainerAuto$outboundSchema: z.ZodType<ContainerAuto$Outbound, ContainerAuto>;
export declare function containerAutoToJSON(containerAuto: ContainerAuto): string;
export declare function containerAutoFromJSON(jsonString: string): SafeParseResult<ContainerAuto, SDKValidationError>;
/** @internal */
export declare const Container$inboundSchema: z.ZodType<Container, unknown>;
/** @internal */
export type Container$Outbound = ContainerAuto$Outbound | string;
/** @internal */
export declare const Container$outboundSchema: z.ZodType<Container$Outbound, Container>;
export declare function containerToJSON(container: Container): string;
export declare function containerFromJSON(jsonString: string): SafeParseResult<Container, SDKValidationError>;
/** @internal */
export declare const CodeInterpreterServerTool$inboundSchema: z.ZodType<CodeInterpreterServerTool, unknown>;
/** @internal */
export type CodeInterpreterServerTool$Outbound = {
    container: ContainerAuto$Outbound | string;
    type: "code_interpreter";
};
/** @internal */
export declare const CodeInterpreterServerTool$outboundSchema: z.ZodType<CodeInterpreterServerTool$Outbound, CodeInterpreterServerTool>;
export declare function codeInterpreterServerToolToJSON(codeInterpreterServerTool: CodeInterpreterServerTool): string;
export declare function codeInterpreterServerToolFromJSON(jsonString: string): SafeParseResult<CodeInterpreterServerTool, SDKValidationError>;
//# sourceMappingURL=codeinterpreterservertool.d.ts.map