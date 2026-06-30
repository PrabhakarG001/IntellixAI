import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { ReasoningEffort } from "./reasoningeffort.js";
import { ReasoningSummaryVerbosity } from "./reasoningsummaryverbosity.js";
export type BaseReasoningConfig = {
    effort?: ReasoningEffort | null | undefined;
    summary?: ReasoningSummaryVerbosity | null | undefined;
};
/** @internal */
export declare const BaseReasoningConfig$inboundSchema: z.ZodType<BaseReasoningConfig, unknown>;
export declare function baseReasoningConfigFromJSON(jsonString: string): SafeParseResult<BaseReasoningConfig, SDKValidationError>;
//# sourceMappingURL=basereasoningconfig.d.ts.map