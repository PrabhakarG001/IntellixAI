import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const AnthropicCacheControlTtl: {
    readonly Fivem: "5m";
    readonly Oneh: "1h";
};
export type AnthropicCacheControlTtl = OpenEnum<typeof AnthropicCacheControlTtl>;
/** @internal */
export declare const AnthropicCacheControlTtl$inboundSchema: z.ZodType<AnthropicCacheControlTtl, unknown>;
/** @internal */
export declare const AnthropicCacheControlTtl$outboundSchema: z.ZodType<string, AnthropicCacheControlTtl>;
//# sourceMappingURL=anthropiccachecontrolttl.d.ts.map