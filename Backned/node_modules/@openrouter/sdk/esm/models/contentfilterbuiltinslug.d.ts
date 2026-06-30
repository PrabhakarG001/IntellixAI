import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * The builtin filter identifier
 */
export declare const ContentFilterBuiltinSlug: {
    readonly Email: "email";
    readonly Phone: "phone";
    readonly Ssn: "ssn";
    readonly CreditCard: "credit-card";
    readonly IpAddress: "ip-address";
    readonly PersonName: "person-name";
    readonly Address: "address";
    readonly RegexPromptInjection: "regex-prompt-injection";
};
/**
 * The builtin filter identifier
 */
export type ContentFilterBuiltinSlug = OpenEnum<typeof ContentFilterBuiltinSlug>;
/** @internal */
export declare const ContentFilterBuiltinSlug$inboundSchema: z.ZodType<ContentFilterBuiltinSlug, unknown>;
/** @internal */
export declare const ContentFilterBuiltinSlug$outboundSchema: z.ZodType<string, ContentFilterBuiltinSlug>;
//# sourceMappingURL=contentfilterbuiltinslug.d.ts.map