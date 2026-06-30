import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { VideoModel } from "./videomodel.js";
export type VideoModelsListResponse = {
    data: Array<VideoModel>;
};
/** @internal */
export declare const VideoModelsListResponse$inboundSchema: z.ZodType<VideoModelsListResponse, unknown>;
export declare function videoModelsListResponseFromJSON(jsonString: string): SafeParseResult<VideoModelsListResponse, SDKValidationError>;
//# sourceMappingURL=videomodelslistresponse.d.ts.map