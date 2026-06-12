"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = void 0;
const transactionType_errors_1 = require("../errors/transactionType.errors");
const Result_1 = require("../../../shared/utils/Result");
class TransactionType {
    value;
    constructor(value) {
        this.value = value;
    }
    static transactionTypeErrors = transactionType_errors_1.TransactionTypeErrors;
    static create(value) {
        if (!TransactionType.isValidTransactionType(value)) {
            return Result_1.Result.fail(this.transactionTypeErrors.transactionTypeMustBeString().message);
        }
        if (TransactionType.isEmpty(value)) {
            return Result_1.Result.fail(this.transactionTypeErrors.transactionTypeMustNotBeEmptyString()
                .message);
        }
        return Result_1.Result.ok(new TransactionType(value));
    }
    static isValidTransactionType(value) {
        return typeof value === "string" && value.length > 0;
    }
    static isEmpty(value) {
        return value.length === 0;
    }
    getValue() {
        return this.value;
    }
}
exports.TransactionType = TransactionType;
//# sourceMappingURL=TrancactionType.js.map