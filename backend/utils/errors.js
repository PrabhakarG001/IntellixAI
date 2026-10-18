export class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function publicError(error) {
  if (error instanceof AppError) return error;
  return new AppError(500, 'INTERNAL_ERROR', 'The server could not complete this request.');
}

export function reportError(error) {
  const safe = publicError(error);
  // Never log upstream bodies, headers, keys, prompts, or raw exception messages.
  console.error('Chat request failed', { code: safe.code, status: safe.status });
  return safe;
}
