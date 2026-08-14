import { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LightRays from "./components/LightRays/LightRays.jsx";
import DotField from "./components/DotField/DotField.jsx";
import MainWorkspace from "./components/MainWorkspace/MainWorkspace.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { useChat } from "./hooks/useChat.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase.js";
import "./styles/global.css";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("talk");
  const [selectedProvider, setSelectedProvider] = useState("openrouter");
  const [selectedModel, setSelectedModel] = useState("openai/gpt-oss-120b");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectionChange = ({ mode, provider, model }) => {
    if (mode) setSelectedMode(mode);
    if (provider) setSelectedProvider(provider);
    if (model) setSelectedModel(model);
  };
  
  useEffect(() => {
    document.documentElement.classList.add("dark");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const {
    chats,
    activeChat,
    activeChatId,
    isGenerating,
    error,
    pinChat,
    regenerateResponse,
    removeChat,
    renameChat,
    selectChat: loadChatThread,
    sendMessage,
    startNewChat,
    stopGeneration,
  } = useChat({ selectedModel, selectedProvider, selectedMode, user });

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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage user={user} authLoading={authLoading} />} />
        <Route
          path="*"
          element={
            <ProtectedRoute user={user} authLoading={authLoading}>
              <div className="dark-veil-app relative h-screen w-full overflow-hidden bg-[#0a0514] text-slate-100 font-sans">
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
                    user={user}
                  />

                  <MainWorkspace
                    activeChat={activeChat}
                    isGenerating={isGenerating}
                    error={error}
                    onOpenSidebar={() => {
                      setSidebarOpen(true);
                      setMobileSidebarOpen(true);
                    }}
                    onSendMessage={sendMessage}
                    onStopGeneration={stopGeneration}
                    onRegenerate={regenerateResponse}
                    selectedMode={selectedMode}
                    selectedProvider={selectedProvider}
                    selectedModel={selectedModel}
                    onSelectionChange={handleSelectionChange}
                  />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
