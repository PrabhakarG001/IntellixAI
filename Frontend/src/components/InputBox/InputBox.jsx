import "./InputBox.css";
import { ArrowUp, Square } from "lucide-react";
import { useEffect, useRef } from "react";

function InputBox({ value, onChange, onSend, disabled, isGenerating, onStop, selectedMode, onModeChange }) {
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
    <div className="group/input input-box-wrapper">
      <div className="input-box-animated-border"></div>
      <div className="input-box-solid-border"></div>

      <div className="input-box-inner flex flex-col gap-1">
        <div className="flex justify-start px-3 pt-2">
          <select
            value={selectedMode}
            onChange={(e) => onModeChange && onModeChange(e.target.value)}
            className="bg-slate-100 dark:bg-white/5 rounded-full px-3 py-1.5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="coding">💻 Coding (Laguna)</option>
            <option value="reasoning">🧠 Reasoning (Nemotron)</option>
            <option value="general">💬 General (OpenAI)</option>
          </select>
        </div>
        <div className="input-box-layout">
          <div className="input-box-textarea-wrapper">
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
              className="input-box-textarea hidden-scrollbar"
            />
          </div>

          <div className="input-box-btn-wrapper">
            <button
              type="button"
              onClick={isGenerating ? onStop : submit}
              disabled={!isGenerating && !value.trim()}
              aria-label={isGenerating ? "Stop generation" : "Submit search"}
              className={[
                "input-box-btn-base",
                isGenerating
                  ? "input-box-btn-stop"
                  : value.trim()
                    ? "input-box-btn-send"
                    : "input-box-btn-disabled",
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
