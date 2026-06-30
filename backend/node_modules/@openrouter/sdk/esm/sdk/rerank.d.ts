import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
export declare class Rerank extends ClientSDK {
    /**
     * Submit a rerank request
     *
     * @remarks
     * Submits a rerank request to the rerank router
     */
    rerank(request: operations.CreateRerankRequest, options?: RequestOptions): Promise<operations.CreateRerankResponse>;
}
//# sourceMappingURL=rerank.d.ts.map