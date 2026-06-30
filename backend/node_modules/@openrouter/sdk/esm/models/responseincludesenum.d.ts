import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const ResponseIncludesEnum: {
    readonly FileSearchCallResults: "file_search_call.results";
    readonly MessageInputImageImageUrl: "message.input_image.image_url";
    readonly ComputerCallOutputOutputImageUrl: "computer_call_output.output.image_url";
    readonly ReasoningEncryptedContent: "reasoning.encrypted_content";
    readonly CodeInterpreterCallOutputs: "code_interpreter_call.outputs";
};
export type ResponseIncludesEnum = OpenEnum<typeof ResponseIncludesEnum>;
/** @internal */
export declare const ResponseIncludesEnum$outboundSchema: z.ZodType<string, ResponseIncludesEnum>;
//# sourceMappingURL=responseincludesenum.d.ts.map