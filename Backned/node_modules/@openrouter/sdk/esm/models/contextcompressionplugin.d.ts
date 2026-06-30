import * as z from "zod/v4";
import { ContextCompressionEngine } from "./contextcompressionengine.js";
export type ContextCompressionPlugin = {
    /**
     * Set to false to disable the context-compression plugin for this request. Defaults to true.
     */
    enabled?: boolean | undefined;
    /**
     * The compression engine to use. Defaults to "middle-out".
     */
    engine?: ContextCompressionEngine | undefined;
    id: "context-compression";
};
/** @internal */
export type ContextCompressionPlugin$Outbound = {
    enabled?: boolean | undefined;
    engine?: string | undefined;
    id: "context-compression";
};
/** @internal */
export declare const ContextCompressionPlugin$outboundSchema: z.ZodType<ContextCompressionPlugin$Outbound, ContextCompressionPlugin>;
export declare function contextCompressionPluginToJSON(contextCompressionPlugin: ContextCompressionPlugin): string;
//# sourceMappingURL=contextcompressionplugin.d.ts.map