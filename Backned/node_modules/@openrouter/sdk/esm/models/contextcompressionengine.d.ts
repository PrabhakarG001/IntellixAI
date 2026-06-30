import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
/**
 * The compression engine to use. Defaults to "middle-out".
 */
export declare const ContextCompressionEngine: {
    readonly MiddleOut: "middle-out";
};
/**
 * The compression engine to use. Defaults to "middle-out".
 */
export type ContextCompressionEngine = ClosedEnum<typeof ContextCompressionEngine>;
/** @internal */
export declare const ContextCompressionEngine$outboundSchema: z.ZodEnum<typeof ContextCompressionEngine>;
//# sourceMappingURL=contextcompressionengine.d.ts.map