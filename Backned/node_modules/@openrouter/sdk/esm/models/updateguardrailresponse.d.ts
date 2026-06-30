import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Guardrail } from "./guardrail.js";
export type UpdateGuardrailResponse = {
    data: Guardrail;
};
/** @internal */
export declare const UpdateGuardrailResponse$inboundSchema: z.ZodType<UpdateGuardrailResponse, unknown>;
export declare function updateGuardrailResponseFromJSON(jsonString: string): SafeParseResult<UpdateGuardrailResponse, SDKValidationError>;
//# sourceMappingURL=updateguardrailresponse.d.ts.map