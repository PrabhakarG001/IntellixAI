import { Thread } from "../models/thread.js";
import {
  buildChatRequest,
  createModelStream,
  generateCompleteResponse,
  saveConversation,
} from "../services/chatService.js";
import { classifyPayload, createStreamClassifier } from "../utils/OpenRouterClient.js";

export const getChats = async (req, res) => {
  try {
    const chats = await Thread.all(req.user.uid);
    res.json({ chats: chats.map((chat) => chat.toClient()) });
  } catch (error) {
    res.status(500).json({ error: "Failed to load chats." });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Thread.findById(req.params.id, req.user.uid);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }
    res.json({ chat: chat.toClient() });
  } catch (error) {
    res.status(500).json({ error: "Failed to load chat." });
  }
};

export const createNewChat = async (req, res) => {
  try {
    const chat = await Thread.create({ userId: req.user.uid, title: "New chat", messages: [] });
    res.status(201).json({ chat: chat.toClient() });
  } catch (error) {
    res.status(500).json({ error: "Failed to create chat." });
  }
};

export const deleteChat = async (req, res) => {
  try {
    await Thread.delete(req.params.id, req.user.uid);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chat." });
  }
};

export const clearChat = async (req, res) => {
  try {
    const chat = await Thread.upsert({
      id: req.params.id,
      userId: req.user.uid,
      title: "New chat",
      messages: [],
    });
    res.json({ chat: chat.toClient() });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear chat." });
  }
};

export const handleChat = async (req, res) => {
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
};

function sendSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

export const handleChatStream = async (req, res) => {
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
  }
};
