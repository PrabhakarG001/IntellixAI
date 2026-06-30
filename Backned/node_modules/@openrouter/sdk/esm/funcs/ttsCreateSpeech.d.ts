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
 * Create speech
 *
 * @remarks
 * Synthesizes audio from the input text. Returns a raw audio bytestream in the requested format (e.g. mp3, pcm, wav).
 */
export declare function ttsCreateSpeech(client: OpenRouterCore, request: operations.CreateAudioSpeechRequest, options?: RequestOptions): APIPromise<Result<ReadableStream<Uint8Array>, errors.BadRequestResponseError | errors.UnauthorizedResponseError | errors.PaymentRequiredResponseError | errors.NotFoundResponseError | errors.TooManyRequestsResponseError | errors.InternalServerResponseError | errors.BadGatewayResponseError | errors.ServiceUnavailableResponseError | errors.EdgeNetworkTimeoutResponseError | errors.ProviderOverloadedResponseError | OpenRouterError | ResponseValidationError | ConnectionError | RequestAbortedError | RequestTimeoutError | InvalidRequestError | UnexpectedClientError | SDKValidationError>>;
//# sourceMappingURL=ttsCreateSpeech.d.ts.map