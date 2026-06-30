import type { ClaudeMessageParam } from "../models/claude-message.js";
/**
 * Check if input is in Claude message format
 * Uses structural analysis to detect Claude-specific patterns
 *
 * @param input - Input to check
 * @returns True if input appears to be Claude format
 */
export declare function isClaudeStyleMessages(input: unknown): input is ClaudeMessageParam[];
//# sourceMappingURL=claude-type-guards.d.ts.map