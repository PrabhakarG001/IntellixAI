import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
export declare class Generations extends ClientSDK {
    /**
     * Get request & usage metadata for a generation
     */
    getGeneration(request: operations.GetGenerationRequest, options?: RequestOptions): Promise<models.GenerationResponse>;
    /**
     * Get stored prompt and completion content for a generation
     */
    listGenerationContent(request: operations.ListGenerationContentRequest, options?: RequestOptions): Promise<models.GenerationContentResponse>;
}
//# sourceMappingURL=generations.d.ts.map