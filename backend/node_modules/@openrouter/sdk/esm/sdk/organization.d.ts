import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
import { PageIterator } from "../types/operations.js";
export declare class Organization extends ClientSDK {
    /**
     * List organization members
     *
     * @remarks
     * List all members of the organization associated with the authenticated management key. [Management key](/docs/guides/overview/auth/management-api-keys) required.
     */
    listMembers(request?: operations.ListOrganizationMembersRequest | undefined, options?: RequestOptions): Promise<PageIterator<operations.ListOrganizationMembersResponse, {
        offset: number;
    }>>;
}
//# sourceMappingURL=organization.d.ts.map