import * as z from "zod/v4";
/**
 * Configuration for the openrouter:datetime server tool
 */
export type DatetimeServerToolConfig = {
    /**
     * IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
     */
    timezone?: string | undefined;
};
/** @internal */
export type DatetimeServerToolConfig$Outbound = {
    timezone?: string | undefined;
};
/** @internal */
export declare const DatetimeServerToolConfig$outboundSchema: z.ZodType<DatetimeServerToolConfig$Outbound, DatetimeServerToolConfig>;
export declare function datetimeServerToolConfigToJSON(datetimeServerToolConfig: DatetimeServerToolConfig): string;
//# sourceMappingURL=datetimeservertoolconfig.d.ts.map