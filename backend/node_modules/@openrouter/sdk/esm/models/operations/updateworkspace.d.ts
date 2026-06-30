import * as z from "zod/v4";
import * as models from "../index.js";
export type UpdateWorkspaceGlobals = {
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
export type UpdateWorkspaceRequest = {
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
    updateWorkspaceRequest: models.UpdateWorkspaceRequest;
};
/** @internal */
export type UpdateWorkspaceRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    id: string;
    UpdateWorkspaceRequest: models.UpdateWorkspaceRequest$Outbound;
};
/** @internal */
export declare const UpdateWorkspaceRequest$outboundSchema: z.ZodType<UpdateWorkspaceRequest$Outbound, UpdateWorkspaceRequest>;
export declare function updateWorkspaceRequestToJSON(updateWorkspaceRequest: UpdateWorkspaceRequest): string;
//# sourceMappingURL=updateworkspace.d.ts.map