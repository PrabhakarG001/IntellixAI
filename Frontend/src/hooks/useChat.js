import { historyBeforePrompt } from "../services/chatHistory.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  clearChatById,
  consumeSse,
  createChat,
  deleteChatById,
  fetchChatById,
  fetchChats,
  streamChatMessage,
} from "../services/chatApi.js";

const fallbackChats = [
  {
    id: "local-welcome",
    title: "New chat",
    updatedAt: "Just now",
    updatedAtLabel: "Just now",
    messages: [],
  },
];

export function useChat({ user, selectedMode }) {
  const [chats, setChats] = useState(fallbackChats);
  const [activeChatId, setActiveChatId] = useState(fallbackChats[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  const userRef = useRef(user?.uid);
  userRef.current = user?.uid;



  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? chats[0] ?? null,
    [activeChatId, chats],
  );

  const loadChats = useCallback(async () => {
    const owner = userRef.current;
    try {
      const payload = await fetchChats();
      if (owner !== userRef.current || abortRef.current) return;
      const loadedChats = payload.chats?.length
        ? normalizeChats(payload.chats)
        : fallbackChats;
      setChats(loadedChats);
      setActiveChatId((current) =>
        loadedChats.some((chat) => chat.id === current)
          ? current
          : loadedChats[0]?.id,
      );
      setError("");
    } catch (loadError) {
      if (owner !== userRef.current) return;
      setError(loadError.message);
    }
  }, []);

  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsGenerating(false);
    setError("");
    if (user?.uid) {
      setChats(fallbackChats);
      setActiveChatId(fallbackChats[0].id);
      loadChats();
    } else {
      setChats(fallbackChats);
      setActiveChatId(fallbackChats[0].id);
    }
    return () => abortRef.current?.abort();
  }, [user?.uid, loadChats]);

  const startNewChat = useCallback(async () => {
    const owner = userRef.current;
    try {
      const payload = await createChat();
      if (owner !== userRef.current) return null;
      const chat = normalizeChat(payload.chat);
      setChats((current) => [chat, ...current]);
      setActiveChatId(chat.id);
      setError("");
      return chat;
    } catch (createError) {
      if (owner !== userRef.current) return null;
      setError(createError.message);
      return null;
    }
  }, []);

  const removeChat = useCallback(
    async (chatId) => {
      if (abortRef.current) return;
      const owner = userRef.current;
      const removedChat = chats.find(chat => chat.id === chatId) || null;
      const nextChats = chats.filter(chat => chat.id !== chatId);
      setChats(nextChats.length ? nextChats : fallbackChats);
      if (activeChatId === chatId) setActiveChatId(nextChats[0]?.id || fallbackChats[0].id);

      try {
        await deleteChatById(chatId);
        if (owner !== userRef.current) return;
        setError("");
      } catch (deleteError) {
        if (owner !== userRef.current) return;
        if (removedChat) {
          setChats((current) => {
            const withoutFallback =
              current.length === 1 &&
              current[0].id === fallbackChats[0].id &&
              !current[0].messages.length
                ? []
                : current;
            return [removedChat, ...withoutFallback];
          });
          setActiveChatId(activeChatId);
        }
        setError(deleteError.message);
      }
    },
    [activeChatId, chats],
  );

  const clearChat = useCallback(async () => {
    if (!activeChat || abortRef.current) return;

    try {
      const payload = await clearChatById(activeChat.id);
      upsertChat(normalizeChat(payload.chat));
      setError("");
    } catch (clearError) {
      setError(clearError.message);
    }
  }, [activeChat]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const patchMessage = useCallback((chatId, messageId, updater) => {
    setChats((current) =>
      current.map((chat) => {
        if (chat.id !== chatId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((message) =>
            message.id === messageId ? updater(message) : message,
          ),
        };
      }),
    );
  }, []);

  const pinChat = useCallback((chatId) => {
    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
      )
    );
  }, []);

  const renameChat = useCallback((chatId, newTitle) => {
    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
  }, []);

  const upsertChat = useCallback((chat) => {
    setChats((current) => {
      const exists = current.some((item) => item.id === chat.id);
      if (!exists) {
        return [chat, ...current.filter(c => c.id !== fallbackChats[0].id)];
      }
      return current.map((item) => (item.id === chat.id ? { ...chat, isPinned: item.isPinned, title: item.title !== "New chat" ? item.title : chat.title } : item));
    });
  }, []);

  const selectChat = useCallback(
    async (chatId) => {
      setActiveChatId(chatId);
      if (abortRef.current) return;
      const owner = userRef.current;

      try {
        const payload = await fetchChatById(chatId);
        if (owner !== userRef.current || abortRef.current) return;
        upsertChat(normalizeChat(payload.chat));
        setError("");
      } catch (selectError) {
        if (owner !== userRef.current) return;
        setError(selectError.message);
      }
    },
    [upsertChat],
  );

  const sendMessage = useCallback(
    async (content, { regenerate = false } = {}) => {
      const trimmed = content.trim();
      if (!trimmed || abortRef.current || !activeChat || !user?.uid) return;

      const owner = user.uid;
      const controller = new AbortController();
      const currentRequest = () => abortRef.current === controller && userRef.current === owner;
      const timeoutId = setTimeout(() => controller.abort(new DOMException("The request timed out.", "TimeoutError")), 135000);
      const isFallback = activeChat.id === fallbackChats[0].id;
      const chatId = isFallback ? crypto.randomUUID() : activeChat.id;
      const userMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      };
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        thought: "",
        streaming: true,
      };

      abortRef.current = controller;
      setIsGenerating(true);
      setError("");
      
      if (isFallback) {
        setActiveChatId(chatId);
      }
      
      upsertChat(
        buildOptimisticChat({
          chat: { ...activeChat, id: chatId },
          userMessage,
          assistantMessage,
          regenerate,
        }),
      );

      try {
        const body = await streamChatMessage({
          chatId,
          message: trimmed,
          mode: selectedMode,
          regenerate: regenerate && Boolean(activeChat.messages.at(-1)?.persisted),
          messages: historyBeforePrompt(activeChat.messages, regenerate),
          signal: controller.signal,
        });

        await consumeSse(body, {
          onThought: (chunk) => {
            if (!currentRequest() || controller.signal.aborted) return;
            patchMessage(chatId, assistantMessage.id, (message) => ({
              ...message,
              thought: `${message.thought || ""}${chunk}`,
            }));
          },
          onContent: (chunk) => {
            if (!currentRequest() || controller.signal.aborted) return;
            patchMessage(chatId, assistantMessage.id, (message) => ({
              ...message,
              content: `${message.content || ""}${chunk}`,
            }));
          },
          onDone: (chat) => {
            if (!currentRequest() || controller.signal.aborted) return;
            if (chat) {
              upsertChat(normalizeChat(chat));
            } else {
              patchMessage(chatId, assistantMessage.id, (message) => ({
                ...message,
                streaming: false,
              }));
            }
          },
        });
      } catch (streamError) {
        if (!currentRequest()) return;
        if (streamError.name === "AbortError") {
          patchMessage(chatId, assistantMessage.id, (message) => ({
            ...message,
            streaming: false,
            stopped: true,
            content: message.content || "Generation stopped.",
          }));
        } else {
          const friendlyMsg = streamError.message || "Unable to generate a response.";
          setError(friendlyMsg);
          patchMessage(chatId, assistantMessage.id, (prev) => ({
            ...prev,
            streaming: false,
            error: true,
            content:
              prev.content ||
              `Streaming failed: ${friendlyMsg}`,
          }));
        }
      } finally {
        clearTimeout(timeoutId);
        if (currentRequest()) {
          abortRef.current = null;
          setIsGenerating(false);
        }
      }
    },
    [
      activeChat,
      isGenerating,
      patchMessage,
      user?.uid,
      selectedMode,
      upsertChat,
    ],
  );

  const regenerateResponse = useCallback(() => {
    if (!activeChat || isGenerating) return;
    const lastUserMessage = [...activeChat.messages]
      .reverse()
      .find((message) => message.role === "user");

    if (lastUserMessage) {
      sendMessage(lastUserMessage.content, { regenerate: true });
    }
  }, [activeChat, isGenerating, sendMessage]);

  return {
    chats,
    activeChat,
    activeChatId,
    isGenerating,
    error,
    clearChat,
    loadChats,
    pinChat,
    regenerateResponse,
    removeChat,
    renameChat,
    sendMessage,
    setActiveChatId,
    selectChat,
    startNewChat,
    stopGeneration,
  };
}

function buildOptimisticChat({ chat, userMessage, assistantMessage, regenerate }) {
  const baseMessages = historyBeforePrompt(chat.messages, regenerate);
  const nextMessages = [...baseMessages, userMessage, assistantMessage];
  const title =
    !chat.messages.length || chat.title === "New chat" || chat.title === "New conversation"
      ? userMessage.content.split(/\s+/).slice(0, 5).join(" ")
      : chat.title;

  return {
    ...chat,
    title,
    updatedAt: "Just now",
    updatedAtLabel: "Just now",
    messages: nextMessages,
  };
}

function normalizeChats(chats) {
  return chats.map(normalizeChat);
}

function normalizeChat(chat) {
  return {
    id: chat.id,
    title: chat.title || "New chat",
    updatedAt: chat.updatedAt || "Just now",
    updatedAtLabel: chat.updatedAtLabel || chat.updatedAt || "Just now",
    messages: (chat.messages || []).map((message, index) => ({
      id: message.id || `${chat.id}-${index}`,
      role: message.role,
      content: message.content ?? message.text ?? "",
      thought: message.thought || "",
      streaming: false,
      error: Boolean(message.error),
      persisted: true,
    })),
  };
}
