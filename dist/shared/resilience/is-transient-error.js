"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransientError = isTransientError;
const TRANSIENT_PG_ERROR_CODES = new Set([
    "40001",
    "40P01",
    "53300",
    "57P01",
    "57P02",
    "57P03",
    "08000",
    "08003",
    "08006",
    "08001",
    "08004",
]);
const TRANSIENT_SYSTEM_ERROR_CODES = new Set([
    "ECONNREFUSED",
    "ECONNRESET",
    "ETIMEDOUT",
    "EPIPE",
    "ENOTFOUND",
]);
function isTransientError(error) {
    if (!error || typeof error !== "object") {
        return false;
    }
    const candidate = error;
    if (candidate.code &&
        (TRANSIENT_PG_ERROR_CODES.has(candidate.code) ||
            TRANSIENT_SYSTEM_ERROR_CODES.has(candidate.code))) {
        return true;
    }
    if (candidate.message) {
        const message = candidate.message.toLowerCase();
        return (message.includes("connection terminated") ||
            message.includes("connection refused") ||
            message.includes("timeout") ||
            message.includes("too many connections"));
    }
    return false;
}
//# sourceMappingURL=is-transient-error.js.map