import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { AI_MODES } from "../../config/aiConfig.js";

/**
 * Gemini-style AI Mode & Provider/Model Selector component.
 */
function AiModeSelector({
  selectedMode = "talk",
  selectedProvider = "openrouter",
  selectedModel = "openai/gpt-oss-120b",
  onSelectionChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const currentModeObj = AI_MODES[selectedMode] || AI_MODES.talk;
  const availableProviders = currentModeObj.providers || {};
  const currentProviderObj = availableProviders[selectedProvider] || availableProviders[currentModeObj.defaultProvider] || Object.values(availableProviders)[0] || { name: "OpenRouter", models: [] };
  const availableModels = currentProviderObj.models || [];

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleModeSelect = (modeKey) => {
    const targetMode = AI_MODES[modeKey];
    if (!targetMode) return;

    const newProvider = targetMode.defaultProvider;
    const providerObj = targetMode.providers[newProvider] || Object.values(targetMode.providers)[0];
    const newModel = targetMode.defaultModel || (providerObj?.models[0]?.id);

    if (onSelectionChange) {
      onSelectionChange({
        mode: modeKey,
        provider: newProvider,
        model: newModel
      });
    }
  };

  const handleModelSelect = (modelId) => {
    if (onSelectionChange) {
      onSelectionChange({
        mode: selectedMode,
        provider: selectedProvider,
        model: modelId
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Select AI Mode"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-purple-500/20 hover:border-purple-500/40 text-xs font-medium text-slate-200 shadow-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
      >
        <span className="text-sm">{currentModeObj.icon}</span>
        <span>{currentModeObj.name}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Popover Menu (Opens Upwards) */}
      {isOpen && (
        <div
          className="absolute right-0 bottom-full mb-2 w-72 sm:w-80 rounded-2xl bg-[#140b27]/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-950/50 z-50 overflow-hidden transform transition-all duration-200 animate-in fade-in zoom-in-95 origin-bottom-right"
          role="menu"
        >
          <div className="p-2 space-y-1">
            {/* Modes Section */}
            <div className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/60 px-3 pt-2 pb-1">
              AI Mode
            </div>
            {Object.entries(AI_MODES).map(([key, mode]) => {
              const isSelected = selectedMode === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleModeSelect(key)}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left outline-none cursor-pointer ${
                    isSelected
                      ? "bg-purple-600/20 text-white border border-purple-500/30"
                      : "hover:bg-white/5 text-slate-300 hover:text-white border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-center w-5 h-5 pt-0.5">
                    {isSelected ? (
                      <Check size={16} className="text-purple-400 font-bold stroke-[3]" />
                    ) : (
                      <span className="text-base leading-none">{mode.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      {isSelected && <span className="text-sm">{mode.icon}</span>}
                      <span>{mode.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      {mode.description}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="my-2 border-t border-purple-500/20" />

            {/* Models Section */}
            <div className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/60 px-3 pt-1 pb-1">
              Model
            </div>
            {availableModels.map((mObj) => {
              const isSelected = selectedModel === mObj.id;
              return (
                <button
                  key={mObj.id}
                  type="button"
                  onClick={() => handleModelSelect(mObj.id)}
                  className={`w-full flex items-start gap-2 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-purple-500/15 text-purple-200 font-medium"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <div className="w-4 pt-0.5 flex items-center justify-center">
                    {isSelected && <Check size={14} className="text-purple-400 stroke-[2.5]" />}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-medium text-slate-200 truncate">{mObj.name}</div>
                    {mObj.description && (
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{mObj.description}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AiModeSelector;
