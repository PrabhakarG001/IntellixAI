import ChatArea from "../ChatArea/ChatArea.jsx";

function MainWorkspace({
  activeChat,
  isGenerating,
  error,
  onOpenSidebar,
  onSendMessage,
  onStopGeneration,
  onRegenerate,
  selectedMode,
  selectedProvider,
  selectedModel,
  onSelectionChange,
}) {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <ChatArea
        activeChat={activeChat}
        isGenerating={isGenerating}
        error={error}
        onSendMessage={onSendMessage}
        onStopGeneration={onStopGeneration}
        onRegenerate={onRegenerate}
        onOpenSidebar={onOpenSidebar}
        selectedMode={selectedMode}
        selectedProvider={selectedProvider}
        selectedModel={selectedModel}
        onSelectionChange={onSelectionChange}
      />
    </main>
  );
}

export default MainWorkspace;
