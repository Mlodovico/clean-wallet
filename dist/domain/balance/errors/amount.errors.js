"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountErrors = void 0;
class AmountErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'amountErrors';
    }
    static amountMustBeGreaterThanZero() {
        return new AmountErrors('Amount must be greater than 0');
    }
    static amountMustBeFinite() {
        return new AmountErrors('Amount must be a finite number');
    }
    static amountMustHaveAtMostTwoDecimals() {
        return new AmountErrors('Amount must have at most 2 decimal places');
    }
}
exports.AmountErrors = AmountErrors;
//# sourceMappingURL=amount.errors.js.map