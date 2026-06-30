import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { VideoGenerationUsage } from "./videogenerationusage.js";
export declare const VideoGenerationResponseStatus: {
    readonly Pending: "pending";
    readonly InProgress: "in_progress";
    readonly Completed: "completed";
    readonly Failed: "failed";
    readonly Cancelled: "cancelled";
    readonly Expired: "expired";
};
export type VideoGenerationResponseStatus = OpenEnum<typeof VideoGenerationResponseStatus>;
export type VideoGenerationResponse = {
    error?: string | undefined;
    /**
     * The generation ID associated with this video generation job. Available once the job has been processed.
     */
    generationId?: string | undefined;
    id: string;
    pollingUrl: string;
    status: VideoGenerationResponseStatus;
    unsignedUrls?: Array<string> | undefined;
    /**
     * Usage and cost information for the video generation. Available once the job has completed.
     */
    usage?: VideoGenerationUsage | undefined;
};
/** @internal */
export declare const VideoGenerationResponseStatus$inboundSchema: z.ZodType<VideoGenerationResponseStatus, unknown>;
/** @internal */
export declare const VideoGenerationResponse$inboundSchema: z.ZodType<VideoGenerationResponse, unknown>;
export declare function videoGenerationResponseFromJSON(jsonString: string): SafeParseResult<VideoGenerationResponse, SDKValidationError>;
//# sourceMappingURL=videogenerationresponse.d.ts.map