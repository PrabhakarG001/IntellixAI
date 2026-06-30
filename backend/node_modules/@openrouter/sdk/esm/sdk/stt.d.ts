import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
export declare class Stt extends ClientSDK {
    /**
     * Create transcription
     *
     * @remarks
     * Transcribes audio into text. Accepts base64-encoded audio input and returns the transcribed text.
     */
    createTranscription(request: operations.CreateAudioTranscriptionsRequest, options?: RequestOptions): Promise<models.STTResponse>;
}
//# sourceMappingURL=stt.d.ts.map