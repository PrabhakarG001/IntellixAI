import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export declare const PreviewWebSearchUserLocationType: {
    readonly Approximate: "approximate";
};
export type PreviewWebSearchUserLocationType = ClosedEnum<typeof PreviewWebSearchUserLocationType>;
export type PreviewWebSearchUserLocation = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type: PreviewWebSearchUserLocationType;
};
/** @internal */
export declare const PreviewWebSearchUserLocationType$inboundSchema: z.ZodEnum<typeof PreviewWebSearchUserLocationType>;
/** @internal */
export declare const PreviewWebSearchUserLocationType$outboundSchema: z.ZodEnum<typeof PreviewWebSearchUserLocationType>;
/** @internal */
export declare const PreviewWebSearchUserLocation$inboundSchema: z.ZodType<PreviewWebSearchUserLocation, unknown>;
/** @internal */
export type PreviewWebSearchUserLocation$Outbound = {
    city?: string | null | undefined;
    country?: string | null | undefined;
    region?: string | null | undefined;
    timezone?: string | null | undefined;
    type: string;
};
/** @internal */
export declare const PreviewWebSearchUserLocation$outboundSchema: z.ZodType<PreviewWebSearchUserLocation$Outbound, PreviewWebSearchUserLocation>;
export declare function previewWebSearchUserLocationToJSON(previewWebSearchUserLocation: PreviewWebSearchUserLocation): string;
export declare function previewWebSearchUserLocationFromJSON(jsonString: string): SafeParseResult<PreviewWebSearchUserLocation, SDKValidationError>;
//# sourceMappingURL=previewwebsearchuserlocation.d.ts.map