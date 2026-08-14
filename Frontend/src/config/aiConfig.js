/**
 * Centralized AI Modes & Provider configuration.
 * Defines the 3 strict system modes: Talk, Coding, Reasoning
 * and their corresponding API providers and models.
 */
export const AI_MODES = {
  talk: {
    id: "talk",
    name: "Talk",
    icon: "💬",
    description: "General conversation",
    defaultProvider: "openrouter",
    defaultModel: "openai/gpt-oss-120b",
    providers: {
      openrouter: {
        id: "openrouter",
        name: "OpenRouter",
        models: [
          { id: "openai/gpt-oss-120b", name: "GPT OSS 120B", description: "Versatile conversational model" }
        ]
      }
    }
  },
  coding: {
    id: "coding",
    name: "Coding",
    icon: "💻",
    description: "Programming & development",
    defaultProvider: "openrouter",
    defaultModel: "poolside/laguna-s-2.1:free",
    providers: {
      openrouter: {
        id: "openrouter",
        name: "OpenRouter",
        models: [
          { id: "poolside/laguna-s-2.1:free", name: "Poolside Laguna S 2.1 (Free)", description: "Code synthesis & debugging" }
        ]
      }
    }
  },
  reasoning: {
    id: "reasoning",
    name: "Reasoning",
    icon: "🧠",
    description: "Complex problems & analysis",
    defaultProvider: "openrouter",
    defaultModel: "nvidia/nemotron-3-nano-30b-a3b",
    providers: {
      openrouter: {
        id: "openrouter",
        name: "OpenRouter",
        models: [
          { id: "nvidia/nemotron-3-nano-30b-a3b", name: "NVIDIA Nemotron 3 Nano", description: "Deep reasoning & math" }
        ]
      }
    }
  }
};
