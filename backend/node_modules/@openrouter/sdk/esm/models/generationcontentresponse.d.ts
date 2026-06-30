import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { GenerationContentData } from "./generationcontentdata.js";
/**
 * Stored prompt and completion content for a generation
 */
export type GenerationContentResponse = {
    /**
     * Stored prompt and completion content
     */
    data: GenerationContentData;
};
/** @internal */
export declare const GenerationContentResponse$inboundSchema: z.ZodType<GenerationContentResponse, unknown>;
export declare function generationContentResponseFromJSON(jsonString: string): SafeParseResult<GenerationContentResponse, SDKValidationError>;
//# sourceMappingURL=generationcontentresponse.d.ts.map