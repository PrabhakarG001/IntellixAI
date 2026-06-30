import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type FileCitation = {
    fileId: string;
    filename: string;
    index: number;
    type: "file_citation";
};
/** @internal */
export declare const FileCitation$inboundSchema: z.ZodType<FileCitation, unknown>;
/** @internal */
export type FileCitation$Outbound = {
    file_id: string;
    filename: string;
    index: number;
    type: "file_citation";
};
/** @internal */
export declare const FileCitation$outboundSchema: z.ZodType<FileCitation$Outbound, FileCitation>;
export declare function fileCitationToJSON(fileCitation: FileCitation): string;
export declare function fileCitationFromJSON(jsonString: string): SafeParseResult<FileCitation, SDKValidationError>;
//# sourceMappingURL=filecitation.d.ts.map