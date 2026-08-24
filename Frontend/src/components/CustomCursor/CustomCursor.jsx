import { useEffect, useState, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor({ isLoading = false }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState("default"); // 'default', 'pointer', 'text', 'resize'
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const followerRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (!target) return;

      const isClickable =
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        window.getComputedStyle(target).cursor === "pointer";

      const isTextInput =
        target.tagName === "TEXTAREA" ||
        (target.tagName === "INPUT" &&
          ["text", "search", "email", "password", "number", "url"].includes(target.type)) ||
        target.isContentEditable ||
        window.getComputedStyle(target).cursor === "text";

      const isResize =
        window.getComputedStyle(target).cursor.includes("resize") ||
        target.classList.contains("resize-handle");

      if (isTextInput) {
        setCursorType("text");
      } else if (isClickable) {
        setCursorType("pointer");
      } else if (isResize) {
        setCursorType("resize");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth LERP follower animation loop
    const updateFollower = () => {
      followerRef.current.x += (posRef.current.x - followerRef.current.x) * 0.22;
      followerRef.current.y += (posRef.current.y - followerRef.current.y) * 0.22;
      setFollowerPos({ x: followerRef.current.x, y: followerRef.current.y });
      rafRef.current = requestAnimationFrame(updateFollower);
    };
    rafRef.current = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const stateClasses = [
    "custom-cursor-container",
    `cursor-state-${cursorType}`,
    isMouseDown ? "cursor-active" : "",
    isLoading ? "cursor-loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={stateClasses} aria-hidden="true">
      {/* Outer Halo / Follower Ring */}
      <div
        className="custom-cursor-follower"
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`,
        }}
      />

      {/* Primary Cursor Pointer */}
      <div
        className="custom-cursor-pointer"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {cursorType === "text" ? (
          <div className="cursor-ibeam">
            <div className="cursor-ibeam-line" />
          </div>
        ) : cursorType === "resize" ? (
          <div className="cursor-resize">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#A855F7" strokeWidth="2.5">
              <path d="M8 3L4 7l4 4M16 3l4 4-4 4M4 7h16M8 21l-4-4 4-4M16 21l4-4-4-4M4 17h16" />
            </svg>
          </div>
        ) : (
          <svg
            className="cursor-arrow-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient Purple Glow */}
            <path
              d="M3 3L10.07 19.97L13.58 13.58L19.97 10.07L3 3Z"
              fill="rgba(168, 85, 247, 0.45)"
              className="cursor-svg-glow"
            />
            {/* Sharp Arrow Pointer */}
            <path
              d="M3 3L10.07 19.97L13.58 13.58L19.97 10.07L3 3Z"
              fill="#A855F7"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinejoin="round"
              className="cursor-svg-body"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
