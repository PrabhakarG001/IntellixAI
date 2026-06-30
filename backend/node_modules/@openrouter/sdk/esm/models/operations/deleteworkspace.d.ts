import * as z from "zod/v4";
export type DeleteWorkspaceGlobals = {
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
export type DeleteWorkspaceRequest = {
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
};
/** @internal */
export type DeleteWorkspaceRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
};
/** @internal */
export declare const DeleteWorkspaceRequest$outboundSchema: z.ZodType<DeleteWorkspaceRequest$Outbound, DeleteWorkspaceRequest>;
export declare function deleteWorkspaceRequestToJSON(deleteWorkspaceRequest: DeleteWorkspaceRequest): string;
//# sourceMappingURL=deleteworkspace.d.ts.map