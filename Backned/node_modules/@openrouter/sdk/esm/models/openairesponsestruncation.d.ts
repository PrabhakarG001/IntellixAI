import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const OpenAIResponsesTruncation: {
    readonly Auto: "auto";
    readonly Disabled: "disabled";
};
export type OpenAIResponsesTruncation = OpenEnum<typeof OpenAIResponsesTruncation>;
/** @internal */
export declare const OpenAIResponsesTruncation$outboundSchema: z.ZodType<string, OpenAIResponsesTruncation>;
//# sourceMappingURL=openairesponsestruncation.d.ts.map