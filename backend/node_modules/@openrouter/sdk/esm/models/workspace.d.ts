import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type Workspace = {
    /**
     * ISO 8601 timestamp of when the workspace was created
     */
    createdAt: string;
    /**
     * User ID of the workspace creator
     */
    createdBy: string | null;
    /**
     * Default image model for this workspace
     */
    defaultImageModel: string | null;
    /**
     * Default provider sort preference (price, throughput, latency, exacto)
     */
    defaultProviderSort: string | null;
    /**
     * Default text model for this workspace
     */
    defaultTextModel: string | null;
    /**
     * Description of the workspace
     */
    description: string | null;
    /**
     * Unique identifier for the workspace
     */
    id: string;
    /**
     * Optional array of API key IDs to filter I/O logging. Null means all keys are logged.
     */
    ioLoggingApiKeyIds: Array<number> | null;
    /**
     * Sampling rate for I/O logging (0.0001-1). 1 means 100% of requests are logged.
     */
    ioLoggingSamplingRate: number;
    /**
     * Whether data discount logging is enabled for this workspace
     */
    isDataDiscountLoggingEnabled: boolean;
    /**
     * Whether broadcast is enabled for this workspace
     */
    isObservabilityBroadcastEnabled: boolean;
    /**
     * Whether private logging is enabled for this workspace
     */
    isObservabilityIoLoggingEnabled: boolean;
    /**
     * Name of the workspace
     */
    name: string;
    /**
     * URL-friendly slug for the workspace
     */
    slug: string;
    /**
     * ISO 8601 timestamp of when the workspace was last updated
     */
    updatedAt: string | null;
};
/** @internal */
export declare const Workspace$inboundSchema: z.ZodType<Workspace, unknown>;
export declare function workspaceFromJSON(jsonString: string): SafeParseResult<Workspace, SDKValidationError>;
//# sourceMappingURL=workspace.d.ts.map