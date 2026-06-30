import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { Guardrail } from "./guardrail.js";
export type ListGuardrailsResponse = {
    /**
     * List of guardrails
     */
    data: Array<Guardrail>;
    /**
     * Total number of guardrails
     */
    totalCount: number;
};
/** @internal */
export declare const ListGuardrailsResponse$inboundSchema: z.ZodType<ListGuardrailsResponse, unknown>;
export declare function listGuardrailsResponseFromJSON(jsonString: string): SafeParseResult<ListGuardrailsResponse, SDKValidationError>;
//# sourceMappingURL=listguardrailsresponse.d.ts.map