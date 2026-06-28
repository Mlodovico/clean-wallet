"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
const is_transient_error_1 = require("./is-transient-error");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function withRetry(operation, options = {}) {
    const maxAttempts = options.maxAttempts ?? 3;
    const baseDelayMs = options.baseDelayMs ?? 200;
    const shouldRetry = options.shouldRetry ?? is_transient_error_1.isTransientError;
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts || !shouldRetry(error, attempt)) {
                throw error;
            }
            await sleep(baseDelayMs * attempt);
        }
    }
    throw lastError;
}
//# sourceMappingURL=retry.js.map