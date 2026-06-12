"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionId = void 0;
const crypto_1 = require("crypto");
const transactionId_errors_1 = require("../errors/transactionId.errors");
const Result_1 = require("../../../shared/utils/Result");
class TransactionId {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (typeof value !== "string") {
            return Result_1.Result.fail(transactionId_errors_1.TransactionIdErrors.transactionIdMustBeString().message);
        }
        const normalized = value.trim();
        if (normalized.length === 0) {
            return Result_1.Result.fail(transactionId_errors_1.TransactionIdErrors.transactionIdMustNotBeEmptyString().message);
        }
        return Result_1.Result.ok(new TransactionId(normalized));
    }
    static generate() {
        return new TransactionId((0, crypto_1.randomUUID)());
    }
    static isValidTransactionId(value) {
        return typeof value === "string" && value.trim().length > 0;
    }
    static isUuidV4(value) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
    }
    equals(other) {
        return this.value === other.value;
    }
    getValue() {
        return this.value;
    }
}
exports.TransactionId = TransactionId;
//# sourceMappingURL=TransactionId.js.map