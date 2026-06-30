import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type FilePath = {
    fileId: string;
    index: number;
    type: "file_path";
};
/** @internal */
export declare const FilePath$inboundSchema: z.ZodType<FilePath, unknown>;
/** @internal */
export type FilePath$Outbound = {
    file_id: string;
    index: number;
    type: "file_path";
};
/** @internal */
export declare const FilePath$outboundSchema: z.ZodType<FilePath$Outbound, FilePath>;
export declare function filePathToJSON(filePath: FilePath): string;
export declare function filePathFromJSON(jsonString: string): SafeParseResult<FilePath, SDKValidationError>;
//# sourceMappingURL=filepath.d.ts.map