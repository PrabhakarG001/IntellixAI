import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const ChatFinishReasonEnum: {
    readonly ToolCalls: "tool_calls";
    readonly Stop: "stop";
    readonly Length: "length";
    readonly ContentFilter: "content_filter";
    readonly Error: "error";
};
export type ChatFinishReasonEnum = OpenEnum<typeof ChatFinishReasonEnum>;
/** @internal */
export declare const ChatFinishReasonEnum$inboundSchema: z.ZodType<ChatFinishReasonEnum, unknown>;
//# sourceMappingURL=chatfinishreasonenum.d.ts.map