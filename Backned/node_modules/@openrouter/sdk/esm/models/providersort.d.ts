import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * The provider sorting strategy (price, throughput, latency)
 */
export declare const ProviderSort: {
    readonly Price: "price";
    readonly Throughput: "throughput";
    readonly Latency: "latency";
    readonly Exacto: "exacto";
};
/**
 * The provider sorting strategy (price, throughput, latency)
 */
export type ProviderSort = OpenEnum<typeof ProviderSort>;
/** @internal */
export declare const ProviderSort$outboundSchema: z.ZodType<string, ProviderSort>;
//# sourceMappingURL=providersort.d.ts.map