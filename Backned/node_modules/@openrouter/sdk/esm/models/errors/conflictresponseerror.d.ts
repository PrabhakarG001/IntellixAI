import * as z from "zod/v4";
import * as models from "../index.js";
import { OpenRouterError } from "./openroutererror.js";
/**
 * Conflict - Resource conflict or concurrent modification
 */
export type ConflictResponseErrorData = {
    /**
     * Error data for ConflictResponse
     */
    error: models.ConflictResponseErrorData;
    openrouterMetadata?: {
        [k: string]: any | null;
    } | null | undefined;
    userId?: string | null | undefined;
};
/**
 * Conflict - Resource conflict or concurrent modification
 */
export declare class ConflictResponseError extends OpenRouterError {
    /**
     * Error data for ConflictResponse
     */
    error: models.ConflictResponseErrorData;
    openrouterMetadata?: {
        [k: string]: any | null;
    } | null | undefined;
    userId?: string | null | undefined;
    /** The original data that was passed to this error instance. */
    data$: ConflictResponseErrorData;
    constructor(err: ConflictResponseErrorData, httpMeta: {
        response: Response;
        request: Request;
        body: string;
    });
}
/** @internal */
export declare const ConflictResponseError$inboundSchema: z.ZodType<ConflictResponseError, unknown>;
//# sourceMappingURL=conflictresponseerror.d.ts.map