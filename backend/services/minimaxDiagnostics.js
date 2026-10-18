import { createMinimaxStream, isMinimaxConfigured } from './minimaxService.js';
import { publicError } from '../utils/errors.js';

// Local diagnostics only. No route exposes credentials/configuration or bills callers.
export async function inspectMinimax({ live = false, fetchImpl = globalThis.fetch } = {}) {
  const result = {
    keyConfigured: isMinimaxConfigured(),
    authentication: 'not_checked',
    inference: 'not_checked',
  };
  if (!result.keyConfigured) {
    return { ...result, error: { code: 'MINIMAX_NOT_CONFIGURED', message: 'Set MINIMAX_API_KEY in the backend environment.' } };
  }
  if (!live) return result;
  try {
    const stream = await createMinimaxStream({
      messages: [{ role: 'user', content: 'Reply with OK.' }], thinkingMode: 'quick', maxCompletionTokens: 32,
    }, { fetchImpl });
    let content = '';
    for await (const chunk of stream) content += chunk.choices?.[0]?.delta?.content || '';
    if (!content.trim()) return { ...result, authentication: 'not_verified', inference: 'failed', error: { code: 'MINIMAX_EMPTY', message: 'MiniMax returned no visible answer.' } };
    return { ...result, authentication: 'succeeded', inference: 'succeeded' };
  } catch (error) {
    const safe = publicError(error);
    return { ...result, authentication: safe.code === 'MINIMAX_AUTH' ? 'failed' : 'not_verified', inference: 'failed', error: { code: safe.code, message: safe.message } };
  }
}
