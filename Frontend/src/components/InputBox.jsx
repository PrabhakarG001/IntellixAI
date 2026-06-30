import { ArrowUp, Square } from "lucide-react";
import { useEffect, useRef } from "react";

function InputBox({ value, onChange, onSend, disabled, isGenerating, onStop }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 116)}px`;
  }, [value]);

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
  };

  return (
    <div className="group/input relative w-full rounded-[2rem] p-[1.5px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 focus-within:shadow-[0_12px_40px_rgba(168,85,247,0.2)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.5)] focus-within:dark:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
      {/*  Animated Running Border (Idle State) */}
      <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#A855F7_100%)] opacity-70 transition-opacity duration-500 group-focus-within/input:opacity-0 dark:opacity-100 group-focus-within/input:dark:opacity-0"></div>

      {/* Solid Border (Focus State) */}
      <div className="absolute inset-0 bg-[#A855F7] opacity-0 transition-opacity duration-500 group-focus-within/input:opacity-100"></div>

      {/*  Inner Input Container */}
      <div className="relative z-10 w-full rounded-[calc(2rem-1.5px)] bg-white/95 px-1.5 py-1.5 sm:px-2 sm:py-2 backdrop-blur-2xl dark:bg-[#0a0514]/95">
        <div className="flex items-end gap-1.5 sm:gap-2 relative">
          <div className="relative min-w-0 flex-1">
            <textarea
              ref={textareaRef}
              value={value}
              rows={1}
              disabled={disabled}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder={isGenerating ? "Streaming discoveries..." : "Ask Intellix AI"}
              className="max-h-28 min-h-[44px] sm:min-h-[48px] w-full resize-none bg-transparent py-2.5 sm:py-3 pl-3 pr-2 sm:pl-4 sm:pr-4 text-sm sm:text-base md:text-[18px] leading-relaxed text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-70 dark:text-[#fff1f1] dark:placeholder:text-[#e9b3fb]/60"
            />
          </div>

          <div className="flex h-11 sm:h-12 shrink-0 items-center justify-center pr-1 sm:pr-2">
            {/* Send / Stop button (active) */}
            <button
              type="button"
              onClick={isGenerating ? onStop : submit}
              disabled={!isGenerating && !value.trim()}
              aria-label={isGenerating ? "Stop generation" : "Submit search"}
              className={[
                "dv-transition grid size-11 sm:size-10 place-items-center rounded-full disabled:cursor-not-allowed disabled:bg-transparent disabled:text-slate-500 disabled:shadow-none",
                isGenerating
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600 dark:bg-rose-400 dark:text-slate-950 dark:shadow-[0_0_28px_rgba(251,113,133,0.32)] dark:hover:bg-rose-300"
                  : value.trim()
                    ? "bg-slate-900 text-white shadow-lg hover:bg-slate-800 dark:bg-[#A855F7] dark:text-[#fff1f1] dark:shadow-[0_0_28px_rgba(168,85,247,0.45)] dark:hover:bg-[#A855F7]/80"
                    : "bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-[#e9b3fb]/60",
              ].join(" ")}
            >
              {isGenerating ? <Square size={16} /> : <ArrowUp size={19} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBox; 
