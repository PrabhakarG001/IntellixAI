export function historyBeforePrompt(messages, regenerate) {
  const lastUser = regenerate ? messages.findLastIndex(m => m.role === 'user') : messages.length;
  return messages.slice(0, lastUser < 0 ? 0 : lastUser)
    .filter(m => !m.error && !m.stopped && !m.streaming && m.content.trim());
}
