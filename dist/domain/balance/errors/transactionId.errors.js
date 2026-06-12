"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionIdErrors = void 0;
class TransactionIdErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "TransactionIdErrors";
    }
    static transactionIdMustBeString() {
        return new TransactionIdErrors("Transaction ID must be a string");
    }
    static transactionIdMustNotBeEmptyString() {
        return new TransactionIdErrors("Transaction ID must not be an empty string");
    }
    static transactionIdMustBeUuidV4() {
        return new TransactionIdErrors("Transaction ID must be a valid UUID v4");
    }
}
exports.TransactionIdErrors = TransactionIdErrors;
//# sourceMappingURL=transactionId.errors.js.map