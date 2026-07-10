import ChatArea from "../ChatArea/ChatArea.jsx";

function MainWorkspace({
  activeChat,
  isGenerating,
  error,
  onOpenSidebar,
  onSendMessage,
  onStopGeneration,
  onRegenerate,
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
      />
    </main>
  );
}

export default MainWorkspace;
