import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type ActivityItem = {
    /**
     * BYOK inference cost in USD (external credits spent)
     */
    byokUsageInference: number;
    /**
     * Total completion tokens generated
     */
    completionTokens: number;
    /**
     * Date of the activity (YYYY-MM-DD format)
     */
    date: string;
    /**
     * Unique identifier for the endpoint
     */
    endpointId: string;
    /**
     * Model slug (e.g., "openai/gpt-4.1")
     */
    model: string;
    /**
     * Model permaslug (e.g., "openai/gpt-4.1-2025-04-14")
     */
    modelPermaslug: string;
    /**
     * Total prompt tokens used
     */
    promptTokens: number;
    /**
     * Name of the provider serving this endpoint
     */
    providerName: string;
    /**
     * Total reasoning tokens used
     */
    reasoningTokens: number;
    /**
     * Number of requests made
     */
    requests: number;
    /**
     * Total cost in USD (OpenRouter credits spent)
     */
    usage: number;
};
/** @internal */
export declare const ActivityItem$inboundSchema: z.ZodType<ActivityItem, unknown>;
export declare function activityItemFromJSON(jsonString: string): SafeParseResult<ActivityItem, SDKValidationError>;
//# sourceMappingURL=activityitem.d.ts.map