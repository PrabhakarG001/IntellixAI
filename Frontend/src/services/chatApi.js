import { auth, logout } from "./firebase.js";
import { createAuthenticatedFetch } from './authRequest.js';
import { requestJson } from './apiResponse.js';

const activeApiBase = (import.meta.env.VITE_API_BASE_URL?.trim() || "/api").replace(/\/+$/, "");

const authenticatedFetch = createAuthenticatedFetch({ auth, logout });


export async function fetchChats() {
  return requestJson(`${activeApiBase}/chats`, { cache: "no-store" }, authenticatedFetch, 'chats');
}

export async function fetchChatById(chatId) {
  return requestJson(`${activeApiBase}/chat/${encodeURIComponent(chatId)}`, { cache: "no-store" }, authenticatedFetch, 'chat');
}

export async function createChat() {
  return requestJson(`${activeApiBase}/new-chat`, { method: "POST" }, authenticatedFetch, 'chat');
}

export async function deleteChatById(chatId) {
  await requestJson(`${activeApiBase}/chat/${encodeURIComponent(chatId)}`, { method: "DELETE" }, authenticatedFetch, 'ok');
}

export async function clearChatById(chatId) {
  return requestJson(`${activeApiBase}/chat/${encodeURIComponent(chatId)}/clear`, {
    method: "POST",
  }, authenticatedFetch, 'chat');
}

export { consumeSse } from './chatTransport.js';
import { requestChatStream } from './chatTransport.js';

export async function streamChatMessage({ chatId, message, mode = 'talk', thinkingMode, regenerate, messages, signal }) {
  return requestChatStream({ chatId, message, mode, thinkingMode, regenerate, messages, signal }, {
    base: activeApiBase, fetchImpl: authenticatedFetch,
  });
}
