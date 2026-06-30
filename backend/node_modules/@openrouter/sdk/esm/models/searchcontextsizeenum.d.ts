import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * Size of the search context for web search tools
 */
export declare const SearchContextSizeEnum: {
    readonly Low: "low";
    readonly Medium: "medium";
    readonly High: "high";
};
/**
 * Size of the search context for web search tools
 */
export type SearchContextSizeEnum = OpenEnum<typeof SearchContextSizeEnum>;
/** @internal */
export declare const SearchContextSizeEnum$inboundSchema: z.ZodType<SearchContextSizeEnum, unknown>;
/** @internal */
export declare const SearchContextSizeEnum$outboundSchema: z.ZodType<string, SearchContextSizeEnum>;
//# sourceMappingURL=searchcontextsizeenum.d.ts.map