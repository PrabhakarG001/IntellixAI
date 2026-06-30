import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as operations from "../models/operations/index.js";
export declare class Tts extends ClientSDK {
    /**
     * Create speech
     *
     * @remarks
     * Synthesizes audio from the input text. Returns a raw audio bytestream in the requested format (e.g. mp3, pcm, wav).
     */
    createSpeech(request: operations.CreateAudioSpeechRequest, options?: RequestOptions): Promise<ReadableStream<Uint8Array>>;
}
//# sourceMappingURL=tts.d.ts.map