import * as z from "zod/v4";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ToolCallStatus } from "./toolcallstatus.js";
export declare const Command: {
    readonly View: "view";
    readonly Create: "create";
    readonly StrReplace: "str_replace";
    readonly Insert: "insert";
};
export type Command = OpenEnum<typeof Command>;
export declare const OutputTextEditorServerToolItemType: {
    readonly OpenrouterTextEditor: "openrouter:text_editor";
};
export type OutputTextEditorServerToolItemType = ClosedEnum<typeof OutputTextEditorServerToolItemType>;
/**
 * An openrouter:text_editor server tool output item
 */
export type OutputTextEditorServerToolItem = {
    command?: Command | undefined;
    filePath?: string | undefined;
    id?: string | undefined;
    status: ToolCallStatus;
    type: OutputTextEditorServerToolItemType;
};
/** @internal */
export declare const Command$inboundSchema: z.ZodType<Command, unknown>;
/** @internal */
export declare const Command$outboundSchema: z.ZodType<string, Command>;
/** @internal */
export declare const OutputTextEditorServerToolItemType$inboundSchema: z.ZodEnum<typeof OutputTextEditorServerToolItemType>;
/** @internal */
export declare const OutputTextEditorServerToolItemType$outboundSchema: z.ZodEnum<typeof OutputTextEditorServerToolItemType>;
/** @internal */
export declare const OutputTextEditorServerToolItem$inboundSchema: z.ZodType<OutputTextEditorServerToolItem, unknown>;
/** @internal */
export type OutputTextEditorServerToolItem$Outbound = {
    command?: string | undefined;
    filePath?: string | undefined;
    id?: string | undefined;
    status: string;
    type: string;
};
/** @internal */
export declare const OutputTextEditorServerToolItem$outboundSchema: z.ZodType<OutputTextEditorServerToolItem$Outbound, OutputTextEditorServerToolItem>;
export declare function outputTextEditorServerToolItemToJSON(outputTextEditorServerToolItem: OutputTextEditorServerToolItem): string;
export declare function outputTextEditorServerToolItemFromJSON(jsonString: string): SafeParseResult<OutputTextEditorServerToolItem, SDKValidationError>;
//# sourceMappingURL=outputtexteditorservertoolitem.d.ts.map