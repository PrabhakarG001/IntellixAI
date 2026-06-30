import type * as models from '../models/index.js';
import type { NextTurnParamsContext, ParsedToolCall, Tool } from './tool-types.js';
/**
 * Build a NextTurnParamsContext from the current request
 * Extracts relevant fields that can be modified by nextTurnParams functions
 *
 * @param request - The current ResponsesRequest
 * @returns Context object with current parameter values
 */
export declare function buildNextTurnParamsContext(request: models.ResponsesRequest): NextTurnParamsContext;
/**
 * Execute nextTurnParams functions for all called tools
 * Composes functions when multiple tools modify the same parameter
 *
 * @param toolCalls - Tool calls that were executed in this turn
 * @param tools - All available tools
 * @param currentRequest - The current request
 * @returns Object with computed parameter values
 */
export declare function executeNextTurnParamsFunctions(toolCalls: ParsedToolCall<Tool>[], tools: readonly Tool[], currentRequest: models.ResponsesRequest): Promise<Partial<NextTurnParamsContext>>;
/**
 * Apply computed nextTurnParams to the current request
 * Returns a new request object with updated parameters
 *
 * @param request - The current request
 * @param computedParams - Computed parameter values from nextTurnParams functions
 * @returns New request with updated parameters
 */
export declare function applyNextTurnParamsToRequest(request: models.ResponsesRequest, computedParams: Partial<NextTurnParamsContext>): models.ResponsesRequest;
//# sourceMappingURL=next-turn-params.d.ts.map