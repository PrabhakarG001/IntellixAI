import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
export declare const OutputModalityEnum: {
    readonly Text: "text";
    readonly Image: "image";
};
export type OutputModalityEnum = OpenEnum<typeof OutputModalityEnum>;
/** @internal */
export declare const OutputModalityEnum$outboundSchema: z.ZodType<string, OutputModalityEnum>;
//# sourceMappingURL=outputmodalityenum.d.ts.map