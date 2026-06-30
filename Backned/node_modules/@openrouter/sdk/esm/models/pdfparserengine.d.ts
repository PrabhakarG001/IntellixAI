import * as z from "zod/v4";
import { ClosedEnum, OpenEnum } from "../types/enums.js";
export declare const PDFParserEnginePDFText: {
    readonly PdfText: "pdf-text";
};
export type PDFParserEnginePDFText = ClosedEnum<typeof PDFParserEnginePDFText>;
export declare const PDFParserEngineEnum: {
    readonly MistralOcr: "mistral-ocr";
    readonly Native: "native";
    readonly CloudflareAi: "cloudflare-ai";
};
export type PDFParserEngineEnum = OpenEnum<typeof PDFParserEngineEnum>;
/**
 * The engine to use for parsing PDF files. "pdf-text" is deprecated and automatically redirected to "cloudflare-ai".
 */
export type PDFParserEngine = PDFParserEngineEnum | PDFParserEnginePDFText;
/** @internal */
export declare const PDFParserEnginePDFText$outboundSchema: z.ZodEnum<typeof PDFParserEnginePDFText>;
/** @internal */
export declare const PDFParserEngineEnum$outboundSchema: z.ZodType<string, PDFParserEngineEnum>;
/** @internal */
export type PDFParserEngine$Outbound = string | string;
/** @internal */
export declare const PDFParserEngine$outboundSchema: z.ZodType<PDFParserEngine$Outbound, PDFParserEngine>;
export declare function pdfParserEngineToJSON(pdfParserEngine: PDFParserEngine): string;
//# sourceMappingURL=pdfparserengine.d.ts.map