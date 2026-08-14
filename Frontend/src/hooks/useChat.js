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

export function useChat({ selectedModel, selectedProvider, user, selectedMode }) {
  const [chats, setChats] = useState(fallbackChats);
  const [activeChatId, setActiveChatId] = useState(fallbackChats[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);



  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? chats[0] ?? null,
    [activeChatId, chats],
  );

  const loadChats = useCallback(async () => {
    try {
      const payload = await fetchChats();
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
      setError(loadError.message);
    }
  }, []);

  useEffect(() => {
    if (user?.uid) {
      setChats(fallbackChats);
      setActiveChatId(fallbackChats[0].id);
      loadChats();
    } else {
      setChats(fallbackChats);
      setActiveChatId(fallbackChats[0].id);
    }
  }, [user?.uid, loadChats]);

  const startNewChat = useCallback(async () => {
    try {
      const payload = await createChat();
      const chat = normalizeChat(payload.chat);
      setChats((current) => [chat, ...current]);
      setActiveChatId(chat.id);
      setError("");
      return chat;
    } catch (createError) {
      setError(createError.message);
      return null;
    }
  }, []);

  const removeChat = useCallback(
    async (chatId) => {
      let removedChat = null;
      let nextActiveChatId = activeChatId;

      setChats((current) => {
        removedChat = current.find((chat) => chat.id === chatId) || null;
        const nextChats = current.filter((chat) => chat.id !== chatId);
        if (activeChatId === chatId) {
          nextActiveChatId = nextChats[0]?.id ?? "";
        }
        return nextChats.length ? nextChats : fallbackChats;
      });

      if (activeChatId === chatId) {
        setActiveChatId(nextActiveChatId || fallbackChats[0].id);
      }

      try {
        await deleteChatById(chatId);
        setError("");
      } catch (deleteError) {
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
    [activeChatId],
  );

  const clearChat = useCallback(async () => {
    if (!activeChat) return;

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
    abortRef.current = null;
    setIsGenerating(false);
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
      return current.map((item) => (item.id === chat.id ? chat : item));
    });
  }, []);

  const selectChat = useCallback(
    async (chatId) => {
      setActiveChatId(chatId);

      try {
        const payload = await fetchChatById(chatId);
        upsertChat(normalizeChat(payload.chat));
        setError("");
      } catch (selectError) {
        setError(selectError.message);
      }
    },
    [upsertChat],
  );

  const sendMessage = useCallback(
    async (content, { regenerate = false } = {}) => {
      const trimmed = content.trim();
      if (!trimmed || isGenerating || !activeChat) return;

      const controller = new AbortController();
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
          provider: selectedProvider,
          model: selectedModel,
          selectedMode,
          signal: controller.signal,
        });

        await consumeSse(body, {
          onThought: (chunk) => {
            patchMessage(chatId, assistantMessage.id, (message) => ({
              ...message,
              thought: `${message.thought || ""}${chunk}`,
            }));
          },
          onContent: (chunk) => {
            patchMessage(chatId, assistantMessage.id, (message) => ({
              ...message,
              content: `${message.content || ""}${chunk}`,
            }));
          },
          onDone: (chat) => {
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
        if (streamError.name === "AbortError") {
          patchMessage(chatId, assistantMessage.id, (message) => ({
            ...message,
            streaming: false,
            content: message.content || "Generation stopped.",
          }));
        } else {
          setError(streamError.message);
          patchMessage(chatId, assistantMessage.id, (prev) => ({
            ...prev,
            streaming: false,
            error: true,
            content:
              prev.content ||
              `Streaming failed: ${streamError.message}` ||
              "The streaming request failed. Check backend keys and try again.",
          }));
        }
      } finally {
        abortRef.current = null;
        setIsGenerating(false);
      }
    },
    [
      activeChat,
      isGenerating,
      patchMessage,
      selectedModel,
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
  const baseMessages = regenerate
    ? chat.messages.slice(0, Math.max(0, chat.messages.length - 1))
    : chat.messages;
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
    })),
  };
}
