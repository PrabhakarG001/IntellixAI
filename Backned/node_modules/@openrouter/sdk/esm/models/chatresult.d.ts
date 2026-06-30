import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatChoice } from "./chatchoice.js";
import { ChatUsage } from "./chatusage.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { OpenRouterMetadata } from "./openroutermetadata.js";
export declare const ChatResultObject: {
    readonly ChatCompletion: "chat.completion";
};
export type ChatResultObject = ClosedEnum<typeof ChatResultObject>;
/**
 * Chat completion response
 */
export type ChatResult = {
    /**
     * List of completion choices
     */
    choices: Array<ChatChoice>;
    /**
     * Unix timestamp of creation
     */
    created: number;
    /**
     * Unique completion identifier
     */
    id: string;
    /**
     * Model used for completion
     */
    model: string;
    object: ChatResultObject;
    openrouterMetadata?: OpenRouterMetadata | undefined;
    /**
     * The service tier used by the upstream provider for this request
     */
    serviceTier?: string | null | undefined;
    /**
     * System fingerprint
     */
    systemFingerprint: string | null;
    /**
     * Token usage statistics
     */
    usage?: ChatUsage | undefined;
};
/** @internal */
export declare const ChatResultObject$inboundSchema: z.ZodEnum<typeof ChatResultObject>;
/** @internal */
export declare const ChatResult$inboundSchema: z.ZodType<ChatResult, unknown>;
export declare function chatResultFromJSON(jsonString: string): SafeParseResult<ChatResult, SDKValidationError>;
//# sourceMappingURL=chatresult.d.ts.map