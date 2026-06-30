import * as z from "zod/v4";
export type ResponseHealingPlugin = {
    /**
     * Set to false to disable the response-healing plugin for this request. Defaults to true.
     */
    enabled?: boolean | undefined;
    id: "response-healing";
};
/** @internal */
export type ResponseHealingPlugin$Outbound = {
    enabled?: boolean | undefined;
    id: "response-healing";
};
/** @internal */
export declare const ResponseHealingPlugin$outboundSchema: z.ZodType<ResponseHealingPlugin$Outbound, ResponseHealingPlugin>;
export declare function responseHealingPluginToJSON(responseHealingPlugin: ResponseHealingPlugin): string;
//# sourceMappingURL=responsehealingplugin.d.ts.map