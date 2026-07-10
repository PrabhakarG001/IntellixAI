import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, authLoading, children }) {
  if (authLoading) {
    // Show a minimal loading state while Firebase checks the session on first load
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0514]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-purple-500"></div>
          <span className="text-sm text-slate-400">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // If we're done loading and there is still no user, kick them to login
    return <Navigate to="/login" replace />;
  }

  return children;
}
