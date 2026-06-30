import { OpenRouterCore } from "../core.js";
import { RequestOptions } from "../lib/sdks.js";
import { ConnectionError, InvalidRequestError, RequestAbortedError, RequestTimeoutError, UnexpectedClientError } from "../models/errors/httpclienterrors.js";
import * as errors from "../models/errors/index.js";
import { OpenRouterError } from "../models/errors/openroutererror.js";
import { ResponseValidationError } from "../models/errors/responsevalidationerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";
/**
 * Bulk remove members from a workspace
 *
 * @remarks
 * Remove multiple members from a workspace. Members with active API keys in the workspace cannot be removed. [Management key](/docs/guides/overview/auth/management-api-keys) required.
 */
export declare function workspacesBulkRemoveMembers(client: OpenRouterCore, request: operations.BulkRemoveWorkspaceMembersRequest, options?: RequestOptions): APIPromise<Result<models.BulkRemoveWorkspaceMembersResponse, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.ForbiddenResponseError | errors.NotFoundResponseError | errors.InternalServerResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=workspacesBulkRemoveMembers.d.ts.map