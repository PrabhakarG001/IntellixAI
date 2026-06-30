import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const WebSearchUserLocationType: {
    readonly Approximate: "approximate";
};
export type WebSearchUserLocationType = ClosedEnum<typeof WebSearchUserLocationType>;
/**
 * User location information for web search
 */
export type WebSearchUserLocation = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type?: WebSearchUserLocationType | undefined;
};
/** @internal */
export declare const WebSearchUserLocationType$inboundSchema: z.ZodEnum<typeof WebSearchUserLocationType>;
/** @internal */
export declare const WebSearchUserLocationType$outboundSchema: z.ZodEnum<typeof WebSearchUserLocationType>;
/** @internal */
export declare const WebSearchUserLocation$inboundSchema: z.ZodType<WebSearchUserLocation, unknown>;
/** @internal */
export type WebSearchUserLocation$Outbound = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type?: string | undefined;
};
/** @internal */
export declare const WebSearchUserLocation$outboundSchema: z.ZodType<WebSearchUserLocation$Outbound, WebSearchUserLocation>;
export declare function webSearchUserLocationToJSON(webSearchUserLocation: WebSearchUserLocation): string;
export declare function webSearchUserLocationFromJSON(jsonString: string): SafeParseResult<WebSearchUserLocation, SDKValidationError>;
//# sourceMappingURL=websearchuserlocation.d.ts.map