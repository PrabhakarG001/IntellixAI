import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { EndpointsMetadata } from "./endpointsmetadata.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { PipelineStage } from "./pipelinestage.js";
import { RouterAttempt } from "./routerattempt.js";
import { RouterParams } from "./routerparams.js";
import { RoutingStrategy } from "./routingstrategy.js";
export type OpenRouterMetadata = {
    attempt: number;
    attempts?: Array<RouterAttempt> | undefined;
    endpoints: EndpointsMetadata;
    isByok: boolean;
    params?: RouterParams | undefined;
    pipeline?: Array<PipelineStage> | undefined;
    region: string | null;
    requested: string;
    strategy: RoutingStrategy;
    summary: string;
};
/** @internal */
export declare const OpenRouterMetadata$inboundSchema: z.ZodType<OpenRouterMetadata, unknown>;
export declare function openRouterMetadataFromJSON(jsonString: string): SafeParseResult<OpenRouterMetadata, SDKValidationError>;
//# sourceMappingURL=openroutermetadata.d.ts.map