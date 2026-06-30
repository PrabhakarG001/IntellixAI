import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * Video input object
 */
export type ChatContentVideoInput = {
    /**
     * URL of the video (data: URLs supported)
     */
    url: string;
};
/** @internal */
export declare const ChatContentVideoInput$inboundSchema: z.ZodType<ChatContentVideoInput, unknown>;
/** @internal */
export type ChatContentVideoInput$Outbound = {
    url: string;
};
/** @internal */
export declare const ChatContentVideoInput$outboundSchema: z.ZodType<ChatContentVideoInput$Outbound, ChatContentVideoInput>;
export declare function chatContentVideoInputToJSON(chatContentVideoInput: ChatContentVideoInput): string;
export declare function chatContentVideoInputFromJSON(jsonString: string): SafeParseResult<ChatContentVideoInput, SDKValidationError>;
//# sourceMappingURL=chatcontentvideoinput.d.ts.map