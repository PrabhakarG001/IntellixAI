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
/**
 * Submit a rerank request
 *
 * @remarks
 * Submits a rerank request to the rerank router
 */
export declare function rerankRerank(client: OpenRouterCore, request: operations.CreateRerankRequest, options?: RequestOptions): APIPromise<Result<operations.CreateRerankResponse, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.PaymentRequiredResponseError | errors.NotFoundResponseError | errors.TooManyRequestsResponseError | errors.InternalServerResponseError | errors.BadGatewayResponseError | errors.ServiceUnavailableResponseError | errors.EdgeNetworkTimeoutResponseError | errors.ProviderOverloadedResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=rerankRerank.d.ts.map