import { auth } from "./firebase.js";

const activeApiBase = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

async function getAuthHeaders(existingHeaders = {}) {
  const headers = { ...existingHeaders };
  try {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    throw new Error("Your session expired. Please sign in again.");
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

export { consumeSse } from './chatTransport.js';
import { requestChatStream } from './chatTransport.js';

export async function streamChatMessage({ chatId, message, mode = 'talk', thinkingMode, regenerate, messages, signal }) {
  return requestChatStream({ chatId, message, mode, thinkingMode, regenerate, messages, signal }, {
    base: activeApiBase, headers: await getAuthHeaders(),
  });
}
