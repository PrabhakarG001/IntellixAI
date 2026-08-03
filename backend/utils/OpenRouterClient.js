import OpenAI from 'openai';

const DEFAULT_MODEL = "openai/gpt-oss-120b";

export function getOpenRouterModel() {
  return process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
}

export async function createOpenRouterStream({
  messages,
  model = getOpenRouterModel(),
}) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured on the backend.");
  }

  const openrouter = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey,
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
          "You are IntellixAI, a polished full-stack AI assistant. Always produce a concise private reasoning summary through the provider reasoning channel when available, then provide a clear final answer. For greetings, still answer warmly and briefly.",
      },
      ...mappedMessages,
    ],
    stream: true,
    reasoning: { enabled: true }
  });

  return stream;
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
