import * as z from "zod/v4";
export type ModerationPlugin = {
    id: "moderation";
};
/** @internal */
export type ModerationPlugin$Outbound = {
    id: "moderation";
};
/** @internal */
export declare const ModerationPlugin$outboundSchema: z.ZodType<ModerationPlugin$Outbound, ModerationPlugin>;
export declare function moderationPluginToJSON(moderationPlugin: ModerationPlugin): string;
//# sourceMappingURL=moderationplugin.d.ts.map