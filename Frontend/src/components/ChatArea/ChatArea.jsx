import { AlertCircle, ArrowDown, RotateCcw, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import InputBox from "../InputBox/InputBox.jsx";
import MessageItem from "../MessageItem/MessageItem.jsx";
import DecryptedText from "../DecryptedText/DecryptedText.jsx";
import "./ChatArea.css";

function ChatArea({
  activeChat,
  isGenerating,
  error,
  onSendMessage,
  onStopGeneration,
  onRegenerate,
  onOpenSidebar,
}) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const messages = activeChat?.messages ?? [];
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (hasMessages) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [hasMessages, messages]);

  const handleScroll = (e) => {
    // Keep handleScroll signature if needed by the div, but it's now empty. Or remove it entirely.
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const send = (content = draft) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    onSendMessage(trimmed);
    setDraft("");
  };

  if (!hasMessages) {
    return (
      <section className="chat-empty-section">
        <button
          type="button"
          aria-label="Open sidebar"
          onClick={onOpenSidebar}
          className="chat-sidebar-btn chat-sidebar-btn-empty"
        >
          <Menu size={24} />
        </button>
        <div className="chat-logo-container">
          <div className="chat-logo-wrapper">
            <img src="/logo.png" alt="IntellixAI Logo" className="chat-logo-img" />
          </div>
          <h2 className="chat-heading">
            <DecryptedText
              text="How can I help you today?"
              animateOn="view"
              revealDirection="center"
              speed={90}
              maxIterations={20}
            />
          </h2>

          <div className="chat-input-wrapper-empty">
            <InputBox
              value={draft}
              onChange={setDraft}
              onSend={send}
              disabled={isGenerating}
              isGenerating={isGenerating}
              onStop={onStopGeneration}
            />
          </div>
        </div>
        <div className="chat-disclaimer-container-empty">
          <p className="chat-disclaimer-text">
            IntellixAI can make mistakes. Check important info.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="chat-section">
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={onOpenSidebar}
        className="chat-sidebar-btn chat-sidebar-btn-active"
      >
        <Menu size={24} />
      </button>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="chat-scroll-area hidden-scrollbar"
      >
        <div className="chat-messages-wrapper">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onRegenerate={onRegenerate}
            />
          ))}


          {error ? (
            <div className="chat-error-container">
              <span className="chat-error-text-wrapper">
                <AlertCircle size={16} className="shrink-0" />
                <span className="chat-error-text">{error}</span>
              </span>
              <button
                type="button"
                onClick={onRegenerate}
                disabled={isGenerating}
                className="chat-error-retry-btn"
              >
                <RotateCcw size={13} />
                Retry
              </button>
            </div>
          ) : null}
          <div ref={bottomRef} />
        </div>
      </div>



      <div className="chat-footer-section">
        <div className="chat-footer-wrapper">
          <InputBox
            value={draft}
            onChange={setDraft}
            onSend={send}
            disabled={isGenerating}
            isGenerating={isGenerating}
            onStop={onStopGeneration}
          />
          <p className="chat-disclaimer-text">
            IntellixAI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChatArea;
