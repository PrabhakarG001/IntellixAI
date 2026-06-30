import * as z from "zod/v4";
/**
 * Debug options for inspecting request transformations (streaming only)
 */
export type ChatDebugOptions = {
    /**
     * If true, includes the transformed upstream request body in a debug chunk at the start of the stream. Only works with streaming mode.
     */
    echoUpstreamBody?: boolean | undefined;
};
/** @internal */
export type ChatDebugOptions$Outbound = {
    echo_upstream_body?: boolean | undefined;
};
/** @internal */
export declare const ChatDebugOptions$outboundSchema: z.ZodType<ChatDebugOptions$Outbound, ChatDebugOptions>;
export declare function chatDebugOptionsToJSON(chatDebugOptions: ChatDebugOptions): string;
//# sourceMappingURL=chatdebugoptions.d.ts.map