import * as z from "zod/v4";
import { OpenEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
export type ListOrganizationMembersGlobals = {
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
export type ListOrganizationMembersRequest = {
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
     * Number of records to skip for pagination
     */
    offset?: number | null | undefined;
    /**
     * Maximum number of records to return (max 100)
     */
    limit?: number | undefined;
};
/**
 * Role of the member in the organization
 */
export declare const Role: {
    readonly OrgAdmin: "org:admin";
    readonly OrgMember: "org:member";
};
/**
 * Role of the member in the organization
 */
export type Role = OpenEnum<typeof Role>;
export type ListOrganizationMembersData = {
    /**
     * Email address of the member
     */
    email: string;
    /**
     * First name of the member
     */
    firstName: string | null;
    /**
     * User ID of the organization member
     */
    id: string;
    /**
     * Last name of the member
     */
    lastName: string | null;
    /**
     * Role of the member in the organization
     */
    role: Role;
};
/**
 * List of organization members
 */
export type ListOrganizationMembersResponseBody = {
    /**
     * List of organization members
     */
    data: Array<ListOrganizationMembersData>;
    /**
     * Total number of members in the organization
     */
    totalCount: number;
};
export type ListOrganizationMembersResponse = {
    result: ListOrganizationMembersResponseBody;
};
/** @internal */
export type ListOrganizationMembersRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    offset?: number | null | undefined;
    limit?: number | undefined;
};
/** @internal */
export declare const ListOrganizationMembersRequest$outboundSchema: z.ZodType<ListOrganizationMembersRequest$Outbound, ListOrganizationMembersRequest>;
export declare function listOrganizationMembersRequestToJSON(listOrganizationMembersRequest: ListOrganizationMembersRequest): string;
/** @internal */
export declare const Role$inboundSchema: z.ZodType<Role, unknown>;
/** @internal */
export declare const ListOrganizationMembersData$inboundSchema: z.ZodType<ListOrganizationMembersData, unknown>;
export declare function listOrganizationMembersDataFromJSON(jsonString: string): SafeParseResult<ListOrganizationMembersData, SDKValidationError>;
/** @internal */
export declare const ListOrganizationMembersResponseBody$inboundSchema: z.ZodType<ListOrganizationMembersResponseBody, unknown>;
export declare function listOrganizationMembersResponseBodyFromJSON(jsonString: string): SafeParseResult<ListOrganizationMembersResponseBody, SDKValidationError>;
/** @internal */
export declare const ListOrganizationMembersResponse$inboundSchema: z.ZodType<ListOrganizationMembersResponse, unknown>;
export declare function listOrganizationMembersResponseFromJSON(jsonString: string): SafeParseResult<ListOrganizationMembersResponse, SDKValidationError>;
//# sourceMappingURL=listorganizationmembers.d.ts.map