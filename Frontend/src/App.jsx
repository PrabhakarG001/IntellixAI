import { useMemo, useState, useEffect } from "react";
import LightRays from "./components/LightRays.jsx";
import DotField from "./components/DotField.jsx";
import MainWorkspace from "./components/MainWorkspace.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useChat } from "./hooks/useChat.js";
import "./styles/global.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemma");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const {
    chats,
    activeChat,
    activeChatId,
    isGenerating,
    error,
    clearChat,
    pinChat,
    regenerateResponse,
    removeChat,
    renameChat,
    selectChat: loadChatThread,
    sendMessage,
    startNewChat,
    stopGeneration,
  } = useChat({ selectedModel });

  const filteredChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return chats;

    return chats.filter((chat) =>
      `${chat.title} ${chat.updatedAtLabel || chat.updatedAt}`.toLowerCase().includes(query),
    );
  }, [chats, searchQuery]);

  const selectChat = (chatId) => {
    loadChatThread(chatId);
    setMobileSidebarOpen(false);
  };

  const createNewChat = async () => {
    const chat = await startNewChat();
    if (chat) setMobileSidebarOpen(false);
  };

  return (
    <div className="dark-veil-app relative h-screen w-full overflow-hidden bg-[#0a0514] text-slate-100 font-sans">


      {/* 🌌 LightRays Layer (rendered just behind DotField) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#A855F7"
          raysSpeed={1.5}
          lightSpread={0.3}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
        />
      </div>

      {/* 🌌 DotField Layer (rendered visually above ColorBends) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
        />
      </div>

      <div className="relative z-10 flex h-full w-full overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          mobileSidebarOpen={mobileSidebarOpen}
          chats={filteredChats}
          activeChatId={activeChatId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onNewChat={createNewChat}
          onSelectChat={selectChat}
          onDeleteChat={removeChat}
          onRenameChat={renameChat}
          onPinChat={pinChat}
        />

        <MainWorkspace
          activeChat={activeChat}
          selectedModel={selectedModel}
          isGenerating={isGenerating}
          error={error}
          onOpenSidebar={() => {
            setSidebarOpen(true);
            setMobileSidebarOpen(true);
          }}
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
          onNewChat={createNewChat}
          onSendMessage={sendMessage}
          onStopGeneration={stopGeneration}
          onRegenerate={regenerateResponse}
          onClearChat={clearChat}
        />
      </div>

    </div>
  );
}

export default App;
