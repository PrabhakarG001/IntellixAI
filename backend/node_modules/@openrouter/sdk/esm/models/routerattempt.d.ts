import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type RouterAttempt = {
    model: string;
    provider: string;
    status: number;
};
/** @internal */
export declare const RouterAttempt$inboundSchema: z.ZodType<RouterAttempt, unknown>;
export declare function routerAttemptFromJSON(jsonString: string): SafeParseResult<RouterAttempt, SDKValidationError>;
//# sourceMappingURL=routerattempt.d.ts.map