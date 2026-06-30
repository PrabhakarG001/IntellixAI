import * as z from "zod/v4";
export type ParetoRouterPlugin = {
    /**
     * Set to false to disable the pareto-router plugin for this request. Defaults to true.
     */
    enabled?: boolean | undefined;
    id: "pareto-router";
    /**
     * Minimum desired coding score between 0 and 1, where 1 is best. Higher values select from stronger coding models (sourced from Artificial Analysis coding percentiles). Maps internally to one of three tiers (low, medium, high). Omit to use the router default tier.
     */
    minCodingScore?: number | undefined;
};
/** @internal */
export type ParetoRouterPlugin$Outbound = {
    enabled?: boolean | undefined;
    id: "pareto-router";
    min_coding_score?: number | undefined;
};
/** @internal */
export declare const ParetoRouterPlugin$outboundSchema: z.ZodType<ParetoRouterPlugin$Outbound, ParetoRouterPlugin>;
export declare function paretoRouterPluginToJSON(paretoRouterPlugin: ParetoRouterPlugin): string;
//# sourceMappingURL=paretorouterplugin.d.ts.map