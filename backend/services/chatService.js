import { randomUUID } from "node:crypto";
import { Thread, normalizeMessages, titleFromMessages } from "../models/thread.js";
import {
  classifyPayload,
  createFallbackStream,
  createStreamClassifier,
  getOpenRouterModel,
} from "../utils/OpenRouterClient.js";

function normalizeThinkingMode(mode, legacyThinking) {
  const value = String(mode || "").toLowerCase();
  if (value === "deep") return "deep";
  if (legacyThinking) return "deep";
  return "quick";
}

function withThinkingModeInstruction(messages, thinkingMode) {
  const instruction =
    thinkingMode === "deep"
      ? "Use advanced reasoning and careful analysis. Be clear, structured, and verify assumptions before answering."
      : "Respond quickly and directly. Keep reasoning lightweight unless the user asks for depth.";

  return [
    {
      role: "system",
      content: instruction,
    },
    ...messages,
  ];
}

export async function buildChatRequest(body = {}, userId) {
  const message = String(body.message || "").trim();
  const thinkingMode = normalizeThinkingMode(body.thinkingMode, body.thinking);
  const chatId = String(body.chatId || randomUUID());
  const existingChat = await Thread.findById(chatId, userId);
  const previousMessages = existingChat?.messages || normalizeMessages(body.messages);

  if (!message) {
    throw new Error("message is required.");
  }

  return {
    chatId,
    model: getOpenRouterModel(),
    selectedMode: body.selectedMode || "auto",
    message,
    thinkingMode,
    thinking: thinkingMode === "deep",
    messages: [
      ...previousMessages,
      {
        role: "user",
        content: message,
      },
    ],
  };
}

export async function createModelStream(request) {
  return createFallbackStream({
    messages: withThinkingModeInstruction(request.messages, request.thinkingMode),
    selectedMode: request.selectedMode || "auto",
  });
}

export async function generateCompleteResponse(request) {
  const stream = await createModelStream(request);
  const classifier = createStreamClassifier();
  let content = "";
  let thought = "";

  for await (const chunk of stream) {
    for (const token of classifyPayload(chunk, classifier)) {
      if (token.type === "thought") thought += token.content;
      if (token.type === "content") content += token.content;
    }
  }

  return {
    content:
      content.trim() ||
      "I could not generate a visible response. Please retry in a moment.",
    thought,
  };
}

export async function saveConversation(request, assistant, userId) {
  return Thread.upsert({
    id: request.chatId,
    userId,
    title: titleFromMessages(request.messages),
    messages: [
      ...request.messages,
      {
        role: "assistant",
        content: assistant.content,
        thought: assistant.thought,
      },
    ],
  });
}
