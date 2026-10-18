import { auth, logout } from "./firebase.js";
import { createAuthenticatedFetch } from './authRequest.js';

const activeApiBase = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

const authenticatedFetch = createAuthenticatedFetch({ auth, logout });


export async function fetchChats() {
  const response = await authenticatedFetch(`${activeApiBase}/chats`, {
    cache: "no-store" 
  });
  if (!response.ok) throw new Error("Unable to load chats.");
  return response.json();
}

export async function fetchChatById(chatId) {
  const response = await authenticatedFetch(`${activeApiBase}/chat/${chatId}`, {
    cache: "no-store"
  });
  if (!response.ok) throw new Error("Unable to load this search thread.");
  return response.json();
}

export async function createChat() {
  const response = await authenticatedFetch(`${activeApiBase}/new-chat`, { method: "POST" });
  if (!response.ok) throw new Error("Unable to create a new chat.");
  return response.json();
}

export async function deleteChatById(chatId) {
  const response = await authenticatedFetch(`${activeApiBase}/chat/${chatId}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Unable to delete this search.");
}

export async function clearChatById(chatId) {
  const response = await authenticatedFetch(`${activeApiBase}/chat/${chatId}/clear`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Unable to clear chat.");
  return response.json();
}

export { consumeSse } from './chatTransport.js';
import { requestChatStream } from './chatTransport.js';

export async function streamChatMessage({ chatId, message, mode = 'talk', thinkingMode, regenerate, messages, signal }) {
  return requestChatStream({ chatId, message, mode, thinkingMode, regenerate, messages, signal }, {
    base: activeApiBase, fetchImpl: authenticatedFetch,
  });
}
