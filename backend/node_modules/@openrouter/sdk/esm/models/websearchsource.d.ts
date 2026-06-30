import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const WebSearchSourceType: {
    readonly Url: "url";
};
export type WebSearchSourceType = ClosedEnum<typeof WebSearchSourceType>;
export type WebSearchSource = {
    type: WebSearchSourceType;
    url: string;
};
/** @internal */
export declare const WebSearchSourceType$inboundSchema: z.ZodEnum<typeof WebSearchSourceType>;
/** @internal */
export declare const WebSearchSourceType$outboundSchema: z.ZodEnum<typeof WebSearchSourceType>;
/** @internal */
export declare const WebSearchSource$inboundSchema: z.ZodType<WebSearchSource, unknown>;
/** @internal */
export type WebSearchSource$Outbound = {
    type: string;
    url: string;
};
/** @internal */
export declare const WebSearchSource$outboundSchema: z.ZodType<WebSearchSource$Outbound, WebSearchSource>;
export declare function webSearchSourceToJSON(webSearchSource: WebSearchSource): string;
export declare function webSearchSourceFromJSON(jsonString: string): SafeParseResult<WebSearchSource, SDKValidationError>;
//# sourceMappingURL=websearchsource.d.ts.map