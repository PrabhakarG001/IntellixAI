import { OpenRouterCore } from "../core.js";
import { EventStream } from "../lib/event-streams.js";
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
 * Create a chat completion
 *
 * @remarks
 * Sends a request for a model response for the given chat conversation. Supports both streaming and non-streaming modes.
 */
export declare function chatSend(client: OpenRouterCore, request: operations.SendChatCompletionRequestRequest & {
    chatRequest: {
        stream?: false;
    };
}, options?: RequestOptions): APIPromise<Result<models.ChatResult, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.PaymentRequiredResponseError | errors.ForbiddenResponseError | errors.NotFoundResponseError | errors.RequestTimeoutResponseError | errors.PayloadTooLargeResponseError | errors.UnprocessableEntityResponseError | errors.TooManyRequestsResponseError | errors.InternalServerResponseError | errors.BadGatewayResponseError | errors.ServiceUnavailableResponseError | errors.EdgeNetworkTimeoutResponseError | errors.ProviderOverloadedResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
export declare function chatSend(client: OpenRouterCore, request: operations.SendChatCompletionRequestRequest & {
    chatRequest: {
        stream: true;
    };
}, options?: RequestOptions): APIPromise<Result<EventStream<models.ChatStreamChunk>, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.PaymentRequiredResponseError | errors.ForbiddenResponseError | errors.NotFoundResponseError | errors.RequestTimeoutResponseError | errors.PayloadTooLargeResponseError | errors.UnprocessableEntityResponseError | errors.TooManyRequestsResponseError | errors.InternalServerResponseError | errors.BadGatewayResponseError | errors.ServiceUnavailableResponseError | errors.EdgeNetworkTimeoutResponseError | errors.ProviderOverloadedResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
export declare function chatSend(client: OpenRouterCore, request: operations.SendChatCompletionRequestRequest, options?: RequestOptions): APIPromise<Result<operations.SendChatCompletionRequestResponse, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.PaymentRequiredResponseError | errors.ForbiddenResponseError | errors.NotFoundResponseError | errors.RequestTimeoutResponseError | errors.PayloadTooLargeResponseError | errors.UnprocessableEntityResponseError | errors.TooManyRequestsResponseError | errors.InternalServerResponseError | errors.BadGatewayResponseError | errors.ServiceUnavailableResponseError | errors.EdgeNetworkTimeoutResponseError | errors.ProviderOverloadedResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=chatSend.d.ts.map