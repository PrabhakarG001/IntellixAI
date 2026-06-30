import * as z from "zod/v4";
export type GetUserActivityGlobals = {
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
export type GetUserActivityRequest = {
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
     * Filter by a single UTC date in the last 30 days (YYYY-MM-DD format).
     */
    date?: string | undefined;
    /**
     * Filter by API key hash (SHA-256 hex string, as returned by the keys API).
     */
    apiKeyHash?: string | undefined;
    /**
     * Filter by org member user ID. Only applicable for organization accounts.
     */
    userId?: string | undefined;
};
/** @internal */
export type GetUserActivityRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    date?: string | undefined;
    api_key_hash?: string | undefined;
    user_id?: string | undefined;
};
/** @internal */
export declare const GetUserActivityRequest$outboundSchema: z.ZodType<GetUserActivityRequest$Outbound, GetUserActivityRequest>;
export declare function getUserActivityRequestToJSON(getUserActivityRequest: GetUserActivityRequest): string;
//# sourceMappingURL=getuseractivity.d.ts.map