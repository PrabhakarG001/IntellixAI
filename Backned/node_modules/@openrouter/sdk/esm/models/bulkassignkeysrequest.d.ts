import * as z from "zod/v4";
export type BulkAssignKeysRequest = {
    /**
     * Array of API key hashes to assign to the guardrail
     */
    keyHashes: Array<string>;
};
/** @internal */
export type BulkAssignKeysRequest$Outbound = {
    key_hashes: Array<string>;
};
/** @internal */
export declare const BulkAssignKeysRequest$outboundSchema: z.ZodType<BulkAssignKeysRequest$Outbound, BulkAssignKeysRequest>;
export declare function bulkAssignKeysRequestToJSON(bulkAssignKeysRequest: BulkAssignKeysRequest): string;
//# sourceMappingURL=bulkassignkeysrequest.d.ts.map