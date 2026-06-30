import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { StreamEvents } from "./streamevents.js";
export type ResponsesStreamingResponse = {
    /**
     * Union of all possible event types emitted during response streaming
     */
    data: StreamEvents;
};
/** @internal */
export declare const ResponsesStreamingResponse$inboundSchema: z.ZodType<ResponsesStreamingResponse, unknown>;
export declare function responsesStreamingResponseFromJSON(jsonString: string): SafeParseResult<ResponsesStreamingResponse, SDKValidationError>;
//# sourceMappingURL=responsesstreamingresponse.d.ts.map