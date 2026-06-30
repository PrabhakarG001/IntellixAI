import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type RouterParams = {
    qualityFloor?: number | undefined;
    throughputFloor?: number | undefined;
    versionGroup?: string | undefined;
    additionalProperties?: {
        [k: string]: any | null;
    } | undefined;
};
/** @internal */
export declare const RouterParams$inboundSchema: z.ZodType<RouterParams, unknown>;
export declare function routerParamsFromJSON(jsonString: string): SafeParseResult<RouterParams, SDKValidationError>;
//# sourceMappingURL=routerparams.d.ts.map