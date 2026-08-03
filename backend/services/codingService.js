import { createModelStream } from "./chatService.js";

const MODEL_ID = "poolside/laguna-m.1:free"; // Or poolside/laguna-xs-2.1:free as per snippet

export async function createCodingStream(request) {
  // Override the provider model for the coding service
  const serviceRequest = {
    ...request,
    providerModel: MODEL_ID,
  };
  return createModelStream(serviceRequest);
}
