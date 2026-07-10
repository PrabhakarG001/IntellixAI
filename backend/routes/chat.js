import express from "express";
import { randomUUID } from "node:crypto";
import { Thread, normalizeMessages, titleFromMessages } from "../models/thread.js";
import {
  classifyPayload,
  createNvidiaStream,
  createStreamClassifier,
  getNvidiaModel,
} from "../utils/Nvidia.js";
import { verifyUser } from "../utils/auth.js";

const router = express.Router();

const providerModels = {
  gemma: process.env.OPENROUTER_NVIDIA_MODEL || getNvidiaModel(),
  nvidia: process.env.OPENROUTER_NVIDIA_MODEL || getNvidiaModel(),
  deepseek:
    process.env.OPENROUTER_DEEPSEEK_MODEL ||
    "deepseek/deepseek-r1-distill-llama-70b",
};

router.get("/chats", verifyUser, async (req, res) => {
  const chats = await Thread.all(req.user.uid);
  res.json({ chats: chats.map((chat) => chat.toClient()) });
});

router.get("/chat/:id", verifyUser, async (req, res) => {
  const chat = await Thread.findById(req.params.id, req.user.uid);

  if (!chat) {
    return res.status(404).json({ error: "Chat not found." });
  }

  res.json({ chat: chat.toClient() });
});

router.post("/new-chat", verifyUser, async (req, res) => {
  const chat = await Thread.create({ userId: req.user.uid, title: "New chat", messages: [] });
  res.status(201).json({ chat: chat.toClient() });
});

router.delete("/chat/:id", verifyUser, async (req, res) => {
  await Thread.delete(req.params.id, req.user.uid);
  res.json({ ok: true });
});

router.post("/chat/:id/clear", verifyUser, async (req, res) => {
  const chat = await Thread.upsert({
    id: req.params.id,
    userId: req.user.uid,
    title: "New chat",
    messages: [],
  });

  res.json({ chat: chat.toClient() });
});

router.post("/chat", verifyUser, async (req, res) => {
  try {
    const request = await buildChatRequest(req.body, req.user.uid);
    const result = await generateCompleteResponse(request);
    const chat = await saveConversation(request, result, req.user.uid);

    res.json({
      chat: chat.toClient(),
      message: {
        role: "assistant",
        content: result.content,
        thought: result.thought,
      },
    });
  } catch (error) {
    console.error("Chat request failed:", error?.message || error);
    res.status(502).json({
      error: "Unable to generate a response.",
      details: error?.message || "Unknown backend error.",
    });
  }
});

router.post("/chat/stream", verifyUser, async (req, res) => {
  let stream;
  let request;
  const classifier = createStreamClassifier();
  let assistantContent = "";
  let assistantThought = "";

  try {
    request = await buildChatRequest(req.body, req.user.uid);
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();

    req.on("close", () => {
      // The openrouter SDK stream does not have a cancel method directly on the iterable.
    });

    sendSse(res, {
      type: "meta",
      chatId: request.chatId,
      model: request.model,
    });

    if (request.thinking) {
      sendSse(res, { type: "status", content: "Thinking..." });
      sendSse(res, { type: "thought", content: "Analyzing prompt...\n" });
      sendSse(res, { type: "thought", content: "Generating response...\n" });
    }

    stream = await createModelStream(request);

    for await (const chunk of stream) {
      for (const token of classifyPayload(chunk, classifier)) {
        if (token.type === "thought") assistantThought += token.content;
        if (token.type === "content") assistantContent += token.content;
        sendSse(res, token);
      }
      
      if (chunk.usage?.reasoningTokens) {
        // Handled reasoning tokens but logging is unneeded.
      }
    }

    if (!assistantContent.trim()) {
      assistantContent =
        "I could not generate a visible response. Please retry in a moment.";
      sendSse(res, { type: "content", content: assistantContent });
    }

    const chat = await saveConversation(request, {
      content: assistantContent,
      thought: assistantThought,
    }, req.user.uid);

    sendSse(res, { type: "done", chat: chat.toClient() });
    res.end();
  } catch (error) {
    console.error("Chat stream failed:", error?.message || error);

    if (!res.headersSent) {
      return res.status(502).json({
        error: "Unable to start streaming response.",
        details: error?.message || "Unknown backend error.",
      });
    }

    sendSse(res, {
      type: "error",
      content: error?.message || "Streaming failed. Please try again.",
    });
    res.end();
  } finally {
    // async iterable closes naturally
  }
});

async function buildChatRequest(body = {}, userId) {
  const message = String(body.message || "").trim();
  const requestedModel = normalizeModel(body.model);
  const thinkingMode = normalizeThinkingMode(body.thinkingMode, body.thinking);
  const chatId = String(body.chatId || randomUUID());
  const existingChat = await Thread.findById(chatId, userId);
  const previousMessages = existingChat?.messages || normalizeMessages(body.messages);

  if (!message) {
    throw new Error("message is required.");
  }

  return {
    chatId,
    model: requestedModel,
    providerModel: providerModels[requestedModel],
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

async function createModelStream(request) {
  return createNvidiaStream({
    messages: withThinkingModeInstruction(request.messages, request.thinkingMode),
    model: request.providerModel,
  });
}

async function generateCompleteResponse(request) {
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

async function saveConversation(request, assistant, userId) {
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

function normalizeModel(model) {
  const value = String(model || "gemma").toLowerCase();
  if (value.includes("deepseek")) return "deepseek";
  return "gemma";
}

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

// consumeOpenRouterLines is removed since we use SDK

function sendSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

export default router;
