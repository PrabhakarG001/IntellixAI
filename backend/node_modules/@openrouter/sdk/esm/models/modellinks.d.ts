import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Related API endpoints and resources for this model.
 */
export type ModelLinks = {
    /**
     * URL for the model details/endpoints API
     */
    details: string;
};
/** @internal */
export declare const ModelLinks$inboundSchema: z.ZodType<ModelLinks, unknown>;
export declare function modelLinksFromJSON(jsonString: string): SafeParseResult<ModelLinks, SDKValidationError>;
//# sourceMappingURL=modellinks.d.ts.map