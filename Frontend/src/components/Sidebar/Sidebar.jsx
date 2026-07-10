import {
  TextSearch,
  MessageSquare,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  Trash2,
  UserCircle2,
  X,
  Pin,
  Pencil,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SidebarProfile from "../SidebarProfile/SidebarProfile.jsx";

import "./Sidebar.css";

function Sidebar({
  sidebarOpen,
  mobileSidebarOpen,
  chats,
  activeChatId,
  searchQuery,
  onSearchChange,
  onToggleSidebar,
  onCloseMobile,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
  onPinChat,
  user,
}) {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const groupedChats = groupChats(chats);
  const railItemClass = "sidebar-rail-item group";
  const tooltipClass = "sidebar-tooltip";

  return (
    <>
      <AnimatePresence>
        {mobileSidebarOpen ? (
          <motion.button
            type="button"
            aria-label="Close navigation"
            className="sidebar-overlay"
            onClick={onCloseMobile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>

      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 76 }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className={[
          "sidebar-container",
          mobileSidebarOpen ? "mobile-open" : "mobile-closed",
        ].join(" ")}
      >
        <div className="sidebar-header">
          <div 
            className="sidebar-logo"
            onClick={!sidebarOpen ? onToggleSidebar : undefined}
            style={!sidebarOpen ? { cursor: 'pointer' } : undefined}
          >
            <Sparkles size={20} />
          </div>
          {sidebarOpen ? (
            <div className="sidebar-brand-wrapper">
              <p className="sidebar-brand-text">
                IntellixAI
              </p>
            </div>
          ) : null}
          <button
            type="button"
            aria-label="Close sidebar"
            className="sidebar-close-btn"
            onClick={onCloseMobile}
          >
            <X size={18} />
          </button>
        </div>

        {!sidebarOpen ? (
          <div className="sidebar-nav-collapsed">
            <div className="sidebar-nav-group">
              <button
                type="button"
                onClick={onNewChat}
                aria-label="New search"
                className={`${railItemClass} sidebar-rail-item-active`}
              >
                <TextSearch size={19} />
                <span className={tooltipClass}>New search</span>
              </button>
              <button
                type="button"
                onClick={onToggleSidebar}
                aria-label="Search history"
                className={railItemClass}
              >
                <Search size={20} />
                <span className={tooltipClass}>Search history</span>
              </button>
              <button
                type="button"
                onClick={onToggleSidebar}
                aria-label="Open search threads"
                className={railItemClass}
              >
                <MessageSquare size={19} />
                <span className={tooltipClass}>Threads</span>
              </button>

            </div>

            <div className="sidebar-footer-collapsed">
              <SidebarProfile user={user} sidebarOpen={false} />
            </div>
          </div>
        ) : (
          <>
        <div className="sidebar-top-bar">
          <button
            type="button"
            onClick={onNewChat}
            title={sidebarOpen ? undefined : "New search"}
            className={[
              "sidebar-new-chat-btn",
              sidebarOpen ? "px-4 mb-2" : "justify-center px-0 mb-2",
            ].join(" ")}
          >
            <MessageSquarePlus size={18} />
            {sidebarOpen ? <span>New Chat</span> : null}
          </button>

          <label
            className={[
              "sidebar-search-label",
              sidebarOpen ? "" : "justify-center",
            ].join(" ")}
          >
            <Search size={17} className="sidebar-search-icon" />
            {sidebarOpen ? (
              <input
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search history"
                className="sidebar-search-input"
              />
            ) : null}
          </label>
        </div>

        <div className="hidden-scrollbar sidebar-chat-list-wrapper">
          <AnimatePresence initial={false}>
            {groupedChats.map((group) => (
              <div key={group.label} className="sidebar-chat-group">
                {sidebarOpen ? (
                  <p className="sidebar-group-label">
                    {group.label}
                  </p>
                ) : null}

                <div className="sidebar-chat-items">
                  {group.items.map((chat) => {
                    const active = chat.id === activeChatId;

                    return (
                      <motion.div
                        key={chat.id}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="sidebar-chat-item group"
                      >
                        <button
                          type="button"
                          title={sidebarOpen ? undefined : chat.title}
                          onClick={() => onSelectChat(chat.id)}
                          className={[
                            "sidebar-chat-btn",
                            active ? "sidebar-chat-btn-active" : "sidebar-chat-btn-inactive",
                            sidebarOpen ? "pr-24" : "justify-center px-0",
                          ].join(" ")}
                        >
                          {chat.isPinned ? (
                            <Pin size={15} className="sidebar-pin-icon" />
                          ) : (
                            <MessageSquare size={16} className="sidebar-chat-icon" />
                          )}
                          {sidebarOpen ? (
                            <span className="sidebar-chat-text-wrapper">
                              {editingChatId === chat.id ? (
                                <input
                                  type="text"
                                  autoFocus
                                  value={editingTitle}
                                  onChange={(e) => setEditingTitle(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      onRenameChat(chat.id, editingTitle);
                                      setEditingChatId(null);
                                    } else if (e.key === "Escape") {
                                      setEditingChatId(null);
                                    }
                                  }}
                                  onBlur={() => setEditingChatId(null)}
                                  className="sidebar-chat-input"
                                />
                              ) : (
                                <span className="sidebar-chat-title">
                                  {chat.title}
                                </span>
                              )}

                              <span className="sidebar-chat-date">
                                {formatDateTime(chat.updatedAt)}
                              </span>
                            </span>
                          ) : null}
                        </button>

                        {sidebarOpen && editingChatId !== chat.id ? (
                          <div className="sidebar-chat-actions">
                            <button
                              type="button"
                              title={chat.isPinned ? "Unpin Chat" : "Pin Chat"}
                              onClick={(e) => {
                                e.stopPropagation();
                                onPinChat(chat.id);
                              }}
                              className="sidebar-action-btn"
                            >
                              <Pin size={13} />
                            </button>
                            <button
                              type="button"
                              title="Rename Chat"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingChatId(chat.id);
                                setEditingTitle(chat.title);
                              }}
                              className="sidebar-action-btn"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              type="button"
                              title="Delete Chat"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteChat(chat.id);
                              }}
                              className="sidebar-delete-btn"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </AnimatePresence>

          {!chats.length ? (
            <p className="sidebar-no-chats">
              No searches match your filter.
            </p>
          ) : null}
        </div>

        <div className="sidebar-footer">
          <SidebarProfile user={user} sidebarOpen={sidebarOpen} />

          <button
            type="button"
            onClick={onToggleSidebar}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className={[
              "sidebar-collapse-btn",
              sidebarOpen ? "" : "justify-center",
            ].join(" ")}
          >
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            {sidebarOpen ? <span>Collapse sidebar</span> : null}
          </button>
        </div>
          </>
        )}
      </motion.aside>
    </>
  );
}

function groupChats(chats) {
  const groups = [
    { label: "Pinned", items: [] },
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Previous 7 Days", items: [] },
  ];

  for (const chat of chats) {
    if (chat.isPinned) {
      groups[0].items.push(chat);
      continue;
    }

    const label = `${chat.updatedAtLabel || chat.updatedAt || ""}`.toLowerCase();
    if (label.includes("yesterday")) {
      groups[2].items.push(chat);
    } else if (label.includes("day") || label.includes("week")) {
      groups[3].items.push(chat);
    } else {
      groups[1].items.push(chat);
    }
  }

  return groups.filter((group) => group.items.length);
}

function formatDateTime(dateString) {
  if (!dateString || dateString === "Just now") return "Just now";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = date.getDate();
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${d} ${m} ${y} • ${hours}:${minutes} ${ampm}`;
  } catch (e) {
    return dateString;
  }
}

export default Sidebar;
