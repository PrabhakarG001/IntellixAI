import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatStreamChunk } from "./chatstreamchunk.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type ChatStreamingResponse = {
    /**
     * Streaming chat completion chunk
     */
    data: ChatStreamChunk;
};
/** @internal */
export declare const ChatStreamingResponse$inboundSchema: z.ZodType<ChatStreamingResponse, unknown>;
export declare function chatStreamingResponseFromJSON(jsonString: string): SafeParseResult<ChatStreamingResponse, SDKValidationError>;
//# sourceMappingURL=chatstreamingresponse.d.ts.map