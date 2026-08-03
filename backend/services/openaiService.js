import { createModelStream } from "./chatService.js";
import { getOpenRouterModel } from "../utils/OpenRouterClient.js";

export async function createOpenAIStream(request) {
  // Fallback to the default OpenAI model configuration
  const serviceRequest = {
    ...request,
    providerModel: process.env.OPENROUTER_MODEL || getOpenRouterModel(),
  };
  return createModelStream(serviceRequest);
}
