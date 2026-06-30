import * as z from "zod/v4";
import * as discriminatedUnionTypes from "../types/discriminatedUnion.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { ChatContentAudio, ChatContentAudio$Outbound } from "./chatcontentaudio.js";
import { ChatContentFile, ChatContentFile$Outbound } from "./chatcontentfile.js";
import { ChatContentImage, ChatContentImage$Outbound } from "./chatcontentimage.js";
import { ChatContentText, ChatContentText$Outbound } from "./chatcontenttext.js";
import { ChatContentVideo, ChatContentVideo$Outbound } from "./chatcontentvideo.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import { LegacyChatContentVideo, LegacyChatContentVideo$Outbound } from "./legacychatcontentvideo.js";
/**
 * Content part for chat completion messages
 */
export type ChatContentItems = ChatContentFile | ChatContentImage | ChatContentAudio | LegacyChatContentVideo | (ChatContentText & {
    type: "text";
}) | ChatContentVideo | discriminatedUnionTypes.Unknown<"type">;
/** @internal */
export declare const ChatContentItems$inboundSchema: z.ZodType<ChatContentItems, unknown>;
/** @internal */
export type ChatContentItems$Outbound = ChatContentFile$Outbound | ChatContentImage$Outbound | ChatContentAudio$Outbound | LegacyChatContentVideo$Outbound | (ChatContentText$Outbound & {
    type: "text";
}) | ChatContentVideo$Outbound;
/** @internal */
export declare const ChatContentItems$outboundSchema: z.ZodType<ChatContentItems$Outbound, ChatContentItems>;
export declare function chatContentItemsToJSON(chatContentItems: ChatContentItems): string;
export declare function chatContentItemsFromJSON(jsonString: string): SafeParseResult<ChatContentItems, SDKValidationError>;
//# sourceMappingURL=chatcontentitems.d.ts.map