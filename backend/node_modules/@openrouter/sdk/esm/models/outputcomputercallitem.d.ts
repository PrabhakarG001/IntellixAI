import * as z from "zod/v4";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type PendingSafetyCheck = {
    code: string;
    id: string;
    message: string;
};
export declare const OutputComputerCallItemStatus: {
    readonly Completed: "completed";
    readonly Incomplete: "incomplete";
    readonly InProgress: "in_progress";
};
export type OutputComputerCallItemStatus = OpenEnum<typeof OutputComputerCallItemStatus>;
export declare const OutputComputerCallItemType: {
    readonly ComputerCall: "computer_call";
};
export type OutputComputerCallItemType = ClosedEnum<typeof OutputComputerCallItemType>;
export type OutputComputerCallItem = {
    action?: any | null | undefined;
    callId: string;
    id?: string | undefined;
    pendingSafetyChecks: Array<PendingSafetyCheck>;
    status: OutputComputerCallItemStatus;
    type: OutputComputerCallItemType;
};
/** @internal */
export declare const PendingSafetyCheck$inboundSchema: z.ZodType<PendingSafetyCheck, unknown>;
/** @internal */
export type PendingSafetyCheck$Outbound = {
    code: string;
    id: string;
    message: string;
};
/** @internal */
export declare const PendingSafetyCheck$outboundSchema: z.ZodType<PendingSafetyCheck$Outbound, PendingSafetyCheck>;
export declare function pendingSafetyCheckToJSON(pendingSafetyCheck: PendingSafetyCheck): string;
export declare function pendingSafetyCheckFromJSON(jsonString: string): SafeParseResult<PendingSafetyCheck, SDKValidationError>;
/** @internal */
export declare const OutputComputerCallItemStatus$inboundSchema: z.ZodType<OutputComputerCallItemStatus, unknown>;
/** @internal */
export declare const OutputComputerCallItemStatus$outboundSchema: z.ZodType<string, OutputComputerCallItemStatus>;
/** @internal */
export declare const OutputComputerCallItemType$inboundSchema: z.ZodEnum<typeof OutputComputerCallItemType>;
/** @internal */
export declare const OutputComputerCallItemType$outboundSchema: z.ZodEnum<typeof OutputComputerCallItemType>;
/** @internal */
export declare const OutputComputerCallItem$inboundSchema: z.ZodType<OutputComputerCallItem, unknown>;
/** @internal */
export type OutputComputerCallItem$Outbound = {
    action?: any | null | undefined;
    call_id: string;
    id?: string | undefined;
    pending_safety_checks: Array<PendingSafetyCheck$Outbound>;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputComputerCallItem$outboundSchema: z.ZodType<OutputComputerCallItem$Outbound, OutputComputerCallItem>;
export declare function outputComputerCallItemToJSON(outputComputerCallItem: OutputComputerCallItem): string;
export declare function outputComputerCallItemFromJSON(jsonString: string): SafeParseResult<OutputComputerCallItem, SDKValidationError>;
//# sourceMappingURL=outputcomputercallitem.d.ts.map