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
 * Bulk add members to a workspace
 *
 * @remarks
 * Add multiple organization members to a workspace. Members are assigned the same role they hold in the organization. [Management key](/docs/guides/overview/auth/management-api-keys) required.
 */
export declare function workspacesBulkAddMembers(client: OpenRouterCore, request: operations.BulkAddWorkspaceMembersRequest, options?: RequestOptions): APIPromise<Result<models.BulkAddWorkspaceMembersResponse, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.ForbiddenResponseError | errors.NotFoundResponseError | errors.InternalServerResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=workspacesBulkAddMembers.d.ts.map