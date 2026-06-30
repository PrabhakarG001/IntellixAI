import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type EndpointInfo = {
    model: string;
    provider: string;
    selected: boolean;
};
/** @internal */
export declare const EndpointInfo$inboundSchema: z.ZodType<EndpointInfo, unknown>;
export declare function endpointInfoFromJSON(jsonString: string): SafeParseResult<EndpointInfo, SDKValidationError>;
//# sourceMappingURL=endpointinfo.d.ts.map