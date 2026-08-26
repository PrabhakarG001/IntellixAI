import OpenAI from 'openai';

const DEFAULT_MODEL = "openai/gpt-oss-120b";

export function getOpenRouterModel() {
  return process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
}


export const API_POOL = [
  {
    id: "openai-primary",
    name: "OpenAI (GPT OSS 120B)",
    baseURL: "https://openrouter.ai/api/v1",
    key: () => process.env.OPENROUTER_API_KEY,
    model: () => process.env.OPENROUTER_MODEL || "openai/gpt-oss-120b",
    defaultHeaders: {
      "HTTP-Referer": "https://localhost",
      "X-Title": "IntellixAI"
    }
  }
];

/**
 * Creates stream via OpenAI API.
 * @param {Object} params
 * @param {Array} params.messages - Array of chat messages.
 * @param {string} [params.selectedMode="talk"] - Selected mode (talk, coding, reasoning).
 * @param {string} [params.requestedModel] - Specific requested model ID.
 * @param {string} [params.requestedProvider] - Specific requested provider.
 */
async function* createMockStream(promptMessage) {
  const responseText = `Hello! I am Intellix AI. To connect live cloud AI models, please set your \`OPENROUTER_API_KEY\` in your \`backend/.env\` file.\n\nI received your prompt: "${promptMessage}". How can I help you today?`;
  const words = responseText.split(" ");
  for (const word of words) {
    yield {
      choices: [
        {
          delta: {
            content: word + " "
          }
        }
      ]
    };
    await new Promise((resolve) => setTimeout(resolve, 35));
  }
}

async function* withStreamFallback(stream, promptMessage, providerName) {
  let emittedContent = false;

  try {
    for await (const chunk of stream) {
      if (chunk?.choices?.[0]?.delta?.content || chunk?.choices?.[0]?.delta?.reasoning) {
        emittedContent = true;
      }
      yield chunk;
    }
  } catch (error) {
    console.warn(`Provider ${providerName} stream failed:`, error.message || error);

    if (!emittedContent) {
      yield* createMockStream(promptMessage);
      return;
    }

    yield {
      choices: [
        {
          delta: {
            content:
              "\n\nThe model connection stopped unexpectedly before the response finished. Please retry in a moment.",
          },
        },
      ],
    };
  }
}

export async function createFallbackStream({ messages, selectedMode = "talk", requestedModel, requestedProvider }) {
  const availablePool = API_POOL.filter(item => Boolean(item.key()));
  const lastUserMsg = messages.filter(m => m.role === "user").pop()?.content || "";

  if (availablePool.length > 0) {
    for (let i = 0; i < availablePool.length; i++) {
      const provider = availablePool[i];
      const apiKey = provider.key();
      const model = provider.model();

      console.log(`[Attempt ${i + 1}/${availablePool.length}] Streaming via ${provider.name} (${model}) [Mode: ${selectedMode}]...`);

      try {
        const openrouter = new OpenAI({
          baseURL: provider.baseURL,
          apiKey,
          defaultHeaders: provider.defaultHeaders
        });

        const mappedMessages = messages.map(msg => {
          if (msg.role === 'assistant' && msg.thought) {
            return {
              role: msg.role,
              content: msg.content,
              reasoning_details: msg.thought
            };
          }
          return msg;
        });

        const stream = await openrouter.chat.completions.create({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are IntellixAI, a polished full-stack AI assistant. Provide clear, helpful answers. For greetings, answer warmly and briefly.",
            },
            ...mappedMessages,
          ],
          stream: true,
          max_tokens: 1000
        });

        return withStreamFallback(stream, lastUserMsg, provider.name);
      } catch (error) {
        console.warn(`⚠️ Provider ${provider.name} failed:`, error.message || error);
      }
    }
  }

  // Fallback stream when API keys are unconfigured or provider API fails (e.g. "User not found")
  console.log("ℹ️ Returning Intellix AI fallback stream.");
  return createMockStream(lastUserMsg);
}



export function createStreamClassifier() {
  return {
    inThinkTag: false,
    pendingTag: "",
  };
}

export function classifyPayload(chunk, state = createStreamClassifier()) {
  const choice = chunk?.choices?.[0] || {};
  const delta = choice.delta || {};
  
  const thought = delta.reasoning || delta.thought || "";
  const content = delta.content || "";
  const splitContent = splitThinkTags(content, state);

  return [
    ...(thought ? [{ type: "thought", content: thought }] : []),
    ...(splitContent.thought
      ? [{ type: "thought", content: splitContent.thought }]
      : []),
    ...(splitContent.content
      ? [{ type: "content", content: splitContent.content }]
      : []),
  ];
}

function splitThinkTags(chunk, state) {
  let source = `${state.pendingTag || ""}${chunk || ""}`;
  state.pendingTag = "";

  if (!source) {
    return { content: "", thought: "" };
  }

  const openTag = "<think>";
  const closeTag = "</think>";
  const lowerSource = source.toLowerCase();
  const trailingOpen = findTrailingPartialTag(lowerSource, openTag);
  const trailingClose = findTrailingPartialTag(lowerSource, closeTag);
  const trailingIndex =
    trailingOpen === -1
      ? trailingClose
      : trailingClose === -1
        ? trailingOpen
        : Math.min(trailingOpen, trailingClose);

  if (trailingIndex > -1) {
    state.pendingTag = source.slice(trailingIndex);
    source = source.slice(0, trailingIndex);
  }

  let content = "";
  let thought = "";
  let index = 0;

  while (index < source.length) {
    const rest = source.slice(index);
    const lowerRest = rest.toLowerCase();

    if (state.inThinkTag) {
      const closeIndex = lowerRest.indexOf(closeTag);
      if (closeIndex === -1) {
        thought += rest;
        index = source.length;
      } else {
        thought += rest.slice(0, closeIndex);
        index += closeIndex + closeTag.length;
        state.inThinkTag = false;
      }
      continue;
    }

    const openIndex = lowerRest.indexOf(openTag);
    if (openIndex === -1) {
      content += rest;
      index = source.length;
    } else {
      content += rest.slice(0, openIndex);
      index += openIndex + openTag.length;
      state.inThinkTag = true;
    }
  }

  return { content, thought };
}

function findTrailingPartialTag(source, tag) {
  const maxLength = Math.min(source.length, tag.length - 1);

  for (let length = maxLength; length > 0; length -= 1) {
    if (tag.startsWith(source.slice(-length))) {
      return source.length - length;
    }
  }

  return -1;
}
