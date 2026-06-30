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
import "../styles/Sidebar.css";

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
}) {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const groupedChats = groupChats(chats);
  const railItemClass = "sidebar-rail-item group dv-transition";
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
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Sparkles size={20} />
          </div>
          {sidebarOpen ? (
            <div className="min-w-0 flex-1">
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
          <div className="flex min-h-0 flex-1 flex-col items-center px-3 py-3">
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={onNewChat}
                aria-label="New search"
                className={`${railItemClass} bg-slate-100 dark:bg-white/5`}
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

            <div className="mt-auto flex flex-col items-center gap-3 pb-3">
              <button
                type="button"
                onClick={onToggleSidebar}
                aria-label="User Profile"
                className="sidebar-profile-btn group"
              >
                <UserCircle2 size={21} />
                <span className={tooltipClass}>Profile</span>
              </button>
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
              "sidebar-new-chat-btn dv-transition",
              sidebarOpen ? "px-4 mb-2" : "justify-center px-0 mb-2",
            ].join(" ")}
          >
            <MessageSquarePlus size={18} />
            {sidebarOpen ? <span>New Chat</span> : null}
          </button>

          <label
            className={[
              "sidebar-search-label dv-transition",
              sidebarOpen ? "" : "justify-center",
            ].join(" ")}
          >
            <Search size={17} className="shrink-0" />
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

        <div className="hidden-scrollbar min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <AnimatePresence initial={false}>
            {groupedChats.map((group) => (
              <div key={group.label} className="mb-5 last:mb-0">
                {sidebarOpen ? (
                  <p className="sidebar-group-label">
                    {group.label}
                  </p>
                ) : null}

                <div className="space-y-1">
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
                        className="group relative overflow-hidden"
                      >
                        <button
                          type="button"
                          title={sidebarOpen ? undefined : chat.title}
                          onClick={() => onSelectChat(chat.id)}
                          className={[
                            "sidebar-chat-btn dv-transition",
                            active ? "sidebar-chat-btn-active" : "sidebar-chat-btn-inactive",
                            sidebarOpen ? "pr-24" : "justify-center px-0",
                          ].join(" ")}
                        >
                          {chat.isPinned ? (
                            <Pin size={15} className="shrink-0 text-amber-500 dark:text-[#e9b3fb]" />
                          ) : (
                            <MessageSquare size={16} className="shrink-0" />
                          )}
                          {sidebarOpen ? (
                            <span className="min-w-0 flex-1">
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
                                <span className="block truncate text-sm font-medium">
                                  {chat.title}
                                </span>
                              )}
                              <span className="sidebar-chat-date">
                                {chat.updatedAt}
                              </span>
                            </span>
                          ) : null}
                        </button>

                        {sidebarOpen && editingChatId !== chat.id ? (
                          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
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
            <p className="px-3 py-4 text-sm text-slate-400 dark:text-slate-500">
              No searches match your filter.
            </p>
          ) : null}
        </div>

        <div className="sidebar-footer">
          <div
            className={[
              "sidebar-user-container",
              sidebarOpen ? "" : "justify-center px-0",
            ].join(" ")}
          >
            <UserCircle2 size={18} className="shrink-0 text-slate-700 dark:text-[#e9b3fb]" />
            {sidebarOpen ? (
              <span className="min-w-0 flex-1">
                <span className="sidebar-user-name">
                  Prabhakar Gupta
                </span>
                <span className="sidebar-user-role">
                  <span className="sidebar-user-dot" />
                  Creator
                </span>
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onToggleSidebar}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className={[
              "sidebar-collapse-btn dv-transition",
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

export default Sidebar;
