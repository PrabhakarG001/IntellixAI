import * as z from "zod/v4";
import * as models from "../index.js";
export type CreateAudioSpeechGlobals = {
    /**
     * The app identifier should be your app's URL and is used as the primary identifier for rankings.
     *
     * @remarks
     * This is used to track API usage per application.
     */
    httpReferer?: string | undefined;
    /**
     * The app display name allows you to customize how your app appears in OpenRouter's dashboard.
     *
     * @remarks
     */
    appTitle?: string | undefined;
    /**
     * Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.
     *
     * @remarks
     */
    appCategories?: string | undefined;
};
export type CreateAudioSpeechRequest = {
    /**
     * The app identifier should be your app's URL and is used as the primary identifier for rankings.
     *
     * @remarks
     * This is used to track API usage per application.
     */
    httpReferer?: string | undefined;
    /**
     * The app display name allows you to customize how your app appears in OpenRouter's dashboard.
     *
     * @remarks
     */
    appTitle?: string | undefined;
    /**
     * Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.
     *
     * @remarks
     */
    appCategories?: string | undefined;
    speechRequest: models.SpeechRequest;
};
/** @internal */
export type CreateAudioSpeechRequest$Outbound = {
    "HTTP-Referer"?: string | undefined;
    appTitle?: string | undefined;
    appCategories?: string | undefined;
    SpeechRequest: models.SpeechRequest$Outbound;
};
/** @internal */
export declare const CreateAudioSpeechRequest$outboundSchema: z.ZodType<CreateAudioSpeechRequest$Outbound, CreateAudioSpeechRequest>;
export declare function createAudioSpeechRequestToJSON(createAudioSpeechRequest: CreateAudioSpeechRequest): string;
//# sourceMappingURL=createaudiospeech.d.ts.map