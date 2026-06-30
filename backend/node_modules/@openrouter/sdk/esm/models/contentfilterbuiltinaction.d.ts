import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * Action taken when the builtin filter triggers
 */
export declare const ContentFilterBuiltinAction: {
    readonly Redact: "redact";
    readonly Block: "block";
    readonly Flag: "flag";
};
/**
 * Action taken when the builtin filter triggers
 */
export type ContentFilterBuiltinAction = OpenEnum<typeof ContentFilterBuiltinAction>;
/** @internal */
export declare const ContentFilterBuiltinAction$inboundSchema: z.ZodType<ContentFilterBuiltinAction, unknown>;
/** @internal */
export declare const ContentFilterBuiltinAction$outboundSchema: z.ZodType<string, ContentFilterBuiltinAction>;
//# sourceMappingURL=contentfilterbuiltinaction.d.ts.map