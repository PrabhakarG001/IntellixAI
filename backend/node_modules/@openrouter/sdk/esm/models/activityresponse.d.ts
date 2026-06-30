import * as z from "zod/v4";
import { Result as SafeParseResult } from "../types/fp.js";
import { ActivityItem } from "./activityitem.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
export type ActivityResponse = {
    /**
     * List of activity items
     */
    data: Array<ActivityItem>;
};
/** @internal */
export declare const ActivityResponse$inboundSchema: z.ZodType<ActivityResponse, unknown>;
export declare function activityResponseFromJSON(jsonString: string): SafeParseResult<ActivityResponse, SDKValidationError>;
//# sourceMappingURL=activityresponse.d.ts.map