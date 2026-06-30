import * as z from "zod/v4";
export type BulkUnassignKeysRequest = {
    /**
     * Array of API key hashes to unassign from the guardrail
     */
    keyHashes: Array<string>;
};
/** @internal */
export type BulkUnassignKeysRequest$Outbound = {
    key_hashes: Array<string>;
};
/** @internal */
export declare const BulkUnassignKeysRequest$outboundSchema: z.ZodType<BulkUnassignKeysRequest$Outbound, BulkUnassignKeysRequest>;
export declare function bulkUnassignKeysRequestToJSON(bulkUnassignKeysRequest: BulkUnassignKeysRequest): string;
//# sourceMappingURL=bulkunassignkeysrequest.d.ts.map