import * as z from "zod/v4";
import { ReasoningEffort } from "./reasoningeffort.js";
import { ReasoningSummaryVerbosity } from "./reasoningsummaryverbosity.js";
/**
 * Configuration for reasoning mode in the response
 */
export type ReasoningConfig = {
    effort?: ReasoningEffort | null | undefined;
    summary?: ReasoningSummaryVerbosity | null | undefined;
    enabled?: boolean | null | undefined;
    maxTokens?: number | null | undefined;
};
/** @internal */
export type ReasoningConfig$Outbound = {
    effort?: string | null | undefined;
    summary?: string | null | undefined;
    enabled?: boolean | null | undefined;
    max_tokens?: number | null | undefined;
};
/** @internal */
export declare const ReasoningConfig$outboundSchema: z.ZodType<ReasoningConfig$Outbound, ReasoningConfig>;
export declare function reasoningConfigToJSON(reasoningConfig: ReasoningConfig): string;
//# sourceMappingURL=reasoningconfig.d.ts.map