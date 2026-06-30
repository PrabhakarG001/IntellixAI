import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatContentCacheControl, ChatContentCacheControl$Outbound } from "./chatcontentcachecontrol.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const ChatContentTextType: {
    readonly Text: "text";
};
export type ChatContentTextType = ClosedEnum<typeof ChatContentTextType>;
/**
 * Text content part
 */
export type ChatContentText = {
    /**
     * Cache control for the content part
     */
    cacheControl?: ChatContentCacheControl | undefined;
    text: string;
    type: ChatContentTextType;
};
/** @internal */
export declare const ChatContentTextType$inboundSchema: z.ZodEnum<typeof ChatContentTextType>;
/** @internal */
export declare const ChatContentTextType$outboundSchema: z.ZodEnum<typeof ChatContentTextType>;
/** @internal */
export declare const ChatContentText$inboundSchema: z.ZodType<ChatContentText, unknown>;
/** @internal */
export type ChatContentText$Outbound = {
    cache_control?: ChatContentCacheControl$Outbound | undefined;
    text: string;
    type: string;
};
/** @internal */
export declare const ChatContentText$outboundSchema: z.ZodType<ChatContentText$Outbound, ChatContentText>;
export declare function chatContentTextToJSON(chatContentText: ChatContentText): string;
export declare function chatContentTextFromJSON(jsonString: string): SafeParseResult<ChatContentText, SDKValidationError>;
//# sourceMappingURL=chatcontenttext.d.ts.map