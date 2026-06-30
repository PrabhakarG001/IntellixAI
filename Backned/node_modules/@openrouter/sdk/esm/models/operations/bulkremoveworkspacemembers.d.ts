import * as z from "zod/v4";
import * as models from "../index.js";
export type BulkRemoveWorkspaceMembersGlobals = {
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
export type BulkRemoveWorkspaceMembersRequest = {
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
     * The workspace ID (UUID) or slug
     */
    id: string;
    bulkRemoveWorkspaceMembersRequest: models.BulkRemoveWorkspaceMembersRequest;
};
/** @internal */
export type BulkRemoveWorkspaceMembersRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
    BulkRemoveWorkspaceMembersRequest: models.BulkRemoveWorkspaceMembersRequest$Outbound;
};
/** @internal */
export declare const BulkRemoveWorkspaceMembersRequest$outboundSchema: z.ZodType<BulkRemoveWorkspaceMembersRequest$Outbound, BulkRemoveWorkspaceMembersRequest>;
export declare function bulkRemoveWorkspaceMembersRequestToJSON(bulkRemoveWorkspaceMembersRequest: BulkRemoveWorkspaceMembersRequest): string;
//# sourceMappingURL=bulkremoveworkspacemembers.d.ts.map