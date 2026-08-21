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
    defaultProvider: "openai",
    defaultModel: "openai/gpt-oss-120b",
    providers: {
      openai: {
        id: "openai",
        name: "OpenAI",
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
    defaultProvider: "openai",
    defaultModel: "openai/gpt-oss-120b",
    providers: {
      openai: {
        id: "openai",
        name: "OpenAI",
        models: [
          { id: "openai/gpt-oss-120b", name: "GPT OSS 120B (Code)", description: "Code synthesis & development" }
        ]
      }
    }
  },
  reasoning: {
    id: "reasoning",
    name: "Reasoning",
    icon: "🧠",
    description: "Complex problems & analysis",
    defaultProvider: "openai",
    defaultModel: "openai/gpt-oss-120b",
    providers: {
      openai: {
        id: "openai",
        name: "OpenAI",
        models: [
          { id: "openai/gpt-oss-120b", name: "GPT OSS 120B (Reasoning)", description: "Deep reasoning & structured analysis" }
        ]
      }
    }
  }
};
