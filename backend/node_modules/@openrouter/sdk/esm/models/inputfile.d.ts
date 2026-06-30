import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
/**
 * File input content item
 */
export type InputFile = {
    fileData?: string | undefined;
    fileId?: string | null | undefined;
    fileUrl?: string | undefined;
    filename?: string | undefined;
    type: "input_file";
};
/** @internal */
export declare const InputFile$inboundSchema: z.ZodType<InputFile, unknown>;
/** @internal */
export type InputFile$Outbound = {
    file_data?: string | undefined;
    file_id?: string | null | undefined;
    file_url?: string | undefined;
    filename?: string | undefined;
    type: "input_file";
};
/** @internal */
export declare const InputFile$outboundSchema: z.ZodType<InputFile$Outbound, InputFile>;
export declare function inputFileToJSON(inputFile: InputFile): string;
export declare function inputFileFromJSON(jsonString: string): SafeParseResult<InputFile, SDKValidationError>;
//# sourceMappingURL=inputfile.d.ts.map