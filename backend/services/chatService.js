import { randomUUID } from 'node:crypto';
import { Thread, normalizeMessages, titleFromMessages } from '../models/thread.js';
import { createMinimaxStream, MINIMAX_MODEL } from './minimaxService.js';
import { AppError } from '../utils/errors.js';

export async function buildChatRequest(body = {}, userId) {
  const invalid = (message) => { throw new AppError(400, 'INVALID_REQUEST', message); };
  if (!body || typeof body !== 'object' || Array.isArray(body)) invalid('A JSON object is required.');
  if (typeof body.message !== 'string' || !body.message.trim()) invalid('A non-empty message is required.');
  const message = body.message.trim();
  if (message.length > 32_000) invalid('Message exceeds 32000 characters.');
  const mode = body.mode || body.selectedMode || 'talk';
  if (!['talk', 'coding', 'reasoning'].includes(mode)) invalid('Invalid chat mode.');
  if (body.model !== undefined && body.model !== MINIMAX_MODEL) invalid('Only MiniMax M3.1 Flash free is supported.');
  if (body.provider !== undefined && body.provider !== 'openrouter') invalid('Only OpenRouter is supported.');
  if (body.chatId !== undefined && (typeof body.chatId !== 'string' || !/^[\w-]{1,100}$/.test(body.chatId))) invalid('Invalid chat ID.');
  if (body.regenerate !== undefined && typeof body.regenerate !== 'boolean') invalid('Invalid regenerate flag.');
  if (body.thinkingMode !== undefined && !['quick', 'deep'].includes(body.thinkingMode)) invalid('Invalid thinking mode.');
  if (body.messages !== undefined && (!Array.isArray(body.messages) || body.messages.length > 200 || body.messages.some(m =>
    !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || !m.content.trim() || m.content.length > 64_000 ||
    (m.id !== undefined && (typeof m.id !== 'string' || !m.id || m.id.length > 200))))) invalid('Invalid conversation history.');
  const chatId = body.chatId || randomUUID();
  const existingChat = await Thread.findById(chatId, userId);
  let previous = existingChat?.messages || normalizeMessages(body.messages);
  if (body.regenerate) {
    const lastUser = previous.findLastIndex(m => m.role === 'user');
    if (lastUser >= 0) {
      if (previous[lastUser].content !== message) invalid('Regeneration must match the last user message.');
      previous = previous.slice(0, lastUser);
    }
  }
  if (previous.length > 200 || previous.reduce((n, m) => n + m.content.length + (m.thought?.length || 0) + JSON.stringify(m.reasoning_details || []).length, 0) > 500_000) invalid('Conversation is too long. Start a new chat.');
  return {
    chatId, mode, model: MINIMAX_MODEL, message,
    thinkingMode: body.thinkingMode || (mode === 'reasoning' || body.thinking === true ? 'deep' : 'quick'),
    messages: [...previous, { role: 'user', content: message }],
  };
}

export function createModelStream(request, signal) {
  const instructions = {
    talk: 'Answer clearly and helpfully. For greetings, be warm and brief.',
    coding: 'Help with programming. Explain relevant tradeoffs and provide correct, practical code.',
    reasoning: 'Analyze carefully, verify assumptions, and explain the answer clearly.',
  };
  return createMinimaxStream({
    messages: [{ role: 'system', content: `You are IntellixAI. ${instructions[request.mode]}` }, ...request.messages],
    thinkingMode: request.thinkingMode, signal,
  });
}

export function classifyPayload(chunk) {
  const delta = chunk.choices?.[0]?.delta || {};
  const thought = delta.reasoning || delta.reasoning_content || (Array.isArray(delta.reasoning_details)
    ? delta.reasoning_details.map(detail => detail?.type === 'reasoning.text' ? detail.text || '' : '').join('') : '');
  return [
    ...(typeof thought === 'string' && thought ? [{ type: 'thought', content: thought }] : []),
    ...(typeof delta.content === 'string' ? [{ type: 'content', content: delta.content }] : []),
  ];
}

export function collectReasoningDetails(target, chunk) {
  const details = chunk.choices?.[0]?.delta?.reasoning_details;
  if (Array.isArray(details)) target.push(...structuredClone(details));
}

export function requireVisibleContent(content) {
  if (!content.trim()) throw new AppError(502, 'MINIMAX_EMPTY', 'MiniMax returned an empty answer. Please retry.');
}

export async function generateCompleteResponse(request, signal) {
  const stream = await createModelStream(request, signal);
  let content = '', thought = '';
  const reasoning_details = [];
  for await (const chunk of stream) {
    collectReasoningDetails(reasoning_details, chunk);
    for (const token of classifyPayload(chunk)) {
      if (token.type === 'thought') thought += token.content;
      else content += token.content;
    }
  }
  requireVisibleContent(content);
  return { content, thought, reasoning_details };
}

export function saveConversation(request, assistant, userId) {
  return Thread.upsert({
    id: request.chatId, userId, title: titleFromMessages(request.messages),
    messages: [...request.messages, { role: 'assistant', content: assistant.content, thought: assistant.thought,
      ...(assistant.reasoning_details?.length ? { reasoning_details: assistant.reasoning_details } : {}),
    }],
  });
}
