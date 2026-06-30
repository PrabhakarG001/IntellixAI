import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { InputAudio } from "./inputaudio.js";
import { InputFile } from "./inputfile.js";
import { InputImage } from "./inputimage.js";
import { InputText } from "./inputtext.js";
export type OpenAIResponseInputMessageItemContent = InputAudio | InputFile | (InputImage & {
    type: "input_image";
}) | InputText | discriminatedUnionTypes.Unknown<"type">;
export declare const OpenAIResponseInputMessageItemRoleDeveloper: {
    readonly Developer: "developer";
};
export type OpenAIResponseInputMessageItemRoleDeveloper = ClosedEnum<typeof OpenAIResponseInputMessageItemRoleDeveloper>;
export declare const OpenAIResponseInputMessageItemRoleSystem: {
    readonly System: "system";
};
export type OpenAIResponseInputMessageItemRoleSystem = ClosedEnum<typeof OpenAIResponseInputMessageItemRoleSystem>;
export declare const OpenAIResponseInputMessageItemRoleUser: {
    readonly User: "user";
};
export type OpenAIResponseInputMessageItemRoleUser = ClosedEnum<typeof OpenAIResponseInputMessageItemRoleUser>;
export type OpenAIResponseInputMessageItemRoleUnion = OpenAIResponseInputMessageItemRoleUser | OpenAIResponseInputMessageItemRoleSystem | OpenAIResponseInputMessageItemRoleDeveloper;
export declare const OpenAIResponseInputMessageItemType: {
    readonly Message: "message";
};
export type OpenAIResponseInputMessageItemType = ClosedEnum<typeof OpenAIResponseInputMessageItemType>;
export type OpenAIResponseInputMessageItem = {
    content: Array<InputAudio | InputFile | (InputImage & {
        type: "input_image";
    }) | InputText | discriminatedUnionTypes.Unknown<"type">>;
    id: string;
    role: OpenAIResponseInputMessageItemRoleUser | OpenAIResponseInputMessageItemRoleSystem | OpenAIResponseInputMessageItemRoleDeveloper;
    type?: OpenAIResponseInputMessageItemType | undefined;
};
/** @internal */
export declare const OpenAIResponseInputMessageItemContent$inboundSchema: z.ZodType<OpenAIResponseInputMessageItemContent, unknown>;
export declare function openAIResponseInputMessageItemContentFromJSON(jsonString: string): SafeParseResult<OpenAIResponseInputMessageItemContent, SDKValidationError>;
/** @internal */
export declare const OpenAIResponseInputMessageItemRoleDeveloper$inboundSchema: z.ZodEnum<typeof OpenAIResponseInputMessageItemRoleDeveloper>;
/** @internal */
export declare const OpenAIResponseInputMessageItemRoleSystem$inboundSchema: z.ZodEnum<typeof OpenAIResponseInputMessageItemRoleSystem>;
/** @internal */
export declare const OpenAIResponseInputMessageItemRoleUser$inboundSchema: z.ZodEnum<typeof OpenAIResponseInputMessageItemRoleUser>;
/** @internal */
export declare const OpenAIResponseInputMessageItemRoleUnion$inboundSchema: z.ZodType<OpenAIResponseInputMessageItemRoleUnion, unknown>;
export declare function openAIResponseInputMessageItemRoleUnionFromJSON(jsonString: string): SafeParseResult<OpenAIResponseInputMessageItemRoleUnion, SDKValidationError>;
/** @internal */
export declare const OpenAIResponseInputMessageItemType$inboundSchema: z.ZodEnum<typeof OpenAIResponseInputMessageItemType>;
/** @internal */
export declare const OpenAIResponseInputMessageItem$inboundSchema: z.ZodType<OpenAIResponseInputMessageItem, unknown>;
export declare function openAIResponseInputMessageItemFromJSON(jsonString: string): SafeParseResult<OpenAIResponseInputMessageItem, SDKValidationError>;
//# sourceMappingURL=openairesponseinputmessageitem.d.ts.map