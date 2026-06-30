import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
export type ChatNamedToolChoiceFunction = {
    /**
     * Function name to call
     */
    name: string;
};
export declare const ChatNamedToolChoiceType: {
    readonly Function: "function";
};
export type ChatNamedToolChoiceType = ClosedEnum<typeof ChatNamedToolChoiceType>;
/**
 * Named tool choice for specific function
 */
export type ChatNamedToolChoice = {
    function: ChatNamedToolChoiceFunction;
    type: ChatNamedToolChoiceType;
};
/** @internal */
export type ChatNamedToolChoiceFunction$Outbound = {
    name: string;
};
/** @internal */
export declare const ChatNamedToolChoiceFunction$outboundSchema: z.ZodType<ChatNamedToolChoiceFunction$Outbound, ChatNamedToolChoiceFunction>;
export declare function chatNamedToolChoiceFunctionToJSON(chatNamedToolChoiceFunction: ChatNamedToolChoiceFunction): string;
/** @internal */
export declare const ChatNamedToolChoiceType$outboundSchema: z.ZodEnum<typeof ChatNamedToolChoiceType>;
/** @internal */
export type ChatNamedToolChoice$Outbound = {
    function: ChatNamedToolChoiceFunction$Outbound;
    type: string;
};
/** @internal */
export declare const ChatNamedToolChoice$outboundSchema: z.ZodType<ChatNamedToolChoice$Outbound, ChatNamedToolChoice>;
export declare function chatNamedToolChoiceToJSON(chatNamedToolChoice: ChatNamedToolChoice): string;
//# sourceMappingURL=chatnamedtoolchoice.d.ts.map