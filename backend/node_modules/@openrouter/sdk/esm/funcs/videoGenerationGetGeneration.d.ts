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
 * Poll video generation status
 *
 * @remarks
 * Returns job status and content URLs when completed
 */
export declare function videoGenerationGetGeneration(client: OpenRouterCore, request: operations.GetVideosRequest, options?: RequestOptions): APIPromise<Result<models.VideoGenerationResponse, errors.UnauthorizedResponseError | errors.NotFoundResponseError | errors.InternalServerResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=videoGenerationGetGeneration.d.ts.map