import * as z from "zod/v4";
/**
 * Streaming configuration options
 */
export type ChatStreamOptions = {
    /**
     * Deprecated: This field has no effect. Full usage details are always included.
     *
     * @deprecated field: This will be removed in a future release, please migrate away from it as soon as possible.
     */
    includeUsage?: boolean | undefined;
};
/** @internal */
export type ChatStreamOptions$Outbound = {
    include_usage?: boolean | undefined;
};
/** @internal */
export declare const ChatStreamOptions$outboundSchema: z.ZodType<ChatStreamOptions$Outbound, ChatStreamOptions>;
export declare function chatStreamOptionsToJSON(chatStreamOptions: ChatStreamOptions): string;
//# sourceMappingURL=chatstreamoptions.d.ts.map