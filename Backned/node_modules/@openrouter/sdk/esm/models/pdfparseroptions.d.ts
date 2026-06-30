import * as z from "zod/v4";
import { PDFParserEngine, PDFParserEngine$Outbound } from "./pdfparserengine.js";
/**
 * Options for PDF parsing.
 */
export type PDFParserOptions = {
    /**
     * The engine to use for parsing PDF files. "pdf-text" is deprecated and automatically redirected to "cloudflare-ai".
     */
    engine?: PDFParserEngine | undefined;
};
/** @internal */
export type PDFParserOptions$Outbound = {
    engine?: PDFParserEngine$Outbound | undefined;
};
/** @internal */
export declare const PDFParserOptions$outboundSchema: z.ZodType<PDFParserOptions$Outbound, PDFParserOptions>;
export declare function pdfParserOptionsToJSON(pdfParserOptions: PDFParserOptions): string;
//# sourceMappingURL=pdfparseroptions.d.ts.map