import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Default parameters for this model
 */
export type DefaultParameters = {
    frequencyPenalty?: number | null | undefined;
    presencePenalty?: number | null | undefined;
    repetitionPenalty?: number | null | undefined;
    temperature?: number | null | undefined;
    topK?: number | null | undefined;
    topP?: number | null | undefined;
};
/** @internal */
export declare const DefaultParameters$inboundSchema: z.ZodType<DefaultParameters, unknown>;
export declare function defaultParametersFromJSON(jsonString: string): SafeParseResult<DefaultParameters, SDKValidationError>;
//# sourceMappingURL=defaultparameters.d.ts.map