import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
export declare class Credits extends ClientSDK {
    /**
     * Get remaining credits
     *
     * @remarks
     * Get total credits purchased and used for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
     */
    getCredits(request?: operations.GetCreditsRequest | undefined, options?: RequestOptions): Promise<operations.GetCreditsResponse>;
}
//# sourceMappingURL=credits.d.ts.map