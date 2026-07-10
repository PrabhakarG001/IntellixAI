import { useState, useRef, useEffect } from 'react';
import { UserCircle2, LogOut, RefreshCcw, ChevronUp } from 'lucide-react';
import { logout, loginWithGoogle } from '../../services/firebase.js';
import { motion, AnimatePresence } from 'framer-motion';
import './SidebarProfile.css';

export default function SidebarProfile({ user, sidebarOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuRef]);

  const handleSwitchAccount = async () => {
    try {
      await logout();
      await loginWithGoogle();
      setMenuOpen(false);
    } catch (error) {
      console.error("Account switch failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };



  return (
    <div className={`sidebar-profile-container ${!sidebarOpen ? 'closed' : ''}`} ref={menuRef}>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div 
              className="sidebar-profile-menu !z-50"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="sidebar-profile-menu-header">
              <div className="font-semibold text-slate-200">{user.displayName}</div>
              <div className="text-xs text-slate-400 truncate">{user.email}</div>
            </div>
            <div className="sidebar-profile-menu-actions">
              <button className="sidebar-profile-menu-btn" onClick={handleSwitchAccount}>
                <RefreshCcw size={14} />
                <span>Switch Account</span>
              </button>
              <button className="sidebar-profile-menu-btn" onClick={handleLogout}>
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <button 
        className="sidebar-profile-trigger group relative"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden border border-white/20 shadow-md group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 group-hover:border-white/40 transition-all duration-300">
          <img src={user.photoURL} className="w-full h-full object-cover" alt="Profile" />
        </div>
        
        {!sidebarOpen && (
          <div className="pointer-events-none absolute left-[calc(100%+14px)] z-50 flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide opacity-0 shadow-[0_4px_24px_rgba(168,85,247,0.25)] backdrop-blur-xl transition-all duration-300 ease-out -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 bg-[#1a0f2e]/95 text-[#fff1f1] border border-white/10">
            Profile
          </div>
        )}
        
        {sidebarOpen && (
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">{user.displayName}</div>
            <div className="sidebar-profile-email">{user.email}</div>
          </div>
        )}

        {sidebarOpen && (
          <div className="sidebar-profile-icon">
             <ChevronUp size={16} />
          </div>
        )}
      </button>
    </div>
  );
}
