import { OpenRouterCore } from "../core.js";
import { RequestOptions } from "../lib/sdks.js";
import { ConnectionError, InvalidRequestError, RequestAbortedError, RequestTimeoutError, UnexpectedClientError } from "../models/errors/httpclienterrors.js";
import * as errors from "../models/errors/index.js";
import { OpenRouterError } from "../models/errors/openroutererror.js";
import { ResponseValidationError } from "../models/errors/responsevalidationerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import * as operations from "../models/operations/index.js";
import { APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";
import { PageIterator } from "../types/operations.js";
/**
 * List workspaces
 *
 * @remarks
 * List all workspaces for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.
 */
export declare function workspacesList(client: OpenRouterCore, request?: operations.ListWorkspacesRequest | undefined, options?: RequestOptions): APIPromise<PageIterator<Result<operations.ListWorkspacesResponse, errors.UnauthorizedResponseError | errors.InternalServerResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>, {
    offset: number;
}>>;
//# sourceMappingURL=workspacesList.d.ts.map