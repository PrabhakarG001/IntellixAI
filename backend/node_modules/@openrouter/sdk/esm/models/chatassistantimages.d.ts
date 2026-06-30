import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type ChatAssistantImagesImageUrl = {
    /**
     * URL or base64-encoded data of the generated image
     */
    url: string;
};
export type ChatAssistantImages = {
    imageUrl: ChatAssistantImagesImageUrl;
};
/** @internal */
export declare const ChatAssistantImagesImageUrl$inboundSchema: z.ZodType<ChatAssistantImagesImageUrl, unknown>;
/** @internal */
export type ChatAssistantImagesImageUrl$Outbound = {
    url: string;
};
/** @internal */
export declare const ChatAssistantImagesImageUrl$outboundSchema: z.ZodType<ChatAssistantImagesImageUrl$Outbound, ChatAssistantImagesImageUrl>;
export declare function chatAssistantImagesImageUrlToJSON(chatAssistantImagesImageUrl: ChatAssistantImagesImageUrl): string;
export declare function chatAssistantImagesImageUrlFromJSON(jsonString: string): SafeParseResult<ChatAssistantImagesImageUrl, SDKValidationError>;
/** @internal */
export declare const ChatAssistantImages$inboundSchema: z.ZodType<ChatAssistantImages, unknown>;
/** @internal */
export type ChatAssistantImages$Outbound = {
    image_url: ChatAssistantImagesImageUrl$Outbound;
};
/** @internal */
export declare const ChatAssistantImages$outboundSchema: z.ZodType<ChatAssistantImages$Outbound, ChatAssistantImages>;
export declare function chatAssistantImagesToJSON(chatAssistantImages: ChatAssistantImages): string;
export declare function chatAssistantImagesFromJSON(jsonString: string): SafeParseResult<ChatAssistantImages, SDKValidationError>;
//# sourceMappingURL=chatassistantimages.d.ts.map