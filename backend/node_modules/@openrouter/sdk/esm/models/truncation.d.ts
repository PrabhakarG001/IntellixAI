import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const Truncation: {
    readonly Auto: "auto";
    readonly Disabled: "disabled";
};
export type Truncation = OpenEnum<typeof Truncation>;
/** @internal */
export declare const Truncation$inboundSchema: z.ZodType<Truncation, unknown>;
//# sourceMappingURL=truncation.d.ts.map