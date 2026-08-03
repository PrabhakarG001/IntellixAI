import { buildChatRequest, saveConversation, createModelStream } from "../services/chatService.js";
import { classifyPayload, createStreamClassifier } from "../utils/OpenRouterClient.js";

function sendSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

export const handleIntellixStream = async (req, res) => {
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

    // Call the single unified OpenRouter stream
    stream = await createModelStream(request);

    for await (const chunk of stream) {
      for (const token of classifyPayload(chunk, classifier)) {
        if (token.type === "thought") assistantThought += token.content;
        if (token.type === "content") assistantContent += token.content;
        sendSse(res, token);
      }
      
      // Usage information comes in the final chunk
      if (chunk.usage) {
        console.log("\nReasoning tokens:", chunk.usage.completionTokensDetails?.reasoningTokens);
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
    console.error("Intellix stream failed:", error?.message || error);

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
