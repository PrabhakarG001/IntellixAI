import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * Action taken when the pattern matches
 */
export declare const ContentFilterAction: {
    readonly Redact: "redact";
    readonly Block: "block";
};
/**
 * Action taken when the pattern matches
 */
export type ContentFilterAction = OpenEnum<typeof ContentFilterAction>;
/** @internal */
export declare const ContentFilterAction$inboundSchema: z.ZodType<ContentFilterAction, unknown>;
/** @internal */
export declare const ContentFilterAction$outboundSchema: z.ZodType<string, ContentFilterAction>;
//# sourceMappingURL=contentfilteraction.d.ts.map