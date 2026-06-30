import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Image detail level for vision models
 */
export declare const ChatContentImageDetail: {
    readonly Auto: "auto";
    readonly Low: "low";
    readonly High: "high";
};
/**
 * Image detail level for vision models
 */
export type ChatContentImageDetail = OpenEnum<typeof ChatContentImageDetail>;
export type ChatContentImageImageUrl = {
    /**
     * Image detail level for vision models
     */
    detail?: ChatContentImageDetail | undefined;
    /**
     * URL of the image (data: URLs supported)
     */
    url: string;
};
/**
 * Image content part for vision models
 */
export type ChatContentImage = {
    imageUrl: ChatContentImageImageUrl;
    type: "image_url";
};
/** @internal */
export declare const ChatContentImageDetail$inboundSchema: z.ZodType<ChatContentImageDetail, unknown>;
/** @internal */
export declare const ChatContentImageDetail$outboundSchema: z.ZodType<string, ChatContentImageDetail>;
/** @internal */
export declare const ChatContentImageImageUrl$inboundSchema: z.ZodType<ChatContentImageImageUrl, unknown>;
/** @internal */
export type ChatContentImageImageUrl$Outbound = {
    detail?: string | undefined;
    url: string;
};
/** @internal */
export declare const ChatContentImageImageUrl$outboundSchema: z.ZodType<ChatContentImageImageUrl$Outbound, ChatContentImageImageUrl>;
export declare function chatContentImageImageUrlToJSON(chatContentImageImageUrl: ChatContentImageImageUrl): string;
export declare function chatContentImageImageUrlFromJSON(jsonString: string): SafeParseResult<ChatContentImageImageUrl, SDKValidationError>;
/** @internal */
export declare const ChatContentImage$inboundSchema: z.ZodType<ChatContentImage, unknown>;
/** @internal */
export type ChatContentImage$Outbound = {
    image_url: ChatContentImageImageUrl$Outbound;
    type: "image_url";
};
/** @internal */
export declare const ChatContentImage$outboundSchema: z.ZodType<ChatContentImage$Outbound, ChatContentImage>;
export declare function chatContentImageToJSON(chatContentImage: ChatContentImage): string;
export declare function chatContentImageFromJSON(jsonString: string): SafeParseResult<ChatContentImage, SDKValidationError>;
//# sourceMappingURL=chatcontentimage.d.ts.map