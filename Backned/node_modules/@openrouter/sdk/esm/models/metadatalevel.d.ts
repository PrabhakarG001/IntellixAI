import * as z from "zod/v4";
import { OpenEnum } from "../types/enums.js";
/**
 * Opt-in level for surfacing routing metadata on the response under `openrouter_metadata`.
 */
export declare const MetadataLevel: {
    readonly Disabled: "disabled";
    readonly Enabled: "enabled";
};
/**
 * Opt-in level for surfacing routing metadata on the response under `openrouter_metadata`.
 */
export type MetadataLevel = OpenEnum<typeof MetadataLevel>;
/** @internal */
export declare const MetadataLevel$outboundSchema: z.ZodType<string, MetadataLevel>;
//# sourceMappingURL=metadatalevel.d.ts.map