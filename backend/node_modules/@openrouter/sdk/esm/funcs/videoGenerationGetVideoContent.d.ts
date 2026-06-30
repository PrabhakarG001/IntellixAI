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
 * Download generated video content
 *
 * @remarks
 * Streams the generated video content from the upstream provider
 */
export declare function videoGenerationGetVideoContent(client: OpenRouterCore, request: operations.ListVideosContentRequest, options?: RequestOptions): APIPromise<Result<ReadableStream<Uint8Array>, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.NotFoundResponseError | errors.InternalServerResponseError | errors.BadGatewayResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=videoGenerationGetVideoContent.d.ts.map