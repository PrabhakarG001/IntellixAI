import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { AnthropicCacheControlTtl } from "./anthropiccachecontrolttl.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const ChatContentCacheControlType: {
    readonly Ephemeral: "ephemeral";
};
export type ChatContentCacheControlType = ClosedEnum<typeof ChatContentCacheControlType>;
/**
 * Cache control for the content part
 */
export type ChatContentCacheControl = {
    ttl?: AnthropicCacheControlTtl | undefined;
    type: ChatContentCacheControlType;
};
/** @internal */
export declare const ChatContentCacheControlType$inboundSchema: z.ZodEnum<typeof ChatContentCacheControlType>;
/** @internal */
export declare const ChatContentCacheControlType$outboundSchema: z.ZodEnum<typeof ChatContentCacheControlType>;
/** @internal */
export declare const ChatContentCacheControl$inboundSchema: z.ZodType<ChatContentCacheControl, unknown>;
/** @internal */
export type ChatContentCacheControl$Outbound = {
    ttl?: string | undefined;
    type: string;
};
/** @internal */
export declare const ChatContentCacheControl$outboundSchema: z.ZodType<ChatContentCacheControl$Outbound, ChatContentCacheControl>;
export declare function chatContentCacheControlToJSON(chatContentCacheControl: ChatContentCacheControl): string;
export declare function chatContentCacheControlFromJSON(jsonString: string): SafeParseResult<ChatContentCacheControl, SDKValidationError>;
//# sourceMappingURL=chatcontentcachecontrol.d.ts.map