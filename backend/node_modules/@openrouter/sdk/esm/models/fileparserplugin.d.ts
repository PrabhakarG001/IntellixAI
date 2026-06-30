import * as z from "zod/v4";
import { PDFParserOptions, PDFParserOptions$Outbound } from "./pdfparseroptions.js";
export type FileParserPlugin = {
    /**
     * Set to false to disable the file-parser plugin for this request. Defaults to true.
     */
    enabled?: boolean | undefined;
    id: "file-parser";
    /**
     * Options for PDF parsing.
     */
    pdf?: PDFParserOptions | undefined;
};
/** @internal */
export type FileParserPlugin$Outbound = {
    enabled?: boolean | undefined;
    id: "file-parser";
    pdf?: PDFParserOptions$Outbound | undefined;
};
/** @internal */
export declare const FileParserPlugin$outboundSchema: z.ZodType<FileParserPlugin$Outbound, FileParserPlugin>;
export declare function fileParserPluginToJSON(fileParserPlugin: FileParserPlugin): string;
//# sourceMappingURL=fileparserplugin.d.ts.map