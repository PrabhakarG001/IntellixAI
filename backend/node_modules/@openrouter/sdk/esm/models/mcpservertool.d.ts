import * as z from "zod/v4";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type AllowedTools = {
    readOnly?: boolean | undefined;
    toolNames?: Array<string> | undefined;
};
export type AllowedToolsUnion = Array<string> | AllowedTools | any;
export declare const ConnectorId: {
    readonly ConnectorDropbox: "connector_dropbox";
    readonly ConnectorGmail: "connector_gmail";
    readonly ConnectorGooglecalendar: "connector_googlecalendar";
    readonly ConnectorGoogledrive: "connector_googledrive";
    readonly ConnectorMicrosoftteams: "connector_microsoftteams";
    readonly ConnectorOutlookcalendar: "connector_outlookcalendar";
    readonly ConnectorOutlookemail: "connector_outlookemail";
    readonly ConnectorSharepoint: "connector_sharepoint";
};
export type ConnectorId = OpenEnum<typeof ConnectorId>;
export declare const RequireApprovalNever: {
    readonly Never: "never";
};
export type RequireApprovalNever = ClosedEnum<typeof RequireApprovalNever>;
export declare const RequireApprovalAlways: {
    readonly Always: "always";
};
export type RequireApprovalAlways = ClosedEnum<typeof RequireApprovalAlways>;
export type Always = {
    toolNames?: Array<string> | undefined;
};
export type Never = {
    toolNames?: Array<string> | undefined;
};
export type RequireApproval = {
    always?: Always | undefined;
    never?: Never | undefined;
};
export type RequireApprovalUnion = RequireApproval | RequireApprovalAlways | RequireApprovalNever | any;
/**
 * MCP (Model Context Protocol) tool configuration
 */
export type McpServerTool = {
    allowedTools?: Array<string> | AllowedTools | any | null | undefined;
    authorization?: string | undefined;
    connectorId?: ConnectorId | undefined;
    headers?: {
        [k: string]: string;
    } | null | undefined;
    requireApproval?: RequireApproval | RequireApprovalAlways | RequireApprovalNever | any | null | undefined;
    serverDescription?: string | undefined;
    serverLabel: string;
    serverUrl?: string | undefined;
    type: "mcp";
};
/** @internal */
export declare const AllowedTools$inboundSchema: z.ZodType<AllowedTools, unknown>;
/** @internal */
export type AllowedTools$Outbound = {
    read_only?: boolean | undefined;
    tool_names?: Array<string> | undefined;
};
/** @internal */
export declare const AllowedTools$outboundSchema: z.ZodType<AllowedTools$Outbound, AllowedTools>;
export declare function allowedToolsToJSON(allowedTools: AllowedTools): string;
export declare function allowedToolsFromJSON(jsonString: string): SafeParseResult<AllowedTools, SDKValidationError>;
/** @internal */
export declare const AllowedToolsUnion$inboundSchema: z.ZodType<AllowedToolsUnion, unknown>;
/** @internal */
export type AllowedToolsUnion$Outbound = Array<string> | AllowedTools$Outbound | any;
/** @internal */
export declare const AllowedToolsUnion$outboundSchema: z.ZodType<AllowedToolsUnion$Outbound, AllowedToolsUnion>;
export declare function allowedToolsUnionToJSON(allowedToolsUnion: AllowedToolsUnion): string;
export declare function allowedToolsUnionFromJSON(jsonString: string): SafeParseResult<AllowedToolsUnion, SDKValidationError>;
/** @internal */
export declare const ConnectorId$inboundSchema: z.ZodType<ConnectorId, unknown>;
/** @internal */
export declare const ConnectorId$outboundSchema: z.ZodType<string, ConnectorId>;
/** @internal */
export declare const RequireApprovalNever$inboundSchema: z.ZodEnum<typeof RequireApprovalNever>;
/** @internal */
export declare const RequireApprovalNever$outboundSchema: z.ZodEnum<typeof RequireApprovalNever>;
/** @internal */
export declare const RequireApprovalAlways$inboundSchema: z.ZodEnum<typeof RequireApprovalAlways>;
/** @internal */
export declare const RequireApprovalAlways$outboundSchema: z.ZodEnum<typeof RequireApprovalAlways>;
/** @internal */
export declare const Always$inboundSchema: z.ZodType<Always, unknown>;
/** @internal */
export type Always$Outbound = {
    tool_names?: Array<string> | undefined;
};
/** @internal */
export declare const Always$outboundSchema: z.ZodType<Always$Outbound, Always>;
export declare function alwaysToJSON(always: Always): string;
export declare function alwaysFromJSON(jsonString: string): SafeParseResult<Always, SDKValidationError>;
/** @internal */
export declare const Never$inboundSchema: z.ZodType<Never, unknown>;
/** @internal */
export type Never$Outbound = {
    tool_names?: Array<string> | undefined;
};
/** @internal */
export declare const Never$outboundSchema: z.ZodType<Never$Outbound, Never>;
export declare function neverToJSON(never: Never): string;
export declare function neverFromJSON(jsonString: string): SafeParseResult<Never, SDKValidationError>;
/** @internal */
export declare const RequireApproval$inboundSchema: z.ZodType<RequireApproval, unknown>;
/** @internal */
export type RequireApproval$Outbound = {
    always?: Always$Outbound | undefined;
    never?: Never$Outbound | undefined;
};
/** @internal */
export declare const RequireApproval$outboundSchema: z.ZodType<RequireApproval$Outbound, RequireApproval>;
export declare function requireApprovalToJSON(requireApproval: RequireApproval): string;
export declare function requireApprovalFromJSON(jsonString: string): SafeParseResult<RequireApproval, SDKValidationError>;
/** @internal */
export declare const RequireApprovalUnion$inboundSchema: z.ZodType<RequireApprovalUnion, unknown>;
/** @internal */
export type RequireApprovalUnion$Outbound = RequireApproval$Outbound | string | string | any;
/** @internal */
export declare const RequireApprovalUnion$outboundSchema: z.ZodType<RequireApprovalUnion$Outbound, RequireApprovalUnion>;
export declare function requireApprovalUnionToJSON(requireApprovalUnion: RequireApprovalUnion): string;
export declare function requireApprovalUnionFromJSON(jsonString: string): SafeParseResult<RequireApprovalUnion, SDKValidationError>;
/** @internal */
export declare const McpServerTool$inboundSchema: z.ZodType<McpServerTool, unknown>;
/** @internal */
export type McpServerTool$Outbound = {
    allowed_tools?: Array<string> | AllowedTools$Outbound | any | null | undefined;
    authorization?: string | undefined;
    connector_id?: string | undefined;
    headers?: {
        [k: string]: string;
    } | null | undefined;
    require_approval?: RequireApproval$Outbound | string | string | any | null | undefined;
    server_description?: string | undefined;
    server_label: string;
    server_url?: string | undefined;
    type: "mcp";
};
/** @internal */
export declare const McpServerTool$outboundSchema: z.ZodType<McpServerTool$Outbound, McpServerTool>;
export declare function mcpServerToolToJSON(mcpServerTool: McpServerTool): string;
export declare function mcpServerToolFromJSON(jsonString: string): SafeParseResult<McpServerTool, SDKValidationError>;
//# sourceMappingURL=mcpservertool.d.ts.map