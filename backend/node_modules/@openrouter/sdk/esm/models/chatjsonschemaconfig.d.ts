import * as z from "zod/v4";
/**
 * JSON Schema configuration object
 */
export type ChatJsonSchemaConfig = {
    /**
     * Schema description for the model
     */
    description?: string | undefined;
    /**
     * Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)
     */
    name: string;
    /**
     * JSON Schema object
     */
    schema?: {
        [k: string]: any | null;
    } | undefined;
    /**
     * Enable strict schema adherence
     */
    strict?: boolean | null | undefined;
};
/** @internal */
export type ChatJsonSchemaConfig$Outbound = {
    description?: string | undefined;
    name: string;
    schema?: {
        [k: string]: any | null;
    } | undefined;
    strict?: boolean | null | undefined;
};
/** @internal */
export declare const ChatJsonSchemaConfig$outboundSchema: z.ZodType<ChatJsonSchemaConfig$Outbound, ChatJsonSchemaConfig>;
export declare function chatJsonSchemaConfigToJSON(chatJsonSchemaConfig: ChatJsonSchemaConfig): string;
//# sourceMappingURL=chatjsonschemaconfig.d.ts.map