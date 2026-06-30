import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Guardrail } from "./guardrail.js";
export type GetGuardrailResponse = {
    data: Guardrail;
};
/** @internal */
export declare const GetGuardrailResponse$inboundSchema: z.ZodType<GetGuardrailResponse, unknown>;
export declare function getGuardrailResponseFromJSON(jsonString: string): SafeParseResult<GetGuardrailResponse, SDKValidationError>;
//# sourceMappingURL=getguardrailresponse.d.ts.map