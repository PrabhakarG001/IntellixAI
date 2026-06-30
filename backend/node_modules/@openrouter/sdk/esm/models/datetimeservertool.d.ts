import * as z from "zod/v4";
import { ClosedEnum } from "../types/enums.js";
import { DatetimeServerToolConfig, DatetimeServerToolConfig$Outbound } from "./datetimeservertoolconfig.js";
export declare const DatetimeServerToolType: {
    readonly OpenrouterDatetime: "openrouter:datetime";
};
export type DatetimeServerToolType = ClosedEnum<typeof DatetimeServerToolType>;
/**
 * OpenRouter built-in server tool: returns the current date and time
 */
export type DatetimeServerTool = {
    /**
     * Configuration for the openrouter:datetime server tool
     */
    parameters?: DatetimeServerToolConfig | undefined;
    type: DatetimeServerToolType;
};
/** @internal */
export declare const DatetimeServerToolType$outboundSchema: z.ZodEnum<typeof DatetimeServerToolType>;
/** @internal */
export type DatetimeServerTool$Outbound = {
    parameters?: DatetimeServerToolConfig$Outbound | undefined;
    type: string;
};
/** @internal */
export declare const DatetimeServerTool$outboundSchema: z.ZodType<DatetimeServerTool$Outbound, DatetimeServerTool>;
export declare function datetimeServerToolToJSON(datetimeServerTool: DatetimeServerTool): string;
//# sourceMappingURL=datetimeservertool.d.ts.map