import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type FileT = {
    /**
     * File content as base64 data URL or URL
     */
    fileData?: string | undefined;
    /**
     * File ID for previously uploaded files
     */
    fileId?: string | undefined;
    /**
     * Original filename
     */
    filename?: string | undefined;
};
/**
 * File content part for document processing
 */
export type ChatContentFile = {
    file: FileT;
    type: "file";
};
/** @internal */
export declare const FileT$inboundSchema: z.ZodType<FileT, unknown>;
/** @internal */
export type FileT$Outbound = {
    file_data?: string | undefined;
    file_id?: string | undefined;
    filename?: string | undefined;
};
/** @internal */
export declare const FileT$outboundSchema: z.ZodType<FileT$Outbound, FileT>;
export declare function fileToJSON(fileT: FileT): string;
export declare function fileFromJSON(jsonString: string): SafeParseResult<FileT, SDKValidationError>;
/** @internal */
export declare const ChatContentFile$inboundSchema: z.ZodType<ChatContentFile, unknown>;
/** @internal */
export type ChatContentFile$Outbound = {
    file: FileT$Outbound;
    type: "file";
};
/** @internal */
export declare const ChatContentFile$outboundSchema: z.ZodType<ChatContentFile$Outbound, ChatContentFile>;
export declare function chatContentFileToJSON(chatContentFile: ChatContentFile): string;
export declare function chatContentFileFromJSON(jsonString: string): SafeParseResult<ChatContentFile, SDKValidationError>;
//# sourceMappingURL=chatcontentfile.d.ts.map