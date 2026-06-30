import * as z from "zod/v4";
/**
 * Metadata for observability and tracing. Known keys (trace_id, trace_name, span_name, generation_name, parent_span_id) have special handling. Additional keys are passed through as custom metadata to configured broadcast destinations.
 */
export type TraceConfig = {
    generationName?: string | undefined;
    parentSpanId?: string | undefined;
    spanName?: string | undefined;
    traceId?: string | undefined;
    traceName?: string | undefined;
    additionalProperties?: {
        [k: string]: any | null;
    } | undefined;
};
/** @internal */
export type TraceConfig$Outbound = {
    generation_name?: string | undefined;
    parent_span_id?: string | undefined;
    span_name?: string | undefined;
    trace_id?: string | undefined;
    trace_name?: string | undefined;
    [additionalProperties: string]: unknown;
};
/** @internal */
export declare const TraceConfig$outboundSchema: z.ZodType<TraceConfig$Outbound, TraceConfig>;
export declare function traceConfigToJSON(traceConfig: TraceConfig): string;
//# sourceMappingURL=traceconfig.d.ts.map