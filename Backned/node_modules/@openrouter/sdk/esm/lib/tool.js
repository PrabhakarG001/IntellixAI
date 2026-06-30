import { ToolType, SHARED_CONTEXT_KEY, } from "./tool-types.js";
// Implementation
export function tool(config) {
    // 'shared' is reserved for shared context — forbid it as a tool name
    if (config.name === SHARED_CONTEXT_KEY) {
        throw new Error(`Tool name "${SHARED_CONTEXT_KEY}" is reserved for shared context. Choose a different name.`);
    }
    // Check for manual tool first (execute === false)
    if (config.execute === false) {
        const fn = {
            name: config.name,
            inputSchema: config.inputSchema,
        };
        if (config.description !== undefined) {
            fn.description = config.description;
        }
        if (config.contextSchema !== undefined) {
            fn.contextSchema = config.contextSchema;
        }
        if (config.nextTurnParams !== undefined) {
            fn.nextTurnParams = config.nextTurnParams;
        }
        if (config.requireApproval !== undefined) {
            fn.requireApproval = config.requireApproval;
        }
        return {
            type: ToolType.Function,
            function: fn,
        };
    }
    // Check for generator tool (has eventSchema)
    if ('eventSchema' in config && config.eventSchema !== undefined) {
        const fn = {
            name: config.name,
            inputSchema: config.inputSchema,
            eventSchema: config.eventSchema,
            outputSchema: config.outputSchema,
            execute: config.execute,
        };
        if (config.description !== undefined) {
            fn.description = config.description;
        }
        if (config.contextSchema !== undefined) {
            fn.contextSchema = config.contextSchema;
        }
        if (config.nextTurnParams !== undefined) {
            fn.nextTurnParams = config.nextTurnParams;
        }
        if (config.requireApproval !== undefined) {
            fn.requireApproval = config.requireApproval;
        }
        return {
            type: ToolType.Function,
            function: fn,
        };
    }
    // Regular tool (has execute function, no eventSchema)
    const functionObj = {
        name: config.name,
        inputSchema: config.inputSchema,
        execute: config.execute,
        ...(config.description !== undefined && { description: config.description }),
        ...(config.outputSchema !== undefined && { outputSchema: config.outputSchema }),
        ...(config.contextSchema !== undefined && { contextSchema: config.contextSchema }),
        ...(config.nextTurnParams !== undefined && { nextTurnParams: config.nextTurnParams }),
        ...(config.requireApproval !== undefined && { requireApproval: config.requireApproval }),
    };
    return {
        type: ToolType.Function,
        function: functionObj,
    };
}
//#endregion
//# sourceMappingURL=tool.js.map