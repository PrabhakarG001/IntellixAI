import * as z from "zod/v4";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";
export type ListEndpointsGlobals = {
    /**
     * The app identifier should be your app's URL and is used as the primary identifier for rankings.
     *
     * @remarks
     * This is used to track API usage per application.
     */
    httpReferer?: string | undefined;
    /**
     * The app display name allows you to customize how your app appears in OpenRouter's dashboard.
     *
     * @remarks
     */
    appTitle?: string | undefined;
    /**
     * Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.
     *
     * @remarks
     */
    appCategories?: string | undefined;
};
export type ListEndpointsRequest = {
    /**
     * The app identifier should be your app's URL and is used as the primary identifier for rankings.
     *
     * @remarks
     * This is used to track API usage per application.
     */
    httpReferer?: string | undefined;
    /**
     * The app display name allows you to customize how your app appears in OpenRouter's dashboard.
     *
     * @remarks
     */
    appTitle?: string | undefined;
    /**
     * Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.
     *
     * @remarks
     */
    appCategories?: string | undefined;
    /**
     * The author/organization of the model
     */
    author: string;
    /**
     * The model slug
     */
    slug: string;
};
/**
 * Returns a list of endpoints
 */
export type ListEndpointsResponse = {
    /**
     * List of available endpoints for a model
     */
    data: models.ListEndpointsResponse;
};
/** @internal */
export type ListEndpointsRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    author: string;
    slug: string;
};
/** @internal */
export declare const ListEndpointsRequest$outboundSchema: z.ZodType<ListEndpointsRequest$Outbound, ListEndpointsRequest>;
export declare function listEndpointsRequestToJSON(listEndpointsRequest: ListEndpointsRequest): string;
/** @internal */
export declare const ListEndpointsResponse$inboundSchema: z.ZodType<ListEndpointsResponse, unknown>;
export declare function listEndpointsResponseFromJSON(jsonString: string): SafeParseResult<ListEndpointsResponse, SDKValidationError>;
//# sourceMappingURL=listendpoints.d.ts.map