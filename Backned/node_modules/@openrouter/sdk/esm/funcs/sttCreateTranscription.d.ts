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
 * Create transcription
 *
 * @remarks
 * Transcribes audio into text. Accepts base64-encoded audio input and returns the transcribed text.
 */
export declare function sttCreateTranscription(client: OpenRouterCore, request: operations.CreateAudioTranscriptionsRequest, options?: RequestOptions): APIPromise<Result<models.STTResponse, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.PaymentRequiredResponseError | errors.NotFoundResponseError | errors.TooManyRequestsResponseError | errors.InternalServerResponseError | errors.BadGatewayResponseError | errors.ServiceUnavailableResponseError | errors.EdgeNetworkTimeoutResponseError | errors.ProviderOverloadedResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=sttCreateTranscription.d.ts.map