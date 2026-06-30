import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type WebSearchDomainFilter = {
    allowedDomains?: Array<string> | null | undefined;
    excludedDomains?: Array<string> | null | undefined;
};
/** @internal */
export declare const WebSearchDomainFilter$inboundSchema: z.ZodType<WebSearchDomainFilter, unknown>;
/** @internal */
export type WebSearchDomainFilter$Outbound = {
    allowed_domains?: Array<string> | null | undefined;
    excluded_domains?: Array<string> | null | undefined;
};
/** @internal */
export declare const WebSearchDomainFilter$outboundSchema: z.ZodType<WebSearchDomainFilter$Outbound, WebSearchDomainFilter>;
export declare function webSearchDomainFilterToJSON(webSearchDomainFilter: WebSearchDomainFilter): string;
export declare function webSearchDomainFilterFromJSON(jsonString: string): SafeParseResult<WebSearchDomainFilter, SDKValidationError>;
//# sourceMappingURL=websearchdomainfilter.d.ts.map