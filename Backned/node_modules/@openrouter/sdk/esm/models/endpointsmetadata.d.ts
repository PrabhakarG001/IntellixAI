import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { EndpointInfo } from "./endpointinfo.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type EndpointsMetadata = {
    available: Array<EndpointInfo>;
    total: number;
};
/** @internal */
export declare const EndpointsMetadata$inboundSchema: z.ZodType<EndpointsMetadata, unknown>;
export declare function endpointsMetadataFromJSON(jsonString: string): SafeParseResult<EndpointsMetadata, SDKValidationError>;
//# sourceMappingURL=endpointsmetadata.d.ts.map