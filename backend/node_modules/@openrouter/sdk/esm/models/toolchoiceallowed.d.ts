import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const ModeRequired: {
    readonly Required: "required";
};
export type ModeRequired = ClosedEnum<typeof ModeRequired>;
export declare const ModeAuto: {
    readonly Auto: "auto";
};
export type ModeAuto = ClosedEnum<typeof ModeAuto>;
export type Mode = ModeAuto | ModeRequired;
export declare const ToolChoiceAllowedType: {
    readonly AllowedTools: "allowed_tools";
};
export type ToolChoiceAllowedType = ClosedEnum<typeof ToolChoiceAllowedType>;
/**
 * Constrains the model to a pre-defined set of allowed tools
 */
export type ToolChoiceAllowed = {
    mode: ModeAuto | ModeRequired;
    tools: Array<{
        [k: string]: any | null;
    }>;
    type: ToolChoiceAllowedType;
};
/** @internal */
export declare const ModeRequired$inboundSchema: z.ZodEnum<typeof ModeRequired>;
/** @internal */
export declare const ModeRequired$outboundSchema: z.ZodEnum<typeof ModeRequired>;
/** @internal */
export declare const ModeAuto$inboundSchema: z.ZodEnum<typeof ModeAuto>;
/** @internal */
export declare const ModeAuto$outboundSchema: z.ZodEnum<typeof ModeAuto>;
/** @internal */
export declare const Mode$inboundSchema: z.ZodType<Mode, unknown>;
/** @internal */
export type Mode$Outbound = string | string;
/** @internal */
export declare const Mode$outboundSchema: z.ZodType<Mode$Outbound, Mode>;
export declare function modeToJSON(mode: Mode): string;
export declare function modeFromJSON(jsonString: string): SafeParseResult<Mode, SDKValidationError>;
/** @internal */
export declare const ToolChoiceAllowedType$inboundSchema: z.ZodEnum<typeof ToolChoiceAllowedType>;
/** @internal */
export declare const ToolChoiceAllowedType$outboundSchema: z.ZodEnum<typeof ToolChoiceAllowedType>;
/** @internal */
export declare const ToolChoiceAllowed$inboundSchema: z.ZodType<ToolChoiceAllowed, unknown>;
/** @internal */
export type ToolChoiceAllowed$Outbound = {
    mode: string | string;
    tools: Array<{
        [k: string]: any | null;
    }>;
    type: string;
};
/** @internal */
export declare const ToolChoiceAllowed$outboundSchema: z.ZodType<ToolChoiceAllowed$Outbound, ToolChoiceAllowed>;
export declare function toolChoiceAllowedToJSON(toolChoiceAllowed: ToolChoiceAllowed): string;
export declare function toolChoiceAllowedFromJSON(jsonString: string): SafeParseResult<ToolChoiceAllowed, SDKValidationError>;
//# sourceMappingURL=toolchoiceallowed.d.ts.map