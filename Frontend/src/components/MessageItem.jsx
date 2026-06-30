import React, { useState } from "react";
import { BrainCircuit, Check, Copy, RotateCcw, UserRound, Lightbulb, AlertTriangle, Info, Terminal, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TriangularLoader from "./TriangularLoader.jsx";
import "../styles/MessageItem.css";

function MessageItem({ message, onRegenerate }) {
  const isUser = message.role === "user";
  const messageText = message.text ?? message.content ?? "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className={["message-item-container", isUser ? "message-item-user" : "message-item-bot"].join(" ")}
    >
      {!isUser ? (
        <div className="message-bot-icon">
          <BrainCircuit size={18} />
        </div>
      ) : null}

      <div
        className={[
          "message-bubble-base",
          isUser
            ? "message-bubble-user"
            : ["message-bubble-bot", message.error ? "message-bubble-error" : "message-bubble-normal"].join(" "),
        ].join(" ")}
      >
        {!isUser ? (
          <div className="message-bot-header">
            <span>IntellixAI</span>
            <MessageActions content={messageText} onRegenerate={onRegenerate} />
          </div>
        ) : null}

        {isUser ? (
          <p className="message-user-text">{messageText}</p>
        ) : (
          <div className="markdown-prose min-w-0 overflow-hidden">
            {!messageText && message.streaming ? (
              <div className="message-loading-container">
                <TriangularLoader />
              </div>
            ) : null}
            
            {messageText ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {messageText}
              </ReactMarkdown>
            ) : null}
            {messageText && message.streaming ? <span className="streaming-cursor ml-1" /> : null}
          </div>
        )}
      </div>

      {isUser ? (
        <div className="message-user-icon">
          <UserRound size={17} />
        </div>
      ) : null}
    </motion.article>
  );
}

function MessageActions({ content, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText(content || "");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="message-actions-container">
      <button
        type="button"
        onClick={copy}
        disabled={!content}
        className={[
          "message-action-copy-base",
          copied ? "message-action-copied" : "message-action-default",
        ].join(" ")}
        aria-label="Copy response"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
      <button
        type="button"
        onClick={onRegenerate}
        className="message-action-btn-base message-action-default"
        aria-label="Regenerate response"
      >
        <RotateCcw size={13} />
      </button>
    </div>
  );
}

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="md-h1">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="md-h2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="md-h3">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="md-p">{children}</p>,
  ul: ({ children }) => <ul className="md-ul">{children}</ul>,
  ol: ({ children }) => <ol className="md-ol">{children}</ol>,
  li: ({ children, className, ...props }) => {
    if (className && className.includes("task-list-item")) {
      return <li className="md-li-task" {...props}>{children}</li>;
    }
    return (
      <li className="md-li">
        <ChevronRight size={15} className="md-li-icon" />
        <span className="md-li-content">{children}</span>
      </li>
    );
  },
  strong: ({ children }) => <strong className="md-strong">{children}</strong>,
  blockquote: ({ children }) => {
    let textContent = "";
    React.Children.forEach(children, (child) => {
      if (typeof child === "string") textContent += child;
      else if (child?.props?.children) {
        if (typeof child.props.children === "string") {
          textContent += child.props.children;
        } else if (Array.isArray(child.props.children)) {
          textContent += child.props.children.join("");
        }
      }
    });
    
    const textStr = textContent.toLowerCase();
    
    if (textStr.includes("tip") || textStr.includes("💡")) {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="md-alert-base md-alert-tip">
          <div className="md-alert-tip-icon"><Lightbulb size={20} /></div>
          <div className="md-alert-tip-text">{children}</div>
        </motion.div>
      );
    }
    if (textStr.includes("warning") || textStr.includes("⚠️") || textStr.includes("important") || textStr.includes("🔥")) {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="md-alert-base md-alert-warning">
          <div className="md-alert-warning-icon"><AlertTriangle size={20} /></div>
          <div className="md-alert-warning-text">{children}</div>
        </motion.div>
      );
    }
    if (textStr.includes("success") || textStr.includes("🎉") || textStr.includes("✅")) {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="md-alert-base md-alert-success">
          <div className="md-alert-success-icon"><Check size={20} /></div>
          <div className="md-alert-success-text">{children}</div>
        </motion.div>
      );
    }

    return (
      <blockquote className="md-blockquote">
        <div className="md-blockquote-icon"><Info size={20} /></div>
        <div className="md-blockquote-text">{children}</div>
      </blockquote>
    );
  },
  table: ({ children }) => (
    <div className="md-table-container">
      <table className="md-table">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="md-thead">{children}</thead>,
  tbody: ({ children }) => <tbody className="md-tbody">{children}</tbody>,
  tr: ({ children }) => <tr className="md-tr">{children}</tr>,
  th: ({ children }) => <th className="md-th">{children}</th>,
  td: ({ children }) => <td className="md-td">{children}</td>,
  code: ({ node, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    
    const isBlock = match || codeString.includes("\n");
    
    if (isBlock) {
      return <CodeBlock language={match ? match[1] : "text"} code={codeString} />;
    }
    
    return (
      <code className="md-code-inline" {...props}>
        {children}
      </code>
    );
  }
};

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="code-block-container">
      <div className="code-block-header">
        <div className="code-block-lang-wrapper">
          <Terminal size={14} className="code-block-lang-icon" />
          <span className="code-block-lang-text">{language || "code"}</span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className={[
            "code-block-copy-btn",
            copied ? "code-block-copy-success" : "code-block-copy-default",
          ].join(" ")}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <pre className="code-block-pre darkveil-scrollbar">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
}

export default MessageItem;
