import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * Categorical kind of a pipeline stage. Multiple plugins can share a type (e.g. all guardrail-level plugins emit `guardrail`); the `name` field disambiguates which plugin emitted it.
 */
export declare const PipelineStageType: {
    readonly Guardrail: "guardrail";
    readonly Plugin: "plugin";
    readonly ServerTools: "server_tools";
    readonly ResponseHealing: "response_healing";
    readonly ContextCompression: "context_compression";
};
/**
 * Categorical kind of a pipeline stage. Multiple plugins can share a type (e.g. all guardrail-level plugins emit `guardrail`); the `name` field disambiguates which plugin emitted it.
 */
export type PipelineStageType = OpenEnum<typeof PipelineStageType>;
/** @internal */
export declare const PipelineStageType$inboundSchema: z.ZodType<PipelineStageType, unknown>;
//# sourceMappingURL=pipelinestagetype.d.ts.map