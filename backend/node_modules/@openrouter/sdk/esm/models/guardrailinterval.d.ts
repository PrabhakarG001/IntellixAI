import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * Interval at which the limit resets (daily, weekly, monthly)
 */
export declare const GuardrailInterval: {
    readonly Daily: "daily";
    readonly Weekly: "weekly";
    readonly Monthly: "monthly";
};
/**
 * Interval at which the limit resets (daily, weekly, monthly)
 */
export type GuardrailInterval = OpenEnum<typeof GuardrailInterval>;
/** @internal */
export declare const GuardrailInterval$inboundSchema: z.ZodType<GuardrailInterval, unknown>;
/** @internal */
export declare const GuardrailInterval$outboundSchema: z.ZodType<string, GuardrailInterval>;
//# sourceMappingURL=guardrailinterval.d.ts.map