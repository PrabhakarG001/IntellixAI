import { auth } from "./firebase.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://intellixai.onrender.com/api";

async function getAuthHeaders(existingHeaders = {}) {
  const headers = { ...existingHeaders };
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}


export async function fetchChats() {
  const response = await fetch(`${API_BASE}/chats`, { 
    headers: await getAuthHeaders(),
    cache: "no-store" 
  });
  if (!response.ok) throw new Error("Unable to load chats.");
  return response.json();
}

export async function fetchChatById(chatId) {
  const response = await fetch(`${API_BASE}/chat/${chatId}`, { 
    headers: await getAuthHeaders(),
    cache: "no-store"
  });
  if (!response.ok) throw new Error("Unable to load this search thread.");
  return response.json();
}

export async function createChat() {
  const response = await fetch(`${API_BASE}/new-chat`, { method: "POST", headers: await getAuthHeaders() });
  if (!response.ok) throw new Error("Unable to create a new chat.");
  return response.json();
}

export async function deleteChatById(chatId) {
  const response = await fetch(`${API_BASE}/chat/${chatId}`, { method: "DELETE", headers: await getAuthHeaders() });
  if (!response.ok) throw new Error("Unable to delete this search.");
}

export async function clearChatById(chatId) {
  const response = await fetch(`${API_BASE}/chat/${chatId}/clear`, {
    method: "POST",
    headers: await getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Unable to clear chat.");
  return response.json();
}

export async function streamChatMessage({
  chatId,
  message,
  mode,
  provider,
  model,
  selectedMode,
  thinkingMode,
  signal,
}) {
  const activeMode = mode || selectedMode || "talk";
  const response = await fetch(`${API_BASE}/stream`, {
    method: "POST",
    headers: await getAuthHeaders({ "Content-Type": "application/json" }),
    signal,
    body: JSON.stringify({
      chatId,
      message,
      mode: activeMode,
      provider: provider || "openai",
      model: model || "openai/gpt-oss-120b",
      selectedMode: activeMode,
      thinking: thinkingMode === "deep",
      thinkingMode,
    }),
  });

  if (!response.ok || !response.body) {
    const details = await safeReadError(response);
    throw new Error(details || "Unable to start streaming.");
  }

  return response.body;
}

export async function consumeSse(body, handlers) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() || "";

      for (const event of events) {
        const payload = parseSseEvent(event);
        if (!payload) continue;

        if (payload.type === "status") handlers.onStatus?.(payload.content || "");
        if (payload.type === "thought") handlers.onThought?.(payload.content || "");
        if (payload.type === "content") handlers.onContent?.(payload.content || "");
        if (payload.type === "error") {
          throw new Error(payload.content || "Stream error.");
        }
        if (payload.type === "done") handlers.onDone?.(payload.chat);
      }
    }
  } finally {
    reader.releaseLock();
  }
}

async function safeReadError(response) {
  try {
    const payload = await response.json();
    return payload.details || payload.error || `Streaming failed (HTTP ${response.status}).`;
  } catch {
    return `Streaming failed (HTTP ${response.status}).`;
  }
}

function parseSseEvent(event) {
  const data = event
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n");

  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
