"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amount = void 0;
const Result_1 = require("src/shared/utils/Result");
const amount_errors_1 = require("../errors/amount.errors");
class Amount {
    value;
    static amountErrors = amount_errors_1.AmountErrors;
    constructor(value) {
        this.value = value;
    }
    static create(amount) {
        if (amount <= 0) {
            return Result_1.Result.fail(this.amountErrors.amountMustBeFinite().message);
        }
        if (!Amount.isFinite(amount)) {
            return Result_1.Result.fail(this.amountErrors.amountMustBeFinite().message);
        }
        if (!Amount.hasAtMostTwoDecimals(amount)) {
            return Result_1.Result.fail(this.amountErrors.amountMustHaveAtMostTwoDecimals().message);
        }
        return Result_1.Result.ok(new Amount(amount));
    }
    static isPositive(value) {
        return value > 0;
    }
    static isNegative(value) {
        return value < 0;
    }
    static hasAtMostTwoDecimals(value) {
        return Number.isInteger(value * 100);
    }
    static isFinite(value) {
        return Number.isFinite(value);
    }
    getValue() {
        return this.value;
    }
}
exports.Amount = Amount;
//# sourceMappingURL=Amount.js.map