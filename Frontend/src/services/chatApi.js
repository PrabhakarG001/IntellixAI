import { auth } from "./firebase.js";

const DEFAULT_API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000/api"
    : "/api");

let activeApiBase = DEFAULT_API_BASE;

async function getAuthHeaders(existingHeaders = {}) {
  const headers = { ...existingHeaders };
  try {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(true).catch(() => null);
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.warn("Could not fetch ID token, proceeding without auth header:", error);
  }
  return headers;
}


export async function fetchChats() {
  const response = await fetch(`${activeApiBase}/chats`, { 
    headers: await getAuthHeaders(),
    cache: "no-store" 
  });
  if (!response.ok) throw new Error("Unable to load chats.");
  return response.json();
}

export async function fetchChatById(chatId) {
  const response = await fetch(`${activeApiBase}/chat/${chatId}`, { 
    headers: await getAuthHeaders(),
    cache: "no-store"
  });
  if (!response.ok) throw new Error("Unable to load this search thread.");
  return response.json();
}

export async function createChat() {
  const response = await fetch(`${activeApiBase}/new-chat`, { method: "POST", headers: await getAuthHeaders() });
  if (!response.ok) throw new Error("Unable to create a new chat.");
  return response.json();
}

export async function deleteChatById(chatId) {
  const response = await fetch(`${activeApiBase}/chat/${chatId}`, { method: "DELETE", headers: await getAuthHeaders() });
  if (!response.ok) throw new Error("Unable to delete this search.");
}

export async function clearChatById(chatId) {
  const response = await fetch(`${activeApiBase}/chat/${chatId}/clear`, {
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
  const requestHeaders = await getAuthHeaders({ "Content-Type": "application/json" });
  const requestBody = JSON.stringify({
    chatId,
    message,
    mode: activeMode,
    provider: provider || "openai",
    model: model || "openai/gpt-oss-120b",
    selectedMode: activeMode,
    thinking: thinkingMode === "deep",
    thinkingMode,
  });

  let response;
  const endpointsToTry = [
    `${activeApiBase}/stream`,
    `${activeApiBase}/chat/stream`,
    "http://localhost:5000/api/stream",
    "http://localhost:5000/stream",
  ];

  for (const url of endpointsToTry) {
    try {
      response = await fetch(url, {
        method: "POST",
        headers: requestHeaders,
        signal,
        body: requestBody,
      });

      if (response.ok) {
        // Update activeApiBase to the working base endpoint
        if (url.startsWith("http://localhost:5000")) {
          activeApiBase = "http://localhost:5000/api";
        }
        break;
      }
    } catch (netError) {
      if (netError.name === "AbortError") throw netError;
    }
  }

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
    let msg = payload.details || payload.error;
    if (msg) {
      if (typeof msg === "string" && msg.toLowerCase().includes("user not found")) {
        return "OpenRouter / OpenAI API key error ('User not found'). Please check OPENROUTER_API_KEY in backend .env.";
      }
      return msg;
    }
  } catch {
    // Non-JSON response (e.g. HTML from proxy)
  }

  if (response.status === 404) {
    return "Streaming endpoint not found (HTTP 404). Ensure backend server is running on port 5000.";
  }
  if (response.status === 502 || response.status === 503) {
    return `Backend server unavailable (HTTP ${response.status}). Please check backend status.`;
  }
  return `Streaming failed (HTTP ${response.status}).`;
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
