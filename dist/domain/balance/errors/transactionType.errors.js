"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypeErrors = void 0;
class TransactionTypeErrors extends Error {
    constructor(message) {
        super(message);
        this.name = "TransactionTypeErrors";
    }
    static transactionTypeMustBeString() {
        return new TransactionTypeErrors("Transaction type must be a string");
    }
    static transactionTypeMustNotBeEmptyString() {
        return new TransactionTypeErrors("Transaction type must not be an empty string");
    }
}
exports.TransactionTypeErrors = TransactionTypeErrors;
//# sourceMappingURL=transactionType.errors.js.map