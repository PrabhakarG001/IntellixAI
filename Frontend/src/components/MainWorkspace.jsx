import ChatArea from "./ChatArea.jsx";

function MainWorkspace({
  activeChat,
  selectedModel,
  isGenerating,
  error,
  onOpenSidebar,
  onToggleSidebar,
  onNewChat,
  onSendMessage,
  onStopGeneration,
  onRegenerate,
  onClearChat,
}) {
  const hasMessages = Boolean(activeChat?.messages?.length);

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      {/* Header removed as requested */}
      <ChatArea
        activeChat={activeChat}
        isGenerating={isGenerating}
        error={error}
        onSendMessage={onSendMessage}
        onStopGeneration={onStopGeneration}
        onRegenerate={onRegenerate}
        onOpenSidebar={onOpenSidebar}
        onNewChat={onNewChat}
      />
    </main>
  );
}

export default MainWorkspace;
