import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Usage and cost information for the video generation. Available once the job has completed.
 */
export type VideoGenerationUsage = {
    /**
     * The cost of the video generation in USD.
     */
    cost?: number | null | undefined;
    /**
     * Whether the request was made using a Bring Your Own Key configuration.
     */
    isByok?: boolean | undefined;
};
/** @internal */
export declare const VideoGenerationUsage$inboundSchema: z.ZodType<VideoGenerationUsage, unknown>;
export declare function videoGenerationUsageFromJSON(jsonString: string): SafeParseResult<VideoGenerationUsage, SDKValidationError>;
//# sourceMappingURL=videogenerationusage.d.ts.map