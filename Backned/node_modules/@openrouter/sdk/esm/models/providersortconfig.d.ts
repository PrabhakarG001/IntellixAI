import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * The provider sorting strategy (price, throughput, latency)
 */
export declare const By: {
    readonly Price: "price";
    readonly Throughput: "throughput";
    readonly Latency: "latency";
    readonly Exacto: "exacto";
};
/**
 * The provider sorting strategy (price, throughput, latency)
 */
export type By = OpenEnum<typeof By>;
/**
 * Partitioning strategy for sorting: "model" (default) groups endpoints by model before sorting (fallback models remain fallbacks), "none" sorts all endpoints together regardless of model.
 */
export declare const Partition: {
    readonly Model: "model";
    readonly None: "none";
};
/**
 * Partitioning strategy for sorting: "model" (default) groups endpoints by model before sorting (fallback models remain fallbacks), "none" sorts all endpoints together regardless of model.
 */
export type Partition = OpenEnum<typeof Partition>;
/**
 * The provider sorting strategy (price, throughput, latency)
 */
export type ProviderSortConfig = {
    /**
     * The provider sorting strategy (price, throughput, latency)
     */
    by?: By | null | undefined;
    /**
     * Partitioning strategy for sorting: "model" (default) groups endpoints by model before sorting (fallback models remain fallbacks), "none" sorts all endpoints together regardless of model.
     */
    partition?: Partition | null | undefined;
};
/** @internal */
export declare const By$outboundSchema: z.ZodType<string, By>;
/** @internal */
export declare const Partition$outboundSchema: z.ZodType<string, Partition>;
/** @internal */
export type ProviderSortConfig$Outbound = {
    by?: string | null | undefined;
    partition?: string | null | undefined;
};
/** @internal */
export declare const ProviderSortConfig$outboundSchema: z.ZodType<ProviderSortConfig$Outbound, ProviderSortConfig>;
export declare function providerSortConfigToJSON(providerSortConfig: ProviderSortConfig): string;
//# sourceMappingURL=providersortconfig.d.ts.map