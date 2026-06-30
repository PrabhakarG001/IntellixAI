import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Guardrail } from "./guardrail.js";
export type CreateGuardrailResponse = {
    data: Guardrail;
};
/** @internal */
export declare const CreateGuardrailResponse$inboundSchema: z.ZodType<CreateGuardrailResponse, unknown>;
export declare function createGuardrailResponseFromJSON(jsonString: string): SafeParseResult<CreateGuardrailResponse, SDKValidationError>;
//# sourceMappingURL=createguardrailresponse.d.ts.map