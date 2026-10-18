import { Thread } from "../models/thread.js";
import {
  buildChatRequest,
  createModelStream,
  generateCompleteResponse,
  saveConversation,
  classifyPayload,
  requireVisibleContent,
} from "../services/chatService.js";
import { AppError, reportError } from "../utils/errors.js";

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
  let unlock;
  try {
    unlock = lockRequest(req);
    await Thread.delete(req.params.id, req.user.uid);
    res.json({ ok: true });
  } catch (error) {
    const safe = reportError(error);
    res.status(safe.status).json({ error: safe.message, code: safe.code });
  } finally { unlock?.(); }
};

export const clearChat = async (req, res) => {
  let unlock;
  try {
    unlock = lockRequest(req);
    const chat = await Thread.upsert({
      id: req.params.id,
      userId: req.user.uid,
      title: "New chat",
      messages: [],
    });
    res.json({ chat: chat.toClient() });
  } catch (error) {
    const safe = reportError(error);
    res.status(safe.status).json({ error: safe.message, code: safe.code });
  } finally { unlock?.(); }
};

// Prevent simultaneous generations from overwriting a thread.
const activeRequests = new Set();
function lockRequest(req) {
  const key = req.user.uid + ':' + (req.params.id || req.body?.chatId || 'new');
  if (activeRequests.has(key)) throw new AppError(409, 'CHAT_BUSY', 'This chat is already generating a response.');
  activeRequests.add(key);
  return () => activeRequests.delete(key);
}

export const handleChat = async (req, res) => {
  const controller = new AbortController();
  const onClose = () => { if (!res.writableEnded) controller.abort(); };
  res.on('close', onClose);
  let unlock;
  try {
    unlock = lockRequest(req);
    const request = await buildChatRequest(req.body, req.user.uid);
    const result = await generateCompleteResponse(request, controller.signal);
    if (controller.signal.aborted) return;
    const chat = await saveConversation(request, result, req.user.uid);
    res.json({ chat: chat.toClient(), message: { role: 'assistant', content: result.content, thought: result.thought } });
  } catch (error) {
    const safe = reportError(error);
    if (!res.destroyed) res.status(safe.status).json({ error: safe.message, code: safe.code });
  } finally {
    unlock?.();
    controller.abort();
    res.off('close', onClose);
  }
};

function sendSse(res, payload) {
  if (!res.destroyed) res.write('data: ' + JSON.stringify(payload) + '\n\n');
}

export const handleChatStream = async (req, res) => {
  const controller = new AbortController();
  const onClose = () => { if (!res.writableEnded) controller.abort(); };
  res.on('close', onClose);
  let unlock;
  let heartbeat;
  let stream;
  try {
    unlock = lockRequest(req);
    const request = await buildChatRequest(req.body, req.user.uid);
    stream = await createModelStream(request, controller.signal);
    res.status(200);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();
    heartbeat = setInterval(() => { if (!res.destroyed) res.write(': keep-alive\n\n'); }, 15000);
    sendSse(res, { type: 'meta', chatId: request.chatId, model: request.model });
    let content = '', thought = '';
    for await (const chunk of stream) {
      if (controller.signal.aborted) return;
      for (const token of classifyPayload(chunk)) {
        if (token.type === 'content') content += token.content;
        else thought += token.content;
        sendSse(res, token);
      }
      if (chunk.usage) sendSse(res, { type: 'usage', usage: chunk.usage });
    }
    requireVisibleContent(content);
    if (controller.signal.aborted) return;
    const chat = await saveConversation(request, { content, thought }, req.user.uid);
    sendSse(res, { type: 'done', chat: chat.toClient() });
    res.end();
  } catch (error) {
    const safe = reportError(error);
    if (res.destroyed) return;
    if (!res.headersSent) return res.status(safe.status).json({ error: safe.message, code: safe.code });
    sendSse(res, { type: 'error', content: safe.message, code: safe.code });
    res.end();
  } finally {
    clearInterval(heartbeat);
    controller.abort();
    await stream?.return?.();
    unlock?.();
    res.off('close', onClose);
  }
};
