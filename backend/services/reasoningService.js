import { createModelStream } from "./chatService.js";

const MODEL_ID = "nvidia/nemotron-3-ultra-550b-a55b:free";

export async function createReasoningStream(request) {
  // Override the provider model for the reasoning service
  const serviceRequest = {
    ...request,
    providerModel: MODEL_ID,
  };
  return createModelStream(serviceRequest);
}
