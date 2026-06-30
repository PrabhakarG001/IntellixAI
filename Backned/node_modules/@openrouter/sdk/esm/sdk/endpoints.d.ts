import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
export declare class Endpoints extends ClientSDK {
    /**
     * Preview the impact of ZDR on the available endpoints
     */
    listZdrEndpoints(request?: operations.ListEndpointsZdrRequest | undefined, options?: RequestOptions): Promise<operations.ListEndpointsZdrResponse>;
    /**
     * List all endpoints for a model
     */
    list(request: operations.ListEndpointsRequest, options?: RequestOptions): Promise<operations.ListEndpointsResponse>;
}
//# sourceMappingURL=endpoints.d.ts.map