import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
export declare class VideoGeneration extends ClientSDK {
    /**
     * Submit a video generation request
     *
     * @remarks
     * Submits a video generation request and returns a polling URL to check status
     */
    generate(request: operations.CreateVideosRequest, options?: RequestOptions): Promise<models.VideoGenerationResponse>;
    /**
     * Poll video generation status
     *
     * @remarks
     * Returns job status and content URLs when completed
     */
    getGeneration(request: operations.GetVideosRequest, options?: RequestOptions): Promise<models.VideoGenerationResponse>;
    /**
     * Download generated video content
     *
     * @remarks
     * Streams the generated video content from the upstream provider
     */
    getVideoContent(request: operations.ListVideosContentRequest, options?: RequestOptions): Promise<ReadableStream<Uint8Array>>;
    /**
     * List all video generation models
     *
     * @remarks
     * Returns a list of all available video generation models and their properties
     */
    listVideosModels(request?: operations.ListVideosModelsRequest | undefined, options?: RequestOptions): Promise<models.VideoModelsListResponse>;
}
//# sourceMappingURL=videogeneration.d.ts.map