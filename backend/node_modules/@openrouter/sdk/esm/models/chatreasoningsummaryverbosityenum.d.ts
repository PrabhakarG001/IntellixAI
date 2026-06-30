import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const ChatReasoningSummaryVerbosityEnum: {
    readonly Auto: "auto";
    readonly Concise: "concise";
    readonly Detailed: "detailed";
};
export type ChatReasoningSummaryVerbosityEnum = OpenEnum<typeof ChatReasoningSummaryVerbosityEnum>;
/** @internal */
export declare const ChatReasoningSummaryVerbosityEnum$outboundSchema: z.ZodType<string, ChatReasoningSummaryVerbosityEnum>;
//# sourceMappingURL=chatreasoningsummaryverbosityenum.d.ts.map