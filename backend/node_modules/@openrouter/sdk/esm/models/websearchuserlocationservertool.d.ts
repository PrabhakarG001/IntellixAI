import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
export declare const WebSearchUserLocationServerToolType: {
    readonly Approximate: "approximate";
};
export type WebSearchUserLocationServerToolType = ClosedEnum<typeof WebSearchUserLocationServerToolType>;
/**
 * Approximate user location for location-biased results.
 */
export type WebSearchUserLocationServerTool = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type?: WebSearchUserLocationServerToolType | undefined;
};
/** @internal */
export declare const WebSearchUserLocationServerToolType$outboundSchema: z.ZodEnum<typeof WebSearchUserLocationServerToolType>;
/** @internal */
export type WebSearchUserLocationServerTool$Outbound = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type?: string | undefined;
};
/** @internal */
export declare const WebSearchUserLocationServerTool$outboundSchema: z.ZodType<WebSearchUserLocationServerTool$Outbound, WebSearchUserLocationServerTool>;
export declare function webSearchUserLocationServerToolToJSON(webSearchUserLocationServerTool: WebSearchUserLocationServerTool): string;
//# sourceMappingURL=websearchuserlocationservertool.d.ts.map