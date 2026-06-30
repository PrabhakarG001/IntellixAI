import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ContentFilterAction } from "./contentfilteraction.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * A custom regex content filter that scans request messages for matching patterns.
 */
export type ContentFilterEntry = {
    /**
     * Action taken when the pattern matches
     */
    action: ContentFilterAction;
    /**
     * Optional label used in redaction placeholders or error messages
     */
    label?: string | null | undefined;
    /**
     * A regex pattern to match against request content
     */
    pattern: string;
};
/** @internal */
export declare const ContentFilterEntry$inboundSchema: z.ZodType<ContentFilterEntry, unknown>;
/** @internal */
export type ContentFilterEntry$Outbound = {
    action: string;
    label?: string | null | undefined;
    pattern: string;
};
/** @internal */
export declare const ContentFilterEntry$outboundSchema: z.ZodType<ContentFilterEntry$Outbound, ContentFilterEntry>;
export declare function contentFilterEntryToJSON(contentFilterEntry: ContentFilterEntry): string;
export declare function contentFilterEntryFromJSON(jsonString: string): SafeParseResult<ContentFilterEntry, SDKValidationError>;
//# sourceMappingURL=contentfilterentry.d.ts.map